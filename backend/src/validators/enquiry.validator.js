const validator = require("validator");

const validateEnquiry = (data) => {
  const errors = [];

  const {
    name,
    company,
    phone,
    email,
    occasion,
    quantity,
    budget,
    delivery_date,
    customisations,
    message,
    product_ids
  } = data;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must contain at least 2 characters");
  }

  if (!company || typeof company !== "string" || company.trim().length < 2) {
    errors.push("Company name is required");
  }

  if (!phone || !validator.isMobilePhone(String(phone).trim(), "any")) {
    errors.push("Enter a valid phone number");
  }

  if (!email || !validator.isEmail(String(email).trim())) {
    errors.push("Enter a valid email address");
  }

  if (!occasion || typeof occasion !== "string" || !occasion.trim()) {
    errors.push("Occasion is required");
  }

  if (
    !Number.isInteger(Number(quantity)) ||
    Number(quantity) < 1
  ) {
    errors.push("Quantity must be at least 1");
  }

  if (
    budget === undefined ||
    budget === null ||
    budget === "" ||
    !Number.isFinite(Number(budget)) ||
    Number(budget) <= 0
  ) {
    errors.push("Enter a valid budget greater than 0");
  }

  if (
    !Array.isArray(product_ids) ||
    product_ids.length === 0 ||
    product_ids.some(
      id => !Number.isInteger(Number(id)) || Number(id) < 1
    )
  ) {
    errors.push("Select at least one valid product");
  }

  if (
    delivery_date &&
    (
      typeof delivery_date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(delivery_date) ||
      !validator.isDate(delivery_date, { format: "YYYY-MM-DD", strictMode: true })
    )
  ) {
    errors.push("Delivery date must be a valid date in YYYY-MM-DD format");
  }

  if (
    customisations !== undefined &&
    !Array.isArray(customisations)
  ) {
    errors.push("Customisations must be an array");
  }

  if (
    message !== undefined &&
    (typeof message !== "string" || message.length > 1000)
  ) {
    errors.push("Message must be text and cannot exceed 1000 characters");
  }

  return errors;
};

module.exports = validateEnquiry;