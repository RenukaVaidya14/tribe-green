const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/admin.controller");


const verifyAdmin = require("../middleware/auth.middleware");

const {
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  exportEnquiriesCSV
} = require("../controllers/adminEnquiry.controller");



// Public login
router.post("/login", adminLogin);

// Protected enquiry APIs
router.get("/enquiries", verifyAdmin, getAllEnquiries);
router.get("/enquiries/:id", verifyAdmin, getEnquiryById);
router.patch(
  "/enquiries/:id/status",
  verifyAdmin,
  updateEnquiryStatus
);
router.get(
  "/enquiries/export/csv",
  verifyAdmin,
  exportEnquiriesCSV
);

module.exports = router;