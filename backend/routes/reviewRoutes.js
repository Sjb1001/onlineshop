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

router.get("/product/:productId/average", async (req, res) => {

    try {

        const reviews = await Review.find({

            product: req.params.productId

        });

        if (reviews.length === 0) {

            return res.json({

                averageRating: 0,

                reviewCount: 0

            });

        }

        const total = reviews.reduce(

            (sum, review) => sum + review.rating,

            0

        );

        const averageRating = total / reviews.length;

        res.json({

            averageRating,

            reviewCount: reviews.length

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

}); 

module.exports = router;
