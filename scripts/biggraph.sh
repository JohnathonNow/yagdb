for I in {1..999999}; do
	Q="MERGE (u:User{id: '$I'}) RETURN u"
	curl localhost:3000/query --data "$Q"
done
