/* =====================================================
   server.js — Portfolio Backend Entry Point
   ===================================================== */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// ── Route Imports ──────────────────────────────────────
const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skills");
const statsRoutes = require("./routes/stats");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Middleware ────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ── CORS Configuration ─────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

// ── Body Parsers ───────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Logger ─────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ── Rate Limiter ───────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api", limiter);

// ── API Routes ─────────────────────────────────────────
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/stats", statsRoutes);

// ── Root Route ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Portfolio Backend API Running 🚀");
});

// ── Health Check ───────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running 🚀",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ───────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
});

// ── Start Server ───────────────────────────────────────
const startServer = async () => {
  try {
    console.log("Starting server...");

    console.log("Checking MONGO_URI...");
    console.log(process.env.MONGO_URI ? "MONGO_URI Found" : "MONGO_URI Missing");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ FULL ERROR:");
    console.error(error);

    process.exit(1);
  }
};

startServer();
