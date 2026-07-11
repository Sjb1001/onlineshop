const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {

    try {

        const order = new Order(req.body);

        await order.save();

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

module.exports = router;
