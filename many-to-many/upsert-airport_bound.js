const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const airport1 = {
  "id": '1000b',
  "name": "San Francisco Intl",
  "city": "San Francisco",
  "faa": "SFO",
  "airlines": [
    "airline_3000b", "airline_4000b", "airline_5000b"
  ],
  "type": "airport"
}

const airport2 = {
  "id": '2000b',
  "name": "Los Angeles Intl",
  "city": "Los Angeles",
  "faa": "LAX",
  "airlines": [
    "airline_3000b", "airline_4000b"
  ],
  "type": "airport",
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

upsertDocument(airport1);
upsertDocument(airport2);