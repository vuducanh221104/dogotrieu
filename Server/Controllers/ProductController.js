const Product = require('../models/Product');
const ProductType = require('../models/ProductType');

class ProductController {
    //[GET]
    async getProductAndProductType(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId)
                .populate('product_type_id')
                .populate({
                    path: 'material_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })
                .populate({
                    path: 'category_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })
                .exec();
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[POST]
    async addProduct(req, res) {
        try {
            const productType = new ProductType(req.body);
            const savedProductType = await productType.save();
            res.status(201).json(savedProductType);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    //[POST]
    async addProductType(req, res) {
        try {
            const { product_type_id } = req.body;
            const productType = await ProductType.findById(product_type_id);
            if (!productType) {
                return res.status(400).json({ message: 'ProductType with given ID not found' }); // Modify error message
            }

            const product = new Product(req.body);
            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
module.exports = new ProductController();
