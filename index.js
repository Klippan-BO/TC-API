require('dotenv').config();
const express = require('express');
const router = require('./routes');
const db = require('./db');

const port = process.env.PORT;
const app = express();

app.use(router);

app.listen(port);
console.log('[TC-API] Running on port:', port);
