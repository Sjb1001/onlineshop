const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");

router.post("/checkout", async (req, res) => {

    try {

        const customerId = req.body.customer;

        // Get all cart items
        const cartItems = await Cart.find({
            customer: customerId
        }).populate({
            path: "product",
            populate: {
                path: "store"
            }
        });

        if (cartItems.length === 0) {

            return res.status(400).json({
                message: "Cart is empty."
            });

        }

        const items = [];
        let total = 0;

        // For now we assume all items belong to one store
        const storeId = cartItems[0].product.store._id;

        cartItems.forEach(item => {

            items.push({

                product: item.product._id,

                quantity: item.quantity,

                price: item.product.price

            });

            total += item.product.price * item.quantity;

        });

        const order = new Order({

            customer: customerId,

            store: storeId,

            items,

            total,

            status: "Pending"

        });

        await order.save();

        // Clear customer's cart
        await Cart.deleteMany({
            customer: customerId
        });

        res.json(order);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

router.get("/customer/:id", async (req, res) => {

    try {

        const orders = await Order.find({

            customer: req.params.id

        })

        .populate("items.product")

        .populate("store", "storeName");

        res.json(orders);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

router.get("/store/:storeId", async (req, res) => {

    try {

        const orders = await Order.find({

            store: req.params.storeId

        })

        .populate("customer", "fullname")

        .populate("items.product");

        res.json(orders);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// ==========================
// Update Order Status
// ==========================
router.put("/:id/status", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order not found."
            });

        }

        order.status = req.body.status;

        await order.save();

        res.json(order);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;
