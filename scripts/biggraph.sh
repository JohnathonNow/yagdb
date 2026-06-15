for I in {1..10000}; do
	Q="MERGE (u:User{id: '$I'}) RETURN u"	
	curl localhost:3000/query --data "$Q" >/dev/null 2>/dev/null
done
