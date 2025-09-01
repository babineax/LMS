const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const courseRoutes = require("./routes/courses.route");
const institutionRoutes = require("./routes/institution.route");
const libraryRoutes = require("./routes/library.route");
const bursaryRoutes = require("./routes/bursary.route");
const morgan = require("morgan");
const contentRoutes = require("./routes/content.routes");

const app = express();
app.use(express.json());
dotenv.config();

// Middleware
app.use(cors()); //cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging

// handle cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", [
    "http://localhost:3000",
    "https://your-production-url.com",
    "http://localhost:5173",
    "*",
  ]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/bursary", bursaryRoutes);
app.use("/api/content", contentRoutes);

// test route
app.use("/api/notify", require("./routes/notifications"));

// health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "LMS API is running" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`LMS Backend running on http://localhost:${PORT}`)
);
