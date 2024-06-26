const jwt = require('jsonwebtoken');

const VerifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(403).send({
                success: false,
                message: "Token is blank"
            });
        }

        const newToken = token.split(" ")[1];
        jwt.verify(newToken, 'mern', (err, decoded) => {
            if (err) {
                return res.status(503).send({
                    success: false,
                    message: "Token is not valid"
                });
            }
            req.user = decoded.payload;
            next();
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }
        next();
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message
        });
    }
};

module.exports = { VerifyToken, isAdmin };
