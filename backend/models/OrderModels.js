// orderModels.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    cartItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true

        },
        qty: {
            type: Number,
            required: true
        },
        image: {
            type: String,

            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: [true, 'Order status is required'],
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
