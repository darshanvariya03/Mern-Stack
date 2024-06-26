const express = require('express');

const cors = require('cors');

const {connectDb} = require('./config/db');

const app = express();

const port = 8000;

const productController = require('./controller/productController');

app.use(cors());
connectDb()
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        allowed_formats: ['jpg', 'png'],
    },
});

const upload = multer({ storage: storage });

app.use('/api/v1/auth', require('./routes/AuthRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/product', require('./routes/productRoutes'));
app.use('/api/v1/cart', require('./routes/cartRoutes'));
app.use('/api/v1/order', require('./routes/orderRoutes'));
app.get('/api/v1/product/search', productController.searchProduct);

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
});
