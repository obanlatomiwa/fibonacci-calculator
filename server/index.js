const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const keys = require("./keys");

// Express
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Postgres DB
const { Pool } = require("pg");

const pgClient = new Pool({
  user: keys.pgUser,
  database: keys.pgDatabase,
  host: keys.pgHost,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("error", () => {
  console.log("Cannot connect to DB");
});

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch((err) => {
    console.log(err);
  });
