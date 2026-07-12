const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

router.post("/", async (req, res) => {

    try {

        const review = new Review(req.body);

        await review.save();

        res.json(review);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

router.get("/product/:productId", async (req, res) => {

    try {

        const reviews = await Review.find({

            product: req.params.productId

        })
        .populate("customer", "fullname");

        res.json(reviews);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

module.exports = router;
