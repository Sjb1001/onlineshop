const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },

    message: {
        type: String,
        required: true
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Message", messageSchema);
