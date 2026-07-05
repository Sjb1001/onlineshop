const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    storeName: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    address: {
        type: String
    },

    latitude: Number,
    longitude: Number,

    status: {
        type: String,
        default: "pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Store", storeSchema);
