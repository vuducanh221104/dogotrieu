const productRoutes = require('./products');
const categoryRoutes = require('./category');

function routes(app) {
    app.use('/api/product', productRoutes);
    app.use('/api/category', categoryRoutes);
}

module.exports = routes;
