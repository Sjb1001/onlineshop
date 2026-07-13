const express = require("express");
const router = express.Router();

const Message = require("../models/Message");

// Send Message
router.post("/", async (req, res) => {

    try {

        const message = new Message({

    sender: req.body.sender,

    customer: req.body.customer,

    store: req.body.store,

    message: req.body.message

});

        await message.save();

        res.json(message);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Get Conversation
router.get("/:storeId", async (req, res) => {

    try {

        const messages = await Message.find({

            store: req.params.storeId

        })
        .populate("sender", "fullname")
        .sort({

            createdAt: 1

        });

        res.json(messages);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Seller Inbox
router.get("/store/:storeId/inbox", async (req, res) => {

    try {

        const messages = await Message.find({

            store: req.params.storeId

        })
        .populate("sender", "fullname")
.populate("customer", "fullname")
        .sort({

            createdAt: -1

        });

        const conversations = [];

        const customers = new Set();

        for (const message of messages) {

            const customerId = message.customer._id.toString();

            if (!customers.has(customerId)) {

                customers.add(customerId);

                conversations.push({

                    customer: message.customer,

                    lastMessage: message.message,

                    createdAt: message.createdAt

                });

            }

        }

        res.json(conversations);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

// Conversation between one customer and one store
router.get("/store/:storeId/customer/:customerId", async (req, res) => {

    try {

        const messages = await Message.find({

    store: req.params.storeId,

    customer: req.params.customerId

})
        .populate("sender", "fullname")
        .sort({

            createdAt: 1

        });

        res.json(messages);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

module.exports = router;
