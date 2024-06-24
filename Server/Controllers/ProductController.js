const Product = require('../models/Product');
const ProductType = require('../models/ProductType');

class ProductController {
    //[GET]
    async feaProductByCategory(req, res) {
        const { category_id, material_id } = req.query; // Lấy category_id và material_id từ params

        try {
            // Tìm tất cả các sản phẩm trước
            let products = await Product.find()
                .populate({
                    path: 'category_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })
                .populate({
                    path: 'material_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })
                .exec();

            // Chuyển category_id và material_id thành mảng nếu chúng không phải là mảng
            const categoryIdsArray = Array.isArray(category_id) ? category_id : category_id ? [category_id] : [];
            const materialIdsArray = Array.isArray(material_id) ? material_id : material_id ? [material_id] : [];

            // Chuyển categoryIdsArray và materialIdsArray thành Set để tăng hiệu suất
            const categoryIdsSet = new Set(categoryIdsArray);
            const materialIdsSet = new Set(materialIdsArray);

            // Lọc các sản phẩm
            products = products.filter((product) => {
                // Tạo danh sách tất cả các ID của danh mục và vật liệu
                const productCategoryIds = product.category_id.map((category) => category._id.toString());
                const parentCategoryIds = product.category_id
                    .map((category) => (category.parent_id ? category.parent_id._id.toString() : null))
                    .filter((id) => id !== null);

                const productMaterialIds = product.material_id.map((material) => material._id.toString());
                const parentMaterialIds = product.material_id
                    .map((material) => (material.parent_id ? material.parent_id._id.toString() : null))
                    .filter((id) => id !== null);

                // Gộp tất cả các ID và các ID cha vào một Set
                const allCategoryIds = new Set([...productCategoryIds, ...parentCategoryIds]);
                const allMaterialIds = new Set([...productMaterialIds, ...parentMaterialIds]);

                // Kiểm tra xem tất cả phần tử trong categoryIdsSet có nằm trong allCategoryIds không
                const categoryMatch =
                    categoryIdsSet.size === 0 || Array.from(categoryIdsSet).every((id) => allCategoryIds.has(id));

                // Kiểm tra xem tất cả phần tử trong materialIdsSet có nằm trong allMaterialIds không
                const materialMatch =
                    materialIdsSet.size === 0 || Array.from(materialIdsSet).every((id) => allMaterialIds.has(id));

                return categoryMatch && materialMatch;
            });

            // Giới hạn số lượng sản phẩm trả về là 12
            products = products.slice(0, 12);

            res.status(200).json(products); // Trả về danh sách sản phẩm tìm được
        } catch (error) {
            res.status(500).json({ message: error.message }); // Xử lý lỗi nếu có
        }
    }
    // [GET]
    async fearProductById(req, res) {
        const { id } = req.query; // Lấy danh sách id sản phẩm từ query params
        console.log(id);
        try {
            // Chuyển id thành mảng các id
            const ids = Array.isArray(id) ? id : [id];

            // Tìm tất cả các sản phẩm có _id trong danh sách ids
            const products = await Product.find({
                _id: { $in: ids }, // Tìm các sản phẩm có _id thuộc danh sách ids
            })
                .populate({
                    path: 'category_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })
                .populate({
                    path: 'material_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })
                .exec();

            res.status(200).json(products); // Trả về danh sách sản phẩm tìm được
        } catch (error) {
            res.status(500).json({ message: error.message }); // Xử lý lỗi nếu có
        }
    }
    //[GET]
    async getOnlyProduct(req, res) {
        try {
            const onlyProduct = await Product.find({})
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
            res.status(200).json(onlyProduct);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[GET]
    async getAllProduct(req, res) {
        try {
            const products = await Product.find({})
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
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
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
            res.status(500).json({ message: error.message });
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
            res.status(500).json({ message: error.message });
        }
    }
    //[POST]
    async addProductWithType(req, res) {
        try {
            const { product_type_data, product_data } = req.body;
            // SKU
            // Tạo ProductType trước
            const productType = new ProductType(product_type_data);
            const savedProductType = await productType.save();

            // Sử dụng _id của ProductType để thêm Product
            product_data.product_type_id = savedProductType._id;
            const product = new Product(product_data);
            const savedProduct = await product.save();

            // Trả về kết quả
            res.status(200).json({ savedProductType, savedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[DELETE]
    async deleteProduct(req, res) {
        const { product_id, product_type_id } = req.body;
        try {
            const deletedProduct = await Product.findByIdAndDelete({ _id: product_id });
            const deletedProductType = await ProductType.findByIdAndDelete({ _id: product_type_id });

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (!deletedProductType) {
                return res.status(404).json({ message: 'Product type not found' });
            }
            res.status(200).json({ message: 'Delete Successfully' });
        } catch (error) {
            console.error('Error during delete operation:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
    //[PATCH]
    async editProduct(req, res) {
        try {
            const productId = req.params.id;
            const updateData = req.body;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            Object.keys(updateData).forEach((key) => {
                if (key !== 'product_type_id') {
                    product[key] = updateData[key];
                }
            });

            if (updateData.product_type_id) {
                const productType = await ProductType.findById(product.product_type_id);
                if (productType) {
                    Object.keys(updateData.product_type_id).forEach((key) => {
                        productType[key] = updateData.product_type_id[key];
                    });
                    await productType.save();
                } else {
                    return res.status(404).json({ message: 'ProductType not found' });
                }
            }

            // Save the updated product
            await product.save();

            res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }
}
module.exports = new ProductController();
