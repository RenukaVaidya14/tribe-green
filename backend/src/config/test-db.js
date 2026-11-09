const pool = require("./db");

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL Connected Successfully!");

        const [rows] = await connection.query(
            "SELECT DATABASE() AS databaseName"
        );

        console.log("Connected Database:", rows[0].databaseName);

        connection.release();
        await pool.end();

    } catch (error) {
        console.error("Connection Failed:", error.message);
    }
}

testConnection();