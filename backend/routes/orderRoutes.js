const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

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

        for (const item of cartItems) {

    // Get the latest product information
    const latestProduct = await Product.findById(item.product._id);

    if (!latestProduct) {

        return res.status(404).json({

            message: "Product not found."

        });

    }

    // Check if enough stock is available
    if (latestProduct.stock < item.quantity) {

        return res.status(400).json({

            message: `${latestProduct.productName} does not have enough stock.`

        });

    }

    items.push({

        product: latestProduct._id,

        quantity: item.quantity,

        price: latestProduct.price

    });

    total += latestProduct.price * item.quantity;

    // Reduce stock
    latestProduct.stock -= item.quantity;

    await latestProduct.save();

}

        const order = new Order({

    customer: customerId,

    store: storeId,

    items,

    total,

    deliveryAddress: req.body.deliveryAddress,

    deliveryLatitude: req.body.deliveryLatitude,

    deliveryLongitude: req.body.deliveryLongitude,

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

        .populate(
    "store",
    "storeName latitude longitude address"
)

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

router.put("/:id/cancel", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order not found."

            });

        }

        if (order.status !== "Pending") {

            return res.status(400).json({

                message: "Only pending orders can be cancelled."

            });

        }

        // Restore product stock
        for (const item of order.items) {

            await Product.findByIdAndUpdate(

                item.product,

                {

                    $inc: {

                        stock: item.quantity

                    }

                }

            );

        }

        order.status = "Cancelled";

        await order.save();

        res.json({

            message: "Order cancelled successfully.",

            order

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Available deliveries for couriers
router.get("/available", async (req, res) => {

    try {

        const orders = await Order.find({

            status: "Ready for Pickup",

            courier: null

        })
        .populate("customer", "fullname")
        .populate("store", "storeName")
        .populate("items.product");

        res.json(orders);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Courier accepts a delivery
router.put("/:id/accept", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }

        order.courier = req.body.courierId;

        order.status = "Picked Up";

        await order.save();

        res.json(order);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Get deliveries assigned to a courier
router.get("/courier/:courierId", async (req, res) => {

    try {

        const orders = await Order.find({

            courier: req.params.courierId

        })
        .populate("customer", "fullname")
        .populate("store", "storeName latitude longitude address")
        .populate("items.product");

        res.json(orders);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Courier updates delivery status
router.put("/:id/delivery-status", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order not found"

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
