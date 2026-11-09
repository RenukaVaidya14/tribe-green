const db = require("../config/db");

// GET all enquiries with optional filters and pagination
const getAllEnquiries = async (req, res) => {
  try {
    const { status, source, page = 1, limit = 10 } = req.query;

    const allowedStatuses = [
      "New",
      "Contacted",
      "Converted",
      "Lost"
    ];

    const allowedSources = [
      "Website",
      "Android App"
    ];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status"
      });
    }

    if (source && !allowedSources.includes(source)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry source"
      });
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    if (
      !Number.isInteger(currentPage) ||
      currentPage < 1 ||
      !Number.isInteger(pageLimit) ||
      pageLimit < 1 ||
      pageLimit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or limit"
      });
    }

    const offset = (currentPage - 1) * pageLimit;

    // Build filters
    const conditions = [];
    const values = [];

    if (status) {
      conditions.push("status = ?");
      values.push(status);
    }

    if (source) {
      conditions.push("source = ?");
      values.push(source);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    // Get total matching enquiries
    const [countResult] = await db.execute(
      `SELECT COUNT(*) AS total
       FROM enquiries
       ${whereClause}`,
      values
    );

    const total = countResult[0].total;

    // Get enquiries
    const [enquiries] = await db.execute(
      `SELECT *
       FROM enquiries
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...values, pageLimit, offset]
    );

    // Attach selected products to each enquiry
    let result = [];

    if (enquiries.length > 0) {
      const enquiryIds = enquiries.map(item => item.id);
      const placeholders = enquiryIds.map(() => "?").join(",");

      const [selectedProducts] = await db.execute(
        `SELECT
           ep.enquiry_id,
           p.id AS product_id,
           p.name,
           p.image_url,
           p.min_price,
           p.max_price
         FROM enquiry_products ep
         JOIN products p ON p.id = ep.product_id
         WHERE ep.enquiry_id IN (${placeholders})`,
        enquiryIds
      );

      result = enquiries.map(enquiry => ({
        ...enquiry,
        customisations:
          typeof enquiry.customisations === "string"
            ? JSON.parse(enquiry.customisations)
            : enquiry.customisations,

        selected_products: selectedProducts
          .filter(product => product.enquiry_id === enquiry.id)
          .map(product => ({
            id: product.product_id,
            name: product.name,
            image_url: product.image_url,
            min_price: product.min_price,
            max_price: product.max_price
          }))
      }));
    }

    return res.status(200).json({
      success: true,
      message: "Enquiries fetched successfully",
      pagination: {
        total,
        page: currentPage,
        limit: pageLimit,
        totalPages: Math.ceil(total / pageLimit)
      },
      data: result
    });

  } catch (error) {
    console.error("Get All Enquiries Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiries"
    });
  }
};


// GET one enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID"
      });
    }

    const [enquiries] = await db.execute(
      "SELECT * FROM enquiries WHERE id = ?",
      [id]
    );

    if (enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    const [products] = await db.execute(
      `SELECT
         p.id,
         p.name,
         p.image_url,
         p.category,
         p.min_price,
         p.max_price
       FROM enquiry_products ep
       JOIN products p ON p.id = ep.product_id
       WHERE ep.enquiry_id = ?`,
      [id]
    );

    const enquiry = enquiries[0];

    return res.status(200).json({
      success: true,
      data: {
        ...enquiry,
        customisations:
          typeof enquiry.customisations === "string"
            ? JSON.parse(enquiry.customisations)
            : enquiry.customisations,
        selected_products: products
      }
    });

  } catch (error) {
    console.error("Get Enquiry By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiry"
    });
  }
};


// UPDATE enquiry status
const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID"
      });
    }

    const allowedStatuses = [
      "New",
      "Contacted",
      "Converted",
      "Lost"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed: New, Contacted, Converted, Lost"
      });
    }

    const [existing] = await db.execute(
      "SELECT id FROM enquiries WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    await db.execute(
      "UPDATE enquiries SET status = ? WHERE id = ?",
      [status, id]
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully",
      data: {
        enquiry_id: Number(id),
        status
      }
    });

  } catch (error) {
    console.error("Update Enquiry Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update enquiry status"
    });
  }
};

// EXPORT enquiries to CSV
const exportEnquiriesCSV = async (req, res) => {
  try {
    const { status, source } = req.query;

    const allowedStatuses = ["New", "Contacted", "Converted", "Lost"];
    const allowedSources = ["Website", "Android App"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status"
      });
    }

    if (source && !allowedSources.includes(source)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry source"
      });
    }

    const conditions = [];
    const values = [];

    if (status) {
      conditions.push("e.status = ?");
      values.push(status);
    }

    if (source) {
      conditions.push("e.source = ?");
      values.push(source);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const [rows] = await db.execute(
      `SELECT
         e.id,
         e.name,
         e.company,
         e.phone,
         e.email,
         e.occasion,
         e.quantity,
         e.budget,
         e.delivery_date,
         e.customisations,
         e.message,
         e.source,
         e.status,
         e.created_at,
         GROUP_CONCAT(p.name SEPARATOR '; ') AS selected_products
       FROM enquiries e
       LEFT JOIN enquiry_products ep ON ep.enquiry_id = e.id
       LEFT JOIN products p ON p.id = ep.product_id
       ${whereClause}
       GROUP BY e.id
       ORDER BY e.created_at DESC`,
      values
    );

    const headers = [
      "ID", "Customer Name", "Company", "Phone", "Email",
      "Occasion", "Quantity", "Budget", "Delivery Date",
      "Customisations", "Message", "Source", "Status",
      "Selected Products", "Created At"
    ];

    // Escape CSV values and protect against spreadsheet formulas
    const escapeCSV = (value) => {
      let text = value == null ? "" : String(value);

      if (/^[\s]*[=+\-@\t\r]/.test(text)) {
        text = "'" + text;
      }

      return `"${text.replace(/"/g, '""')}"`;
    };

    const csvRows = rows.map((row) => [
      row.id,
      row.name,
      row.company,
      row.phone,
      row.email,
      row.occasion,
      row.quantity,
      row.budget,
      row.delivery_date,
      row.customisations,
      row.message,
      row.source,
      row.status,
      row.selected_products,
      row.created_at
    ]);

    const csv = [
      headers.map(escapeCSV).join(","),
      ...csvRows.map(row => row.map(escapeCSV).join(","))
    ].join("\r\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tribe-green-enquiries.csv"'
    );

    return res.status(200).send("\uFEFF" + csv);

  } catch (error) {
    console.error("CSV Export Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to export enquiries"
    });
  }
};

module.exports = {
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  exportEnquiriesCSV
};