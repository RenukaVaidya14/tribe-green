const db = require("../config/db");

// GET all products with optional filters
const getProducts = async (req, res) => {
  try {
    const { category, occasion, minBudget, maxBudget } = req.query;

    const allowedCategories = [
      "Drinkware",
      "Apparel",
      "Work Essentials",
      "Wellness"
    ];

    const conditions = [];
    const values = [];

    // 1. Filter by category
    if (category) {
      if (!allowedCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category"
        });
      }

      conditions.push("p.category = ?");
      values.push(category);
    }

    // 2. Filter by occasion
    if (occasion) {
      conditions.push(`
        EXISTS (
          SELECT 1
          FROM product_occasions po
          WHERE po.product_id = p.id
          AND po.occasion = ?
        )
      `);

      values.push(occasion);
    }

    // 3. Validate budget values
    const min = minBudget !== undefined ? Number(minBudget) : null;
    const max = maxBudget !== undefined ? Number(maxBudget) : null;

    if (
      (min !== null && (!Number.isFinite(min) || min < 0)) ||
      (max !== null && (!Number.isFinite(max) || max < 0))
    ) {
      return res.status(400).json({
        success: false,
        message: "Budget must be a valid non-negative number"
      });
    }

    if (min !== null && max !== null && min > max) {
      return res.status(400).json({
        success: false,
        message: "Minimum budget cannot be greater than maximum budget"
      });
    }

    // A product matches when its price range overlaps the selected budget
    if (min !== null) {
      conditions.push("p.max_price >= ?");
      values.push(min);
    }

    if (max !== null) {
      conditions.push("p.min_price <= ?");
      values.push(max);
    }

    // Build the SQL query
    let sql = "SELECT p.* FROM products p";

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY p.id ASC";

    const [products] = await db.execute(sql, values);

    // Fetch occasions and customisations
    const [occasions] = await db.execute(
      "SELECT * FROM product_occasions"
    );

    const [customisations] = await db.execute(
      "SELECT * FROM product_customisations"
    );

    // Combine product information
    const result = products.map((product) => ({
      ...product,
      occasions: occasions
        .filter((item) => item.product_id === product.id)
        .map((item) => item.occasion),

      customisations: customisations
        .filter((item) => item.product_id === product.id)
        .map((item) => item.customisation)
    }));

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });

  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch products"
    });
  }
};


// GET product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const [products] = await db.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const [occasions] = await db.execute(
      "SELECT occasion FROM product_occasions WHERE product_id = ?",
      [id]
    );

    const [customisations] = await db.execute(
      "SELECT customisation FROM product_customisations WHERE product_id = ?",
      [id]
    );

    return res.status(200).json({
      success: true,
      data: {
        ...products[0],
        occasions: occasions.map((item) => item.occasion),
        customisations: customisations.map(
          (item) => item.customisation
        )
      }
    });

  } catch (error) {
    console.error("Get Product By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch product"
    });
  }
};

module.exports = {
  getProducts,
  getProductById
};