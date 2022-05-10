/* eslint-disable no-path-concat */
require('dotenv').config();
const fs = require('fs');

const dir = `${__dirname}/unsplash.json`;
console.log(dir);

fs.readFile(dir, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const parsed = JSON.parse(data);
    parsed.forEach((e) => {
      console.log(e);
    });
  }
});
