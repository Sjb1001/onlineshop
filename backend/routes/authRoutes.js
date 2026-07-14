const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, role, securityQuestion, securityAnswer } = req.body;

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
      role,
      securityQuestion: securityQuestion ? String(securityQuestion).trim() : "",
      securityAnswer: securityAnswer ? String(securityAnswer).trim().toLowerCase() : ""
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

// ==========================
// Get Security Question
// ==========================
router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {

            return res.status(404).json({

                message: "Email not found."

            });

        }

        res.json({

            question: user.securityQuestion

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// ==========================
// Verify Security Answer
// ==========================
router.post("/verify-answer", async (req, res) => {

    try {

        const { email, answer } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const storedAnswer = user.securityAnswer || user.securityanswer || user.security_answer || "";

        console.log("User document keys:", Object.keys(user.toObject ? user.toObject() : user));
        console.log("Stored Answer:", JSON.stringify(storedAnswer));
        console.log("Entered Answer:", JSON.stringify(answer));

        if (!storedAnswer || !String(storedAnswer).trim()) {
            return res.status(400).json({
                message: "Security answer is not set for this user. Please verify the user record."
            });
        }

        const stored = String(storedAnswer).trim().toLowerCase();
        const entered = String(answer).trim().toLowerCase();

        console.log("Stored Normalized:", stored);
        console.log("Entered Normalized:", entered);

        if (stored !== entered) {
            return res.status(400).json({
                message: "Incorrect security answer."
            });
        }

        res.json({
            message: "Verified"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }

});

module.exports = router;
