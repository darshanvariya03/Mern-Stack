const orderModels = require('../models/OrderModels'); 
const CartModels = require('../models/CartModels')

const orderAdd = async (req, res) => {
    try {
        const { userId, cartItems, total ,status } = req.body;
        await CartModels.deleteMany({});
        const newOrder = await orderModels.create({
            userId,
            cartItems,
            total,
        });
        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            newOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to place order'
        });
    }
}

const orderView = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const orders = await orderModels.find().limit(limit);
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders'
        });
    }
};

const orderUpdate = async (req, res) => {
    try {
        let id = req.query.id
        let status = req.body.ostatus;
        
        let data = await orderModels.findByIdAndUpdate(id, { orderstatus : status })
        return res.status(200).send({
            success: true,
            message: "Status successfully changed",

        })
    } catch (err) {
        console.log(err);
        return false;
    }
};


const orderDelete = async (req, res) => {
    try {
        let id = req.query.id
        const record = await orderModels.findById(id);
        await orderModels.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Order delete successfully"
        })

    } catch (err) {
        console.log(err);;
        return false;
    }
};

module.exports = {
    orderAdd,
    orderView,
    orderUpdate,
    orderDelete
};
