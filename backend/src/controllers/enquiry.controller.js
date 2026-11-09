const db = require("../config/db");
const validateEnquiry = require("../validators/enquiry.validator");

const createEnquiry = async (req, res) => {
  const errors = validateEnquiry(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  const {
    name,
    company,
    phone,
    email,
    occasion,
    quantity,
    budget,
    delivery_date,
    customisations = [],
    message = "",
    product_ids
  } = req.body;

  const source = req.body.source || "Website";

  if (!["Website", "Android App"].includes(source)) {
    return res.status(400).json({
      success: false,
      message: "Invalid enquiry source"
    });
  }

  const uniqueProductIds = [...new Set(product_ids.map(Number))];

  let connection;

  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Check whether selected products exist
    const placeholders = uniqueProductIds.map(() => "?").join(",");

    const [products] = await connection.execute(
      `SELECT id FROM products WHERE id IN (${placeholders})`,
      uniqueProductIds
    );

    if (products.length !== uniqueProductIds.length) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "One or more selected products do not exist"
      });
    }

    // Insert enquiry
    const [result] = await connection.execute(
      `INSERT INTO enquiries
      (
        name, company, phone, email, occasion,
        quantity, budget, delivery_date,
        customisations, message, source, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')`,
      [
        name.trim(),
        company.trim(),
        String(phone).trim(),
        email.trim(),
        occasion.trim(),
        Number(quantity),
        Number(budget),
        delivery_date || null,
        JSON.stringify(customisations),
        message,
        source
      ]
    );

    const enquiryId = result.insertId;

    // Link selected products with enquiry
    for (const productId of uniqueProductIds) {
      await connection.execute(
        `INSERT INTO enquiry_products (enquiry_id, product_id)
         VALUES (?, ?)`,
        [enquiryId, productId]
      );
    }

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: {
        enquiry_id: enquiryId,
        status: "New",
        source
      }
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Create Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry"
    });

  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createEnquiry
};