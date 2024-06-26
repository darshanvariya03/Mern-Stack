const cartModels = require('../models/CartModels');
const productModels = require('../models/ProductModels')

const singleProduct = async (req,res) =>{
    let id = req.query.id; 
    try{
        let record = await productModels.findById(id);
        
        return res.status(200).send({
            success : true,
            message : "Fetch successfully",
            record
        })

    }catch(err){
        console.log(err);
        return false
    }
}

const cartAdd = async (req,res) =>{
    try{
        const { categoryId , productId , name , price , qty , image ,userId} = req.body
        let cartAdd = await cartModels.create({
            categoryId , productId , name , price , qty , image ,userId
        })
        return res.status(200).send({
            success : true,
            message : "Product add to cart",
            cartAdd
        })
    }catch(err){
        console.log(err);
        return false;
    }
}
const cartDelete = async (req,res) =>{
    try {
        let id = req.query.id;
        let data = await cartModels.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category successfully deleted"
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const cartView = async (req,res) =>{
    try {
        let userid = req.query.userId;
        let cart = await cartModels.find({ userId : userid});
        return res.status(200).send({
            success: true,
            message: res.message,
            cart
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const cartUpdate = async (req, res) => {
    try {
        const { cartId, qty } = req.body;

        if (qty < 1) {
            return res.status(400).send({
                success: false,
                message: "invalid"
            });
        }

        let cartItem = await cartModels.findById(cartId);
        if (!cartItem) {
            return res.status(404).send({
                success: false,
                message: "Cart not found"
            });
        }

        cartItem.qty = qty;
        // await cartItem.save();

        return res.status(200).send({
            success: true,
            message: "Cart update successfully",
            cartItem
        });
    } catch (err) {
        console.log(err);
        return false
    }
};

const cartClear = async (req,res) => {
    try {
        // let userId = req.user.id;
        let clearData = await cartModels.deleteMany({});
        return res.status(200).send({
            success: true,
            message: "Cart Succefullu Cleared",
            clearData
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to clear the cart' });
      }
}



module.exports ={
    singleProduct,
    cartAdd,
    cartView,
    cartDelete,
    cartUpdate,
    cartClear
}