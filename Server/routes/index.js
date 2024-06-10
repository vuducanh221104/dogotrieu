const productRoutes = require('./products');
const materialRoutes = require('./material');
const categoryRoutes = require('./category');

function routes(app) {
    app.use('/api/v1/product', productRoutes);
    app.use('/api/v1/material', materialRoutes);
    app.use('/api/v1/category', categoryRoutes);
}

module.exports = routes;
