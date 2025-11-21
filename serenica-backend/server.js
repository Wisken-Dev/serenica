const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// ✅ CORS configuration for both dev environments (Vite or CRA)
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

// ✅ Routes
const authRoutes = require("./src/Routes/authRoutes");
const aiRoutes = require("./src/Routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
// Add this right after your routes in server.js
app.use("/api/auth", (req, res, next) => {
  console.log(`🔔 SERVER LEVEL - Auth route: ${req.method} ${req.originalUrl}`);
  next();
}, authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Serenica Backend is running ✅");
});

// ✅ Error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
