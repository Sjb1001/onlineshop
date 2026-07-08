
const express = require("express");
const router = express.Router();

console.log("✅ Store routes loaded");

const Store = require("../models/Store");

// =========================
// Create Store
// =========================
router.post("/", async (req, res) => {

    console.log("========== STORE REQUEST ==========");
    console.log(req.body);

    try {

        const store = new Store(req.body);

        console.log("Store object:");
        console.log(store);

        await store.save();

        res.json(store);

    } catch (err) {

        console.log("========== STORE ERROR ==========");
        console.error(err);

        res.status(500).json({
            message: err.message,
            error: err
        });

    }

});

// =========================
// Get All Stores
// =========================
router.get("/", async (req, res) => {

    try {

        const stores = await Store.find()
            .populate("owner", "fullname email")
            .populate("allowedCategories", "name");

        res.json(stores);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =========================
// Approve Store
// =========================
router.put("/:id/approve", async (req, res) => {

    try {

        const store = await Store.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );

        res.json(store);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// =========================
// Get Store by Owner
// =========================
router.get("/owner/:ownerId", async (req, res) => {

    try {

        const store = await Store.findOne({
            owner: req.params.ownerId
        })
        .populate("allowedCategories", "name");

console.log("STORE SENT:", store);

        res.json(store);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =========================
// Assign Categories to Store
// =========================
router.put("/:id/categories", async (req, res) => {

    try {

        const store = await Store.findByIdAndUpdate(
            req.params.id,
            {
                allowedCategories: req.body.allowedCategories
            },
            {
                new: true
            }
        );

        res.json(store);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =========================
// Get Single Store
// =========================
router.get("/:id", async (req, res) => {

    try {

        const store = await Store.findById(req.params.id)
            .populate("owner", "fullname email")
            .populate("allowedCategories");

        res.json(store);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});



module.exports = router;
