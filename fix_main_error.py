import re

with open('src/main.rs', 'r') as f:
    main_code = f.read()

replacement = """    let (tx, mut rx) = tokio::sync::mpsc::channel(100);

    let handle = tokio::task::spawn_blocking(move || {
        guard.g.execute_stream(&body, Some(tx))
    });

    let stream = async_stream::stream! {
        loop {
            match rx.recv().await {
                Some(val) => {
                    yield Ok::<_, std::convert::Infallible>(
                        Event::default().data(serde_json::to_string(&val).unwrap()),
                    );
                }
                None => {
                    match handle.await {
                        Ok(Ok(output)) => {
                            if !output.is_empty() {
                                yield Ok::<_, std::convert::Infallible>(
                                    Event::default().data(output),
                                );
                            }
                        }
                        Ok(Err(e)) => {
                            yield Ok::<_, std::convert::Infallible>(
                                Event::default().event("error").data(e),
                            );
                        }
                        Err(join_err) => {
                             yield Ok::<_, std::convert::Infallible>(
                                Event::default().event("error").data(format!("Task failed: {}", join_err)),
                            );
                        }
                    }
                    break;
                }
            }
        }
    };

    Sse::new(stream).into_response()"""

original = """    let res = tokio::task::spawn_blocking(move || guard.g.execute(&body))
        .await
        .unwrap_or_else(|_| Err("Query cancelled".to_string()));

    match res {
        Ok(result) => {
            if result.trim().is_empty() {
                return Sse::new(futures::stream::empty::<
                    Result<Event, std::convert::Infallible>,
                >())
                .into_response();
            }

            match serde_json::from_str::<Vec<serde_json::Value>>(&result) {
                Ok(arr) => {
                    let stream = futures::stream::iter(arr.into_iter().map(|val| {
                        Ok::<_, std::convert::Infallible>(
                            Event::default().data(serde_json::to_string(&val).unwrap()),
                        )
                    }));
                    Sse::new(stream).into_response()
                }
                Err(_) => {
                    let stream = futures::stream::iter(vec![Ok::<_, std::convert::Infallible>(
                        Event::default().data(result),
                    )]);
                    Sse::new(stream).into_response()
                }
            }
        }
        Err(e) => (StatusCode::BAD_REQUEST, format!("Error: {}", e)).into_response(),
    }"""

main_code = main_code.replace(original, replacement)

with open('src/main.rs', 'w') as f:
    f.write(main_code)
