const Pool = require('pg').Pool
const connectionString = "postgresql://postgres:postgres@192.168.2.98:5432/Arenda";
// const pool = new Pool(connectionString)
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: '192.168.2.98',
    port: '5432',
    database: 'Arenda',
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
})

module.exports = pool