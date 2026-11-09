require("dotenv").config({ override: true });

const db = require("../src/config/db");
const bcrypt = require("bcrypt");

const resetAdmin = async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error("Admin credentials missing from .env");
    }

    // Generate a fresh bcrypt hash
    const passwordHash = await bcrypt.hash(password, 12);

    // Update the existing admin
    const [result] = await db.execute(
      "UPDATE admins SET password_hash = ? WHERE username = ?",
      [passwordHash, username]
    );

    if (result.affectedRows === 0) {
      throw new Error("Admin account not found");
    }

    // Read the updated hash from the same database
    const [admins] = await db.execute(
      "SELECT password_hash FROM admins WHERE username = ?",
      [username]
    );

    // Verify immediately
    const isMatch = await bcrypt.compare(
      password,
      admins[0].password_hash
    );
const response = pm.response.json();

if (response.success && response.data?.token) {
    pm.environment.set("adminToken", response.data.token);
    console.log("New admin token saved successfully");
} else {
    console.log("Login failed");
}

    console.log("Admin password updated.");
    console.log("Username:", username);
    console.log("Password verification:", isMatch ? "MATCH" : "NOT MATCH");

  } catch (error) {
    console.error("Admin reset failed:", error.message);
  } finally {
    await db.end();
  }
};

resetAdmin();