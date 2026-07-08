  console.log("✅ Product routes loaded");

  const express = require("express");
  const router = express.Router();

  const Product = require("../models/Product");

  // ==========================
  // Get All Products
  // ==========================
  router.get("/", async (req, res) => {

      try {

          const products = await Product.find()
              .populate("store", "storeName")
              .populate("category", "name");

          res.json(products);

      } catch (err) {

          res.status(500).json({
              message: err.message
          });

      }

  });

  // ==========================
  // Get Products by Store
  // ==========================
  router.get("/store/:storeId", async (req, res) => {

      try {

          const products = await Product.find({
              store: req.params.storeId
          })
          .populate("category", "name")
          .populate("store", "storeName");

          res.json(products);

      } catch (err) {

          res.status(500).json({
              message: err.message
          });

      }

  });

  // ==========================
  // Create Product
  // ==========================
  router.post("/", async (req, res) => {

      try {

          const product = new Product(req.body);

          await product.save();

          res.json(product);

      } catch (err) {

          res.status(500).json({
              message: err.message
          });

      }

  });

  // ==========================
// Get Single Product
// ==========================
router.get("/:id", async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("store", "storeName")
            .populate("category", "name");

        res.json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================
// Update Product
// ==========================
router.put("/:id", async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================
// Delete Product
// ==========================
router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

}); 

  module.exports = router;
