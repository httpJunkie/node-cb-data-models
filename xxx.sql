SELECT airport.name, ARRAY_AGG(airline.name) AS airlines
  FROM `travel` AS airport
  JOIN `travel` AS aa ON META(airport).id = aa.airportId
  JOIN `travel` AS airline ON META(airline).id = aa.airlineId
WHERE airport.type = "airport"
  AND aa.type = "airline_airport" 
  AND airline.type = "airline"
GROUP BY airport.name

SELECT airport.*, airlines
FROM `travel` airport
  INNER NEST `travel` airlines
  ON KEYS airport.airlines
WHERE airport.type = "airport" 
  AND META(airport).id = "airport_1000"

{
  "name": "San Francisco Intl",
  "airlines": [
    "name": "United Airlines",
    "name": "American Airlines",
    "name": "Air France"
  ],
}

SELECT airport.*, 
  ARRAY airline.name FOR airline IN airlines END airlines
FROM `travel` airport
  NEST `travel` airlines
  ON KEYS airport.airlines
WHERE airport.type = "airport" 
  AND META(airport).id = "airport_1000b"

SELECT airline.*,
  ARRAY airport.name 
  FOR airport IN airports END airports
FROM `travel` airline
NEST `travel` airports
   ON KEYS airline.airports
WHERE airline.type = "airline"
  AND META(airline).id = "airline_3000"