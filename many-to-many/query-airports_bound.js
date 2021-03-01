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
      CREATE INDEX \`adv_type_airportId_airlineId\` ON \`travel\`(\`type\`,\`airportId\`,\`airlineId\`)
    `
    const result = await cluster.query(query)
    console.log(`Index Creation: ${result.meta.status}`)
  } catch (error) {
    console.error(error)
  }
}

const getAirlinesByAirport = async () => {
  try {
    const query = `
      SELECT airport.name, ARRAY_AGG(airline.name) AS airlines
      FROM \`travel\` AS airport
      JOIN \`travel\` AS aa ON META(airport).id = aa.airportId
      JOIN \`travel\` AS airline ON META(airline).id = aa.airlineId
      WHERE airport.type = "airport"
        AND aa.type = "airline_airport" 
        AND airline.type = "airline"
      GROUP BY airport.name
    `
    const result = await cluster.query(query)

    console.log("Query Result: ")
    console.log(result.rows)
  } catch (error) {
    console.error(error)
  }
}

createAirportWithAirlinesIndex()
  .then(() => getAirlinesByAirport())
