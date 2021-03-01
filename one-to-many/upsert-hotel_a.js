const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const hotel = {
  id: '2000a',
  name: "Hotel Kabuki",
  reviews: [
    {
      "userId": "elon@telsa.com",
      "date": "2021-02-11 04:19:59 -0800",
      "content": "Accepted payment with dogecoin, plenty of EV charging",
      "ratings": {
        "cleanliness": 6,
        "service": 9
      }
    },
    {
      "userId": "mark@facebook.com",
      "date": "2021-01-01 02:04:42 -0800",
      "content": "Room was super clean, I can't get no sleep",
      "ratings": {
        "cleanliness": 4,
        "service": 2
      }
    },
    {
      "userId": "thomas@hyliion.com",
      "date": "2021-09-28 12:13:14 -0600",
      "content": "Parking space for my class 8 truck! gym was closed :(",
      "ratings": {
        "cleanliness": 2,
        "service": 8
      }
    }
  ],
  vacancy: true,
  type: "hotel"
}

const upsertHotel = async (doc) => {
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

upsertHotel(hotel);