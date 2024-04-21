const Products = require('../Models/Products');
const productDetails = require('../Models/ProductsDetails');
// const ProductDescription = require('../Models/ProductDesription');
const _ = require('lodash');
class ProductController {
    // [GET] /product ~Get All Product
    async products(req, res) {
        try {
            const data = await Products.find({});
            res.status(200).json(data);
        } catch (err) {}
    }

    // [GET]/product/:slug ~Get Details Product
    async slugProducts(req, res, next) {
        try {
            const slug = req.params.slug; // Lấy giá trị slug từ URL params
            const productDetail = await productDetails.findOne({ slug });

            if (!productDetail) {
                return res.status(404).json({ message: 'Tài liệu không tồn tại' });
            }

            res.status(200).json(productDetail);
        } catch (err) {
            next(err);
        }
    }

    // [GET]/product/related/:classify  ~CHECK RELATIVE PRODUCT
    async relatedProduct(req, res, next) {
        try {
            const classify = req.params.classify;

            // Find related products with the same classify
            const relatedProducts = await Products.find({ classify_slug: classify }).limit(5);

            res.status(200).json(relatedProducts);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // [POST]/product/add ~Create New Product (Card)
    async createProduct(req, res, next) {
        try {
            const productDetailData = req.body;
            const newProductDetail = new Products(productDetailData);
            const savedProductDetail = await newProductDetail.save();
            res.status(201).json(savedProductDetail);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product detail' });
        }
    }

    //[POST]/product/add-product-detail ~Create New Product Details (Info)
    async createProductDetails(req, res, next) {
        try {
            const newProductDetail = new productDetails(req.body);
            const savedProductDetail = await newProductDetail.save();
            res.status(201).json(savedProductDetail); // Gửi lại dữ liệu sản phẩm đã tạo dưới dạng JSON
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product detail' });
        }
    }

    // [GET] : API?q=''&type=less
    async seachProductWithQ(req, res, next) {
        try {
            const { q, type } = req.query;
            let query = {};
            if (q) {
                query = { name: { $regex: q, $options: 'i' } };
            }
            if (type === 'more') {
                // Lấy nhiều kết quả
                const users = await Products.find(query);
                res.status(200).json(users);
            } else {
                // Lấy ít kết quả
                const users = await Products.find(query).limit(7);
                res.status(200).json(users);
            }
        } catch (err) {
            res.status(500).json('Server error : ', err);
        }
    }

    // [GET]/product/search-all ~FIND ALL WHEN CLICK SEARCH
    async searchProduct(req, res, next) {
        try {
            const limit = parseInt(req.query.limit);
            // GET QUERY
            const { k } = req.query;
            let query = {};
            if (k) {
                query = { name: { $regex: new RegExp(k), $options: 'i' } };
            }
            const data = await Products.find(query).limit(limit).sort({ price_discount: -1 });
            if (data.length <= 0) {
                return res.status(200).json([]);
            }
            // HANDLE SORT
            let dataSort;
            const { order } = req.query;
            switch (order) {
                case 'price-asc':
                    dataSort = _.orderBy(data, ['price_discount'], ['asc']);
                    break;
                case 'price-desc':
                    dataSort = _.orderBy(data, ['price_discount'], ['desc']);
                    break;
                case 'latest':
                    dataSort = _.orderBy(data, ['createAt'], ['desc']);
                    break;
                default:
                    break;
            }

            return res.status(200).json(order ? dataSort : data);
        } catch (err) {
            res.status(500).json({ error: 'Failed to Find Product' });
        }
    }
}

module.exports = new ProductController();
