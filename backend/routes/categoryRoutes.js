const express = require("express");
const router = express.Router();

const Category = require("../models/Category");


// GET all categories
router.get("/", async (req, res) => {
    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
});


// ADD category
router.post("/", async (req, res) => {

    try {

        const category = new Category({
            name: req.body.name
        });

        await category.save();

        res.json(category);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// DELETE category
router.delete("/:id", async (req, res) => {

    try {

        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category deleted."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================
// Increase Quantity
// ==========================
router.put("/:id/increase", async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        cart.quantity++;

        await cart.save();

        res.json(cart);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================
// Decrease Quantity
// ==========================
router.put("/:id/decrease", async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (cart.quantity > 1) {

            cart.quantity--;

            await cart.save();

            res.json(cart);

        } else {

            await Cart.findByIdAndDelete(req.params.id);

            res.json({
                message: "Item removed"
            });

        }

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const category = await Category.findByIdAndUpdate(

            req.params.id,

            {
                name: req.body.name
            },

            {
                new: true
            }

        );

        res.json(category);

    }

    catch(err){

        res.status(500).json({

            message: err.message

        });

    }

});

module.exports = router;
