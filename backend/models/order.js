const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

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

    deliveryAddress: {
    type: String,
    required: true
},

deliveryLatitude: {
    type: Number
},

deliveryLongitude: {
    type: Number
},

    // NEW
    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    items: [

        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            quantity: {
                type: Number,
                default: 1
            },

            price: Number
        }

    ],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Processing",
            "Ready for Pickup",
            "Picked Up",
            "In Transit",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Order", orderSchema);
