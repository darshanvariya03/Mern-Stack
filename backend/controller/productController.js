const ProductModels = require('../models/ProductModels');
const cloudinary = require('../config/cloudinary');

const ProductAdd = async (req, res) => {
    try {
        const { category, name, image, price, description, marketstatus, gender } = req.body;

        let imageUrl = await cloudinary.uploader.upload(req.file.path);

        let add = await ProductModels.create({
            categoryId: category,
            name: name,
            price: price,
            description: description,
            image: imageUrl.secure_url,
            public_id: imageUrl.public_id,
            marketstatus: marketstatus,
            gender: gender
        })
        return res.status(200).send({
            success: true,
            message: "Product successfully add",
            product: add
        })
    } catch (err) {
        console.log(err);
        return false;
    }
};


const productView = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;

        const products = await ProductModels.find({}).skip(skip).limit(limit);
        const totalProducts = await ProductModels.countDocuments({});
        // console.log(products);

        return res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (err) {
        console.log(err);
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};
const productDelete = async (req, res) => {
    try {
        let id = req.query.id
        const record = await ProductModels.findById(id);
        await cloudinary.uploader.destroy(record.public_id)
        await ProductModels.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Product delete successfully"
        })

    } catch (err) {
        console.log(err);;
        return false;
    }
};

const productEdit = async (req, res) => {
    try {
        let id = req.query.id;
        let product = await ProductModels.findById(id);
        return res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            product
        });
    } catch (err) {
        console.log(err);
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};

const productUpdate = async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        const { category, name, price, description, marketstatus, gender } = req.body;
        let updatedData = {
            categoryId: category,
            name: name,
            price: price,
            description: description,
            marketstatus: marketstatus,
            gender: gender
        };

        if (req.file) {
            let record = await ProductModels.findById(id);
            await cloudinary.uploader.destroy(record.public_id);
            let imageUrl = await cloudinary.uploader.upload(req.file.path);
            updatedData.image = imageUrl.secure_url;
            updatedData.public_id = imageUrl.public_id;
        }

        let updatedProduct = await ProductModels.findByIdAndUpdate(id, updatedData, { new: true });
        return res.status(200).send({
            success: true,
            message: "Product successfully updated",
            product: updatedProduct
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
};

const mstatusUpdate = async (req, res) => {
    try {
        let id = req.query.id
        let status = req.body.mstatus;
        await ProductModels.findByIdAndUpdate(id, {
            marketstatus: status,
        })

        return res.status(200).send({
            success: true,
            message: "Status successfully changed",
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const userProduct = async (req, res) => {
    try {
        let products = await ProductModels.find({}).limit(8);
        return res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products
        });

    } catch (err) {
        console.log(err);
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
}

const newProduct = async (req, res) => {
    try {
        let products = await ProductModels.find({});
        return res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products
        });
    } catch (err) {
        console.log(err);
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
}
const singleProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let record = await ProductModels.findById(id);
        return res.status(200).send({
            success: true,
            message: "Fetch successfully",
            record
        })

    } catch (err) {
        console.log(err);
        return false
    }
}

const searchProduct = async (req, res) => {
    try {
        const query = req.query.query;
        let products = await ProductModels.find({ name: { $regex: query, $options: 'i' } });
        return res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products
        });
    } catch (err) {
        console.log(err);
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    ProductAdd,
    productView,
    productDelete,
    productEdit,
    productUpdate,
    mstatusUpdate,
    userProduct,
    newProduct,
    singleProduct,
    searchProduct
};
