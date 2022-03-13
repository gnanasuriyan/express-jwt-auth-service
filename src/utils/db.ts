const http = require('http')

const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const userDbName = process.env.USER_DB_NAME;

// connection pool
const httpAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 25
})

const opt = {
    url: `http://${userName}:${password}@localhost:5984/${userDbName}`,
    requestDefaults: {
        agent: httpAgent
    }
};

const db = require('nano')(opt);

export default db;
