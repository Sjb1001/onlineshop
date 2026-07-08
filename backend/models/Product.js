  const mongoose = require("mongoose");

  const productSchema = new mongoose.Schema({

      store: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Store",
          required: true
      },

      category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true
      },

      productName: {
          type: String,
          required: true
      },

      description: {
          type: String
      },

      price: {
          type: Number,
          required: true
      },

      stock: {
          type: Number,
          required: true
      },

      image: {
          type: String,
          default: ""
      }

  }, {
      timestamps: true
  });

  module.exports = mongoose.model("Product", productSchema);
