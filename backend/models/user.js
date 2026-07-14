const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["customer", "seller", "admin", "courier"],
        default: "customer"
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    securityQuestion: {
    type: String,
    default: ""
},

securityAnswer: {
    type: String,
    default: ""
},

});

module.exports = mongoose.model("User", userSchema);
