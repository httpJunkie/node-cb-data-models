const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const hotel = {
  id: '1000a',
  address: "30100 Agoura Rd, Agoura Hills, CA 91301",
  vacancy: true,
  name: "Sheraton Agoura Hills Hotel",
  type: "hotel"
}

const upsertDocument = async (doc) => {
  try {
    const key = `${doc.type}_${doc.id}`
    delete doc.id;
    const result = await collection.upsert(key, doc)
    console.log("Upsert Result: ")
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

upsertDocument(hotel);