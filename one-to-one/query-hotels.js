const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const createAirportWithAirlinesIndex = async () => {
  try {
    const query = `
      CREATE PRIMARY INDEX \`#primary\` ON \`travel\`;
    `
    const result = await cluster.query(query)
    console.log(`Index Creation: ${result.meta.status}\n`)
  } catch (error) {
    console.error(error)
  }
}

const getHotelById = async (key) => {
  try {
    const result = await collection.get(key)
    console.log("KV Get Hotel by ID: ")
    console.log(result.content)
    console.log(`\n`)
  } catch (error) {
    console.error(error)
  }
}

const getHotelSubdocAddress = async (key) => {
  try {
    var result = await collection.lookupIn(key, [
      couchbase.LookupInSpec.get("address"),
    ]);
    console.log("KV Get Hotel Address Subdoc: ")
    console.log(result.content[0].value)
    console.log(`\n`)
  } catch (error) {
    console.error(error)
  }
}

const getHotelWithAddress = async (hotelKey) => {
  try {
    // With Left Join (rather than INNER JOIN), 
    // if the address does not exist, the query will still work...
    const query = `
      SELECT hotel.*, address
      FROM \`travel\` hotel
      JOIN \`travel\` address
      ON META(address).id IN hotel.address
      WHERE hotel.type = "hotel" AND META(hotel).id = $HOTELKEY;
    `
    const options = { parameters: { HOTELKEY: hotelKey } }
    const result = await cluster.query(query, options)

    console.log("One to One JOIN: ")
    console.log(result.rows[0])
    console.log(`\n`)
  } catch (error) {
    console.error(error)
  }
}

const getHotelWithAddresses = async (hotelKey) => {
  try {
    const query = `
    SELECT hotel.*, addresses
    FROM \`travel\` hotel
    JOIN \`travel\` addresses
      ON META(addresses).id 
      IN hotel.addresses
    WHERE hotel.type = "hotel" 
      AND META(hotel).id = $HOTELKEY;
    `
    const options = { parameters: { HOTELKEY: hotelKey } }
    const result = await cluster.query(query, options)

    console.log("One to Few LEFT JOIN: ")
    console.log(result.rows[0])
    console.log(`\n`)
  } catch (error) {
    console.error(error)
  }
}


createAirportWithAirlinesIndex()
  .then(() => {
    getHotelById('hotel_1000a');
    getHotelById('hotel_1000b');
    getHotelSubdocAddress('hotel_1000b');
    getHotelWithAddress('hotel_1000c');
    getHotelWithAddresses('hotel_1000d');
  })