import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
  
      rejectUnauthorized: false,
  
    },
});

// CREATE TABLE "users" (

//   "id" SERIAL PRIMARY KEY,
  
//   "displayname" text NOT NULL,
  
//   "email" text NOT NULL UNIQUE,
  
//   "password" varchar NOT NULL
  
// );

const client = await pool.connect();
console.log(client ? "Connected to database" : "Failed to connect to database");

export default client;