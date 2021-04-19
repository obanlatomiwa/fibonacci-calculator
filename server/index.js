const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const keys = require("./keys");
const redis = require("redis");

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

pgClient.on("connect", () => {
  console.log("Cannot connect to Postgres DB");
  pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => {
      console.log(err);
    });
});

// Redis
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,

  // if connect is lost, retry after 1s
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

//   Express routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fibonacci Calculator");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.hset("values", index, "nothing yet");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  res.send({ working: true });
});

app.listen(8000, () => {
  console.log("Listening to port 8000");
});
