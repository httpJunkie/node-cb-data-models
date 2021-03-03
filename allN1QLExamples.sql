/* ----------  File Extension is SQL for formatting purposes  ---------- */
/* ----------  But these are in fact N1QL queries ..........  ---------- */

/* ADDRESS JOIN SYNTAX (one-to-one) */
SELECT hotel.*, address
FROM `travel` hotel
JOIN `travel` address
  ON KEYS hotel.address
WHERE hotel.type = "hotel" 
  AND META(hotel).id = "hotel_1000c"

/* ADDRESS ANSI SYNTAX (one-to-one) */
SELECT hotel.*, address
FROM `travel` hotel
JOIN `travel` address
  ON META(address).id 
  IN hotel.address
WHERE hotel.type = "hotel" 
  AND META(hotel).id = "hotel_1000c"


/* ADDRESSES JOIN SYNTAX (one-to-one) */
SELECT hotel.*, addresses
FROM `travel` hotel
JOIN `travel` addresses
  ON KEYS hotel.addresses
WHERE hotel.type = "hotel" 
  AND META(hotel).id = "hotel_1000d"

/* ADDRESSES ANSI SYNTAX (one-to-one) */
SELECT hotel.*, addresses
FROM `travel` hotel
JOIN `travel` addresses
  ON META(addresses).id 
  IN hotel.addresses
WHERE hotel.type = "hotel" 
  AND META(hotel).id = "hotel_1000d"

/* ------------------------------------------------------------------- */

/* REVIEWS RELATED JOIN SYNTAX (one-to-many) */
SELECT hotel.*, reviews
FROM `travel` hotel
NEST `travel` reviews
  ON KEYS hotel.reviews
WHERE hotel.type = "hotel" 
  AND META(hotel).id = "hotel_2000b"


/* REVIEWS RELATED ANSI SYNTAX (one-to-many) */
SELECT hotel.*, reviews
FROM `travel` hotel
NEST `travel` reviews
  ON META(reviews).id 
  IN hotel.reviews
WHERE hotel.type = "hotel" 
  AND META(hotel).id = "hotel_2000b"

/* ------------------------------------------------------------------- */

/* AIRLINE RELATED AIRPORTS BOUND JOIN SYNTAX (many-to-many) */
SELECT airline.*,
  ARRAY airport.name
  FOR airport IN airports END airports
FROM `travel` airline
NEST `travel` airports
  ON KEYS airline.airports
WHERE airline.type = "airline"
  AND META(airline).id = "airline_3000b"

/* AIRLINE RELATED AIRPORTS BOUND ANSI SYNTAX (many-to-many) */
SELECT airline.*,
  ARRAY airport.name
  FOR airport IN airports END airports
FROM `travel` airline
NEST `travel` airports
  ON META(airports).id 
  IN airline.airports
WHERE airline.type = "airline"
  AND META(airline).id = "airline_3000b"


/* AIRPORT RELATED AIRLINES BOUND JOIN SYNTAX (many-to-many) */
SELECT airport.*,
  ARRAY airline.name
  FOR airline IN airlines END airlines
FROM `travel` airport
NEST `travel` airlines
  ON KEYS airport.airlines
WHERE airport.type = "airport"
  AND META(airport).id = "airport_1000b"

/* AIRPORT RELATED AIRLINES BOUND ANSI SYNTAX (many-to-many) */
SELECT airport.*,
  ARRAY airline.name
  FOR airline IN airlines END airlines
FROM `travel` airport
NEST `travel` airlines
  ON META(airlines).id 
  IN airport.airlines
WHERE airport.type = "airport"
  AND META(airport).id = "airport_1000b"


/* AIRPORT RELATED AIRLINES UNBOUND ANSI SYNTAX (many-to-many) */
SELECT airport.name, 
       ARRAY_AGG(airline.name) AS airlines
 FROM `travel` AS airport
 JOIN `travel` AS aa 
   ON META(airport).id = aa.airportId
 JOIN `travel` AS airline 
   ON META(airline).id = aa.airlineId
WHERE airport.type = "airport"
  AND aa.type = "airline_airport"
  AND airline.type = "airline"
GROUP BY airport.name