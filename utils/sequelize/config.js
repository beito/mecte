require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.PGUSER,
    dbPassword: process.env.PGPASSWORD,
    dbHost: process.env.PGHOST,
    dbName: process.env.PGDATABASE,
    dbPort: process.env.PGPORT,
    dbDialect: process.env.PGDIALECT,
    dbMaxConcurrentQueries: 100,
    pool: { maxConnections: 25, maxIdleTime: 30}
}

module.exports = { config };