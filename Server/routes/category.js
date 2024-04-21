const express = require('express');
const router = express.Router();
const Products = require('../Models/Products');
const CategoryImage = require('../Models/ImageCategory');
const CategoryBox = require('../Models/ImageCategoryBox');

router.get('/:slug', async (req, res) => {
    try {
        const nameClassify = req.params.slug;
        const data = await Products.find({
            $or: [
                { 'category.category_slug': nameClassify },
                { 'category.category_item_slug': nameClassify },
                { 'category.category_item_child_slug': nameClassify },
            ],
        }).sort({ price_discount: 1 });

        if (!data) {
            return res.status(404).json({ error: 'Invalid slug' });
        }

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
        res.status(500).json({ error: 'Error Server' });
    }
});

router.get('/filter/:slug', async (req, res) => {
    try {
        const nameClassify = req.params.slug;

        const data = await Products.find({
            $or: [
                { 'category.category_slug': nameClassify },
                { 'category.category_item_slug': nameClassify },
                { 'category.category_item_child_slug': nameClassify },
            ],
        });

        let dataSort;
        const { order } = req.query;

        switch (order) {
            case 'price-asc':
                dataSort = _.orderBy(data, ['price_discount'], ['asc']);
                break;
            case 'price-desc':
                dataSort = _.orderBy(data, ['price_discount'], ['desc']);
                break;
            default:
                break;
        }

        return res.status(200).json(dataSort);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product detail' });
    }
});

// Image
router.get('/image/:slug', async (req, res) => {
    try {
        const allSlug = req.params.slug;
        const find = await CategoryImage.findOne({ slug: allSlug });
        res.status(200).json(find);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/box/:slug', async (req, res) => {
    try {
        const allSlug = req.params.slug;
        const find = await CategoryBox.find({
            $or: [
                { category_parent_slug: allSlug },
                { 'box_product.box_product_slug': allSlug },
                { category_slug: allSlug },
            ],
        }).sort({ createdAt: -1 });
        if (!find) {
            res.status(404).json({ message: 'error' });
        }
        res.status(200).json(find);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
