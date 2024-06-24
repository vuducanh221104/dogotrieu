const productRoutes = require('./products');
const materialRoutes = require('./material');
const categoryRoutes = require('./category');
const homeRoutes = require('./home');
const uploadRoutes = require('../Upload/uploadCloudinary');

function routes(app) {
    app.use('/api/v1/product', productRoutes);
    app.use('/api/v1/material', materialRoutes);
    app.use('/api/v1/category', categoryRoutes);
    app.use('/api/v1/home', homeRoutes);
    app.use('/api/v1/upload', uploadRoutes);
}

module.exports = routes;
