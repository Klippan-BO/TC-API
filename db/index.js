require('dotenv').config();
const { Pool } = require('pg');

const connection = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'trails',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PW || '',
};

const pool = new Pool(connection);

pool.query('SELECT NOW()')
  .then(({ rows }) => {
    console.log('[database]: Connected at:', rows[0]);
  })
  .catch((err) => {
    console.log('[database]: Error connecting to db:', err);
  });

module.exports = pool;
