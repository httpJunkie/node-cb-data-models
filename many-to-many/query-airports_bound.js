const couchbase = require("couchbase")

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
})

const bucket = cluster.bucket("travel")
const collection = bucket.defaultCollection()

const getAirlinesByAirport = async () => {
  try {
    const query = `
    SELECT airport.*,
      ARRAY airline.name 
      FOR airline IN airlines END airlines
    FROM \`travel\` airport
    NEST \`travel\` airlines
      ON META(airlines).id 
      IN airport.airlines
    WHERE airport.type = "airport"
      AND META(airport).id = "airport_1000b"
    `
    const result = await cluster.query(query)

    console.log("Query Result for Airlines by Airport: ")
    console.log(result.rows)
    console.log("\n")
  } catch (error) {
    console.error(error)
  }
}

const getAirportsByAirline = async () => {
  try {
    const query = `
    SELECT airline.*,
      ARRAY airport.name
      FOR airport IN airports END airports
    FROM \`travel\` airline
    NEST \`travel\` airports
      ON META(airports).id 
      IN airline.airports
    WHERE airline.type = "airline"
      AND META(airline).id = "airline_3000b"
    `
    const result = await cluster.query(query)

    console.log("Query Result for Airports by Airline: ")
    console.log(result.rows)
    console.log("\n")
  } catch (error) {
    console.error(error)
  }
}

getAirlinesByAirport()
getAirportsByAirline()
