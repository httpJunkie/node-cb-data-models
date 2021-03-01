const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const airline1 = {
  "id": '3000b',
  "callsign": "UNITED",
  "country": "United States",
  "name": "United Airlines",
  "airports": [
    "airport_1000b", "airport_2000b"
  ],
  "type": "airline"
}

const airline2 = {
  "id": '4000b',
  "callsign": "AMERICAN",
  "country": "United States",
  "name": "American Airlines",
  "airports": [
    "airport_1000b", "airport_2000b"
  ],
  "type": "airline",
}

const airline3 = {
  "id": '5000b',
  "callsign": "AIRFRANS",
  "country": "France",
  "name": "Air France",
  "airports": [
    "airport_1000b"
  ],
  "type": "airline",
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

upsertDocument(airline1);
upsertDocument(airline2);
upsertDocument(airline3);