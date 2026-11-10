
const dotenv = require("dotenv");
const path = require("path");
const mysql = require("mysql2/promise");

// Load .env from backend folder
dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});

console.log("DB Configuration Check:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    passwordLoaded: Boolean(process.env.DB_PASSWORD),
    sslEnabled: process.env.DB_SSL === "true"
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),

    // Enable SSL for TiDB Cloud
    ssl: process.env.DB_SSL === "true"
        ? { minVersion: "TLSv1.2" }
        : undefined,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
