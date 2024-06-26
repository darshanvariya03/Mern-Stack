const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dh74x8sny',
    api_key: '644672468419862',
    api_secret: 'n2yCMbEdWZjdDPRQEkANimzhHUA',
});

module.exports = cloudinary;