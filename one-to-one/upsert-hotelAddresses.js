const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const address = {
  id: '1909778350',
  street: "30100 Agoura Rd",
  city: "Agoura Hills",
  state: "CA",
  zipcode: "91301"
}

const addresses = {
  main: {
    street: "30100 Agoura Rd",
    city: "Agoura Hills",
    state: "CA",
    zipcode: "91301"
  },
  shipping: {
    street: "30200 Agoura Rd",
    city: "Agoura Hills",
    state: "CA",
    zipcode: "91301"
  }
}

const upsertHotelAddress = async (doc) => {
  try {
    const key = `${doc.id}`
    delete doc.id;
    const result = await collection.upsert(key, doc)
    console.log("Upsert Result: ")
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

const upsertHotelAddresses = async (doc) => {
  try {
    const key = '1909778351'
    const result = await collection.upsert(key, doc)
    console.log("Upsert Result: ")
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

upsertHotelAddress(address);
upsertHotelAddresses(addresses);