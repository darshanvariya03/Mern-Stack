const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    qty : {
        type : Number,
        default : 1
    },
    image : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})

const cart = mongoose.model('cart',cartSchema);

module.exports = cart;