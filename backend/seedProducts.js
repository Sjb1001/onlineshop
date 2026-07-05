const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Product.deleteMany({});

    console.log("Old products removed.");

    const products = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 599,
    image: "https://via.placeholder.com/300",
    category: "Accessories",
    stock: 20,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard",
    price: 2499,
    image: "https://via.placeholder.com/300",
    category: "Accessories",
    stock: 15,
  },
  {
    name: "Gaming Headset",
    description: "Surround sound headset",
    price: 1899,
    image: "https://via.placeholder.com/300",
    category: "Audio",
    stock: 12,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum stand",
    price: 999,
    image: "https://via.placeholder.com/300",
    category: "Office",
    stock: 18,
  },
  {
    name: "USB-C Hub",
    description: "6-in-1 USB-C Hub",
    price: 1499,
    image: "https://via.placeholder.com/300",
    category: "Accessories",
    stock: 25,
  }
];

    await Product.insertMany(products);

    console.log("Products inserted successfully!");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
