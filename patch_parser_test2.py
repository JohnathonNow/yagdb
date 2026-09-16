import re

with open("tests/parser_test.rs", "r") as f:
    content = f.read()

content = content.replace("""        Clause::Set(items) => {
            if let yagdb::parser::SetItem::Property(var, prop, val) = &items[0] {
                assert_eq!(var, "n");
                assert_eq!(prop, "age");
            } else {
                panic!("Expected Property variant");
            }
            assert_eq!(
                val,
                &yagdb::parser::Expression::StringLiteral("30".to_string())
            );
        }""", """        Clause::Set(items) => {
            if let yagdb::parser::SetItem::Property(var, prop, val) = &items[0] {
                assert_eq!(var, "n");
                assert_eq!(prop, "age");
                assert_eq!(
                    val,
                    &yagdb::parser::Expression::StringLiteral("30".to_string())
                );
            } else {
                panic!("Expected Property variant");
            }
        }""")

with open("tests/parser_test.rs", "w") as f:
    f.write(content)
