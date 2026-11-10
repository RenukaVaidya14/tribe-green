
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

// Routes
const productRoutes = require("./routes/product.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Security middleware
// Allow images to be loaded from the React website (different origin).
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
    })
);

// CORS configuration
app.use(
    cors({
       
    origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://tribe-green-kohl.vercel.app"
],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve product images from backend/src/uploads
const uploadsPath = path.join(__dirname, "uploads");

app.use(
    "/uploads",
    express.static(uploadsPath, {
        setHeaders: (res) => {
            res.setHeader(
                "Cross-Origin-Resource-Policy",
                "cross-origin"
            );
        },
    })
);

// Backend health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Tribe Green Backend is running",
    });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);

// Export app
module.exports = app;
