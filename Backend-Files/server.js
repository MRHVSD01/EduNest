const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./models/db");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
connectDB();

const user = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../Frontend-Files")));

// ----------------------------------This code is to open the HTML pages at local server--------------------------
const pageRoutes = require("./routes/pageRoutes");
app.use("/", pageRoutes);

//---------------------------------API Endpoints Routes of Notes form Detail--------------------------------------
const notesRoutes = require("./routes/notesRoutes");
app.use("/api", notesRoutes);

//---------------------------------API Endpoints Routes of Signin, Login & Logout----------------------------------
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

//------------------------API Endpoint for verify-session----------------------------------------------------------
const authenticateToken = require("./middlewares/authMiddleware");
app.get("/api/verify-session", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userInfo = await user.findById(userId).select("-password");

    res.json({
      success: true,
      message: "Profile data fetched successfully",
      user: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});