const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
const config = {}

if(ENV === 'production') {
  config.connectionString = 'postgres://kwwjvupy:FhodIAQCKlBTiPAiQqX4TXBRI9ncrl7S@tyke.db.elephantsql.com/kwwjvupy'
  config.max = 2;
  
}


require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE not set or DATABASE_URL not set');
}

module.exports = new Pool(config);

