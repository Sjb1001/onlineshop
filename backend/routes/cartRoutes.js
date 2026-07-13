console.log("✅ Cart routes loaded");

const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.post("/", async (req, res) => {
    try {
        const { customer, product, quantity = 1 } = req.body;
        const selectedProduct = await Product.findById(product);

if (!selectedProduct) {
    return res.status(404).json({
        message: "Product not found."
    });
}

if (selectedProduct.stock <= 0) {
    return res.status(400).json({
        message: "Product is out of stock."
    });
}

        if (!customer || !product) {
            return res.status(400).json({ message: "Customer and product are required" });
        }

        const existing = await Cart.findOne({ customer, product });

        if (existing) {

    if (existing.quantity + Number(quantity) > selectedProduct.stock) {

        return res.status(400).json({
            message: "Not enough stock available."
        });

    }

    existing.quantity += Number(quantity);

    await existing.save();

    return res.json(existing);

}

        if (Number(quantity) > selectedProduct.stock) {

    return res.status(400).json({
        message: "Not enough stock available."
    });

}

const cart = new Cart({

    customer,

    product,

    quantity: Number(quantity)

});
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/increase", async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        const product = await Product.findById(cartItem.product);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (cartItem.quantity + 1 > product.stock) {
            return res.status(400).json({ message: "Not enough stock available." });
        }

        cartItem.quantity += 1;
        await cartItem.save();

        res.json(cartItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/decrease", async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            return res.json(cartItem);
        }

        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:customerId", async (req, res) => {
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
