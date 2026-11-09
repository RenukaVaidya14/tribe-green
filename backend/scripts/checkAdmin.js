require("dotenv").config();

const db = require("../src/config/db");
const bcrypt = require("bcrypt");

const checkAdmin = async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    console.log("Environment username:", username);
    console.log("Environment password loaded:", Boolean(password));
    console.log("Environment password length:", password?.length);

    const [admins] = await db.execute(
      "SELECT id, username, password_hash FROM admins WHERE username = ?",
      [username]
    );

    console.log("Admin found:", admins.length > 0);

    if (admins.length === 0) {
      console.log("ERROR: Admin not found in database");
      return;
    }

    const admin = admins[0];

    console.log("Database username:", admin.username);
    console.log("Hash prefix:", admin.password_hash.substring(0, 7));

    const isMatch = await bcrypt.compare(
      password,
      admin.password_hash
    );

    console.log("Password comparison:", isMatch ? "MATCH" : "NOT MATCH");

  } catch (error) {
    console.error("Diagnostic error:", error.message);
  } finally {
    await db.end();
  }
};

checkAdmin();