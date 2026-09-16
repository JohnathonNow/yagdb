import re

with open("tests/parser_test.rs", "r") as f:
    content = f.read()

# Fix parsing tests expecting the old tuple structure instead of SetItem enum
content = content.replace("let (var, prop, val) = &items[0];\n            assert_eq!(var, \"n\");\n            assert_eq!(prop, \"age\");",
"""if let yagdb::parser::SetItem::Property(var, prop, val) = &items[0] {
                assert_eq!(var, "n");
                assert_eq!(prop, "age");
            } else {
                panic!("Expected Property variant");
            }""")

content = content.replace("assert_eq!(items[0].0, \"n\");\n            assert_eq!(items[0].1, \"age\");\n            assert_eq!(items[0].2, yagdb::parser::Expression::NumberLiteral(30.0));",
"""if let yagdb::parser::SetItem::Property(var, prop, val) = &items[0] {
                assert_eq!(var, "n");
                assert_eq!(prop, "age");
                assert_eq!(val, &yagdb::parser::Expression::NumberLiteral(30.0));
            } else {
                panic!("Expected Property variant");
            }""")

content = content.replace("assert_eq!(items[1].0, \"n\");\n            assert_eq!(items[1].1, \"name\");\n            assert_eq!(\n                items[1].2,\n                yagdb::parser::Expression::StringLiteral(\"Bob\".to_string())\n            );",
"""if let yagdb::parser::SetItem::Property(var, prop, val) = &items[1] {
                assert_eq!(var, "n");
                assert_eq!(prop, "name");
                assert_eq!(
                    val,
                    &yagdb::parser::Expression::StringLiteral("Bob".to_string())
                );
            } else {
                panic!("Expected Property variant");
            }""")

with open("tests/parser_test.rs", "w") as f:
    f.write(content)
