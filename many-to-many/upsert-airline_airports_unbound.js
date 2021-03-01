const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const airline_airports1 = {
  "id": '100a',
  "airportId": "airport_1000a",
  "airlineId": "airline_3000a",
  "type": "airline_airport"
}

const airline_airports2 = {
  "id": '101a',
  "airportId": "airport_1000a",
  "airlineId": "airline_4000a",
  "type": "airline_airport"
}

const airline_airports3 = {
  "id": '102a',
  "airportId": "airport_1000a",
  "airlineId": "airline_5000a",
  "type": "airline_airport"
}

const airline_airports4 = {
  "id": '103a',
  "airportId": "airport_2000a",
  "airlineId": "airline_3000a",
  "type": "airline_airport"
}

const airline_airports5 = {
  "id": '104a',
  "airportId": "airport_2000a",
  "airlineId": "airline_4000a",
  "type": "airline_airport"
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

upsertDocument(airline_airports1);
upsertDocument(airline_airports2);
upsertDocument(airline_airports3);
upsertDocument(airline_airports4);
upsertDocument(airline_airports5);