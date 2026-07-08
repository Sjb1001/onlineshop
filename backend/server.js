  const authRoutes = require("./routes/authRoutes");
  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");
  require("dotenv").config();
  const categoryRoutes = require("./routes/categoryRoutes");

  const productRoutes = require("./routes/productRoutes");
  const storeRoutes = require("./routes/storeRoutes");

  const app = express();

  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/products", productRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/stores", storeRoutes);

  console.log("Category routes loaded");

  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB Connected");

      app.listen(3000, () => {
        console.log("🚀 Server running on port 3000");
      });
    })
    .catch((err) => {
    console.error("❌ MongoDB Connection Error");
    console.error(err.name);
    console.error(err.message);
    console.error(err);
  });
  app.get("/", (req, res) => {
    res.send("Lazhoppee Backend Running!");
  });
