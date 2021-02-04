const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const keys = require('./keys')

// Express
const app = express();

app.use(cors())
app.use(bodyParser.json());