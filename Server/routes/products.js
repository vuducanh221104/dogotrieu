const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');
const ProductController = require('../Controllers/ProductController');
//Test get all
router.get('/get', async (req, res) => {
    try {
        const products = await Product.find({})
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

        console.log(JSON.stringify(products, null, 2)); // Log the output for debugging

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Real
router.get('/type/:id', ProductController.getProductAndProductType);
router.post('/', ProductController.addProductType);
router.post('/type', ProductController.addProduct);

// Cập nhật Product và liên kết ProductType
// router.patch('/:id', async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const updatedData = req.body;

//         // Tách cập nhật ProductType nếu có
//         let updatedProductTypeData = null;
//         if (updatedData.product_type_id && typeof updatedData.product_type_id === 'object') {
//             updatedProductTypeData = updatedData.product_type_id;
//             delete updatedData.product_type_id;
//         }

//         // Cập nhật Product
//         const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true }).populate(
//             'product_type_id',
//         );
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Cập nhật ProductType nếu có
//         if (updatedProductTypeData) {
//             await ProductType.findByIdAndUpdate(updatedProduct.product_type_id._id, updatedProductTypeData, {
//                 new: true,
//             });
//         }

//         res.json(updatedProduct);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
module.exports = router;
