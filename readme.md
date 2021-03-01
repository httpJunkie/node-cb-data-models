# JSON Data Modeling Resources

Learning how to structure JSON documents for a document database goes a little further than the basics of JSON. In preparing this talk I've had to find many different resources and the list below are the best of the best that I could find out there.

## Setting up Couchbase Server (Document Database) Using Docker

The following shell command will setup a Couchbase Docker container with the name: cb using the official Couchbase Docker image.

```shell
docker pull couchbase
docker run -d --name cb -p 8091-8096:8091-8096 -p 11210-11211:11210-11211 couchbase
```

With your databse running locally you can access it at localhost:8091, set up a one node cluster:

1. Set Cluster Name (`JSON Data Modeling`)
2. Set Admin User (`Administrator`)
3. Set Password (`password`)
4. Accept Terms
5. Configure Disk, Memory, Services (Check Data, Query, and Index at minimum)

Once logged in create a new bucket.

1. Select Bucket Tab
2. Click "ADD BUCKET"
3. Name your bucket `travel`

## Learning Videos About JSON Data Modeling

- [Create Data Models JSON](https://www.pluralsight.com/courses/create-data-models-json)
- [JSON Data Modeling](https://www.youtube.com/watch?v=S5nNrrgpypU)
- [MongoDB Schema Design Best Practices](https://www.youtube.com/watch?v=leNCfU5SYR8)
- [Intro to Data Modeling in JSON](https://www.youtube.com/watch?v=_yv4t93a6OM&list=PLcspbWiU9RushJwSMo71uckW2_hqzDoe4)
- [JSON Data Modelin for Success and Performance](https://www.youtube.com/watch?v=wwwVYHZhxUc)

## Links and Resources Used to Develop This Talk

- [JSON Data Modelin for RDBMS Users](https://blog.couchbase.com/json-data-modeling-rdbms-users/)
- [Services and Multidimensional Scaling](https://docs.couchbase.com/server/current/learn/services-and-indexes/services/services.html#services-and-multi-dimensional-scaling)
- [Cross Data Center Replication](https://docs.couchbase.com/server/current/learn/clusters-and-availability/xdcr-overview.html)
- [N1QL Languagew Reference](https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/selectintro.html)
- [ANSI Join Support N1QL](https://blog.couchbase.com/ansi-join-support-n1ql/)
- [Nosql Many-to-Many Relationship Examples](https://www.techighness.com/post/nosql-many-to-many-bound-unbound-associative-examples/)
- [Visually Explaining N1QL Joins](https://dzone.com/articles/visually-explaining-n1ql-joins)
- [Cost Based Optimization with Couchbase](https://blog.couchbase.com/cost-based-optimization-with-couchbase-json-database/ )
