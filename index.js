require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes');

const port = process.env.PORT;
const app = express();

app.use(cookieParser);
app.use(express.json());
app.use(router);

app.listen(port);
console.log('[TC-API] Running on port:', port);
