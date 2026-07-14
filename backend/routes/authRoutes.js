const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    console.log("Request Body:", req.body);

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({ message: "Registered successfully!" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const jwt = require("jsonwebtoken");

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "lazhoppee_secret"
    );

    res.json({
    message: "Login successful!",
    token,
    userId: user._id,
    role: user.role,
    fullname: user.fullname
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

console.log("✅ Auth routes loaded");

// Get all sellers
router.get("/sellers", async (req, res) => {

  try {

    const sellers = await User.find({
      role: "seller"
    }).select("-password");

    res.json(sellers);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

router.get("/sellers", async (req, res) => {

    try {

        const sellers = await User.find({

            role: "seller"

        }).select("-password");

        res.json(sellers);

    }

    catch(err){

        res.status(500).json({

            message: err.message

        });

    }

});

router.put("/status/:id", async (req, res) => {

    try {

        const { status } = req.body;

        const seller = await User.findByIdAndUpdate(

            req.params.id,

            { status },

            { new: true }

        );

        res.json(seller);

    }

    catch(err){

        res.status(500).json({

            message: err.message

        });

    }

});

module.exports = router;
