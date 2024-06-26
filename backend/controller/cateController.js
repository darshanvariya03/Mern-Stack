const CateModels = require('../models/CategoryModels');


const CategoryAdd = async (req, res) => {
    try {
        const { name } = req.body
        const category = await CateModels.create({
            name
        })
        return res.status(200).send({
            success: true,
            message: "Category successfully created",
            category
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
}
const categoryView = async (req, res) => {
    try {
        let category = await CateModels.find({});
        return res.status(200).send({
            success: true,
            message: res.message,
            category
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const categoryDelete = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await CateModels.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category successfully deleted"
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const categoryEdit = async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        let data = await CateModels.findById(id);
        return res.status(200).send({
            success: true,
            message: "Category fetch",
            singlecategory: data
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const categoryUpdate = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await CateModels.findByIdAndUpdate(id, {
            name: req.body.name
        })
        return res.status(200).send({
            success: true,
            message: "Category Successfully Update",
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}




module.exports = {
    CategoryAdd, categoryView, categoryDelete, categoryEdit, categoryUpdate
}