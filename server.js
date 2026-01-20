const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./routes/blogRoutes");

const app = express();

// ✅ CORS CONFIG
const allowedOrigins = [
  "https://digitalsuccesssolutions.in",
  "http://192.168.1.9:3000",
  "http://localhost:5173",
    "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 👇 DATABASE CONNECT
mongoose
  .connect(
    "mongodb+srv://digitalssdevdata_db_user:EWuIz0CGoPZajxED@cluster0.irtdnri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/blogs", blogRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
