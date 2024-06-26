const UserModels = require('../models/UserModels');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, city, phone } = req.body;
        const user = await UserModels.create({ name, email, password, city, phone });
        return res.status(200).send({
            success: true,
            message: "User successfully created",
            user
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModels.findOne({ email: email });
        if (!user || user.password !== password) {
            return res.status(200).send({
                success: false,
                message: "Password not valid"
            });
        }
        const token = jwt.sign({ payload: user }, 'mern', { expiresIn: '2h' });
        return res.status(200).send({
            success: true,
            message: "Token is created",
            token,
            user
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ error: 'No token provided' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'mern');
        const user = await UserModels.findOne({ _id: decoded.payload._id });
        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await UserModels.find({});
        if (!users) {
            return res.status(404).send({
                success: false,
                message: 'Users not found'
            });
        }
        res.status(200).send({
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
};

const getUserprofile = async (req,res) => {
    try {
        const id = req.query.id
        const users = await UserModels.findById(id);
        if (!users) {
            return res.status(404).send({
                success: false,
                message: 'Users not found'
            });
        }
        res.status(200).send({
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const id = req.query.id;
        const { currentPassword, newPassword } = req.body;

        if (!id || !currentPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'ID, current password, and new password are required fields'
            });
        }

        const user = await UserModels.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        if (user.password !== currentPassword) {
            return res.status(400).send({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).send({
            success: true,
            message: 'Password successfully changed'
        });
    } catch (err) {
        console.error('Error changing password:', err);
        return res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.query.id;
        const { name, phone } = req.body;

        if (!id || !name) {
            return res.status(400).send({
                success: false,
                message: 'ID and name are required fields'
            });
        }

        const updatedUser = await UserModels.findByIdAndUpdate(id, { name, phone }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Profile successfully updated',
            data: updatedUser
        });
    } catch (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        const record = await UserModels.findById(id);
        if (!record) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        await UserModels.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "User deleted successfully",
            record
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    adminAuth,
    getUser,
    deleteUser,
    getUserprofile,
    updateUser,
    changePassword
};
