const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const getHotelWithReviewsEmbedded = async (hotelKey) => {
  try {
    const result = await collection.get(hotelKey)
    console.log("Get Result: ")
    console.log(result.content)
  } catch (error) {
    console.error(error)
  }
}

const getHotelWithReviewsRelated = async (hotelKey) => {
  try {
    const query = `
      SELECT hotel.*, reviews
      FROM \`travel\` hotel
        INNER NEST \`travel\` reviews
        ON KEYS hotel.reviews
      WHERE hotel.type = 'hotel' AND META(hotel).id = $HOTELKEY
    `
    const options = { parameters: { HOTELKEY: hotelKey } }
    const result = await cluster.query(query, options)

    console.log("Query Result: ")
    console.log(result.rows[0])
  } catch (error) {
    console.error(error)
  }
}

getHotelWithReviewsEmbedded('hotel_2000a');
getHotelWithReviewsRelated('hotel_2000b');