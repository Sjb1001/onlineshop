console.log("✅ Cart routes loaded");

const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.post("/", async (req, res) => {
    try {
        const { customer, product, quantity = 1 } = req.body;

        if (!customer || !product) {
            return res.status(400).json({ message: "Customer and product are required" });
        }

        const existing = await Cart.findOne({ customer, product });

        if (existing) {
            existing.quantity += Number(quantity);
            await existing.save();
            return res.json(existing);
        }

        const cart = new Cart({ customer, product, quantity: Number(quantity) });
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/customer/:customerId", async (req, res) => {
    try {
        const cart = await Cart.find({ customer: req.params.customerId })
            .populate({
                path: "product",
                populate: [
                    { path: "store", select: "storeName" },
                    { path: "category", select: "name" }
                ]
            });

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/customer/:customerId", async (req, res) => {
    try {
        await Cart.deleteMany({ customer: req.params.customerId });
        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
