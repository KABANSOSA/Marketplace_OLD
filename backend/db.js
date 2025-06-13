    require('dotenv').config();

    const { Pool } = require('pg');

    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      sslmode: 'disable',
      ssl: false,
    });

    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '*****' : 'Not Set');

    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query('SELECT NOW()', (err, result) => {
        release();

        if (err) {
          return console.error('Error executing query', err.stack);
        }
        console.log('Connected to PostgreSQL database!');
        console.log('Current database time:', result.rows[0].now);
      });
    });

    module.exports = pool;