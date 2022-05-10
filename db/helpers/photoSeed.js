/* eslint-disable no-unused-vars */
/* eslint-disable no-path-concat */
require('dotenv').config();
const fs = require('fs');

const dir = `${__dirname}/unsplash.json`;
console.log(dir);

const replacer = (key, value) => (value === null ? '' : value);

// fs.readFile(dir, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     const parsed = JSON.parse(data);
//     const header = ['id', ...Object.keys(parsed[0])];
//     const csv = [
//       header.join(','),
//       ...parsed.map((e, i) => header.map((field) => (
//         JSON.stringify(i, e[field], replacer)
//       )).join(',')),
//     ].join('/r/n');
//     console.log(csv);
//     fs.writeFile(`${__dirname}/newphotos.csv`, csv, (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// });
