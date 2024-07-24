const Product = require('../models/Product');
const ProductType = require('../models/ProductType');
const Category = require('../models/Category');
function createCategoryList(categories, parent_id = null) {
    const categoryList = [];
    let category;
    if (parent_id === null) {
        category = categories.filter((cat) => cat.parent_id === undefined);
    } else {
        category = categories.filter((cat) => cat.parent_id && cat.parent_id.toString() === parent_id.toString());
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategoryList(categories, cate._id),
        });
    }
    return categoryList;
}

class CategoryController {
    //[GET]
    async categoryAndQueryMaterial(req, res) {
        const categorySlug = req.params.slug || 'all';
        let queryGfMaterial = req.query.gf_material;
        let queryGfAvailab = req.query.gf_availab;
        const sortBy = req.query.sort_by || 'price-asc';

        const limit = parseInt(req.query.limit) || 48;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        if (!queryGfMaterial) {
            queryGfMaterial = [];
        }

        if (!Array.isArray(queryGfMaterial)) {
            queryGfMaterial = [queryGfMaterial];
        }

        queryGfMaterial = queryGfMaterial.filter(Boolean);

        if (!queryGfAvailab) {
            queryGfAvailab = [];
        }

        if (!Array.isArray(queryGfAvailab)) {
            queryGfAvailab = [queryGfAvailab];
        }

        queryGfAvailab = queryGfAvailab.filter(Boolean);

        try {
            let products = await Product.find({})
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

            let category = null;

            if (categorySlug !== 'all') {
                category = await Category.findOne({ slug: categorySlug }).exec();
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                const matchesCategory = (product) => {
                    return product.category_id.some(
                        (category) =>
                            category.slug === categorySlug ||
                            (category.parent_id && category.parent_id.slug === categorySlug),
                    );
                };

                products = products.filter(matchesCategory);
            }

            if (queryGfMaterial.length > 0) {
                products = products.filter((product) => {
                    const materialSlugs = product.material_id.map((material) => material.slug);
                    const parentMaterialSlugs = product.material_id
                        .map((material) => material.parent_id?.slug)
                        .filter(Boolean);
                    const allSlugs = [...materialSlugs, ...parentMaterialSlugs];

                    return queryGfMaterial.every((material) => allSlugs.includes(material));
                });
            }

            if (queryGfAvailab.includes('1')) {
                products = products.filter((product) => product.ship === 1);
            }

            switch (sortBy) {
                case 'availability':
                    products.sort((a, b) => b.quantity - a.quantity);
                    break;
                case 'title-asc':
                    products.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'title-desc':
                    products.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'price-asc':
                    products.sort((a, b) => a.price.original - b.price.original);
                    break;
                case 'price-desc':
                    products.sort((a, b) => b.price.original - a.price.original);
                    break;
                case 'date-asc':
                    products.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    break;
                case 'date-desc':
                    products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                default:
                    break;
            }

            const totalItems = products.length;
            const totalPages = Math.ceil(totalItems / limit);
            const paginatedData = products.slice(skip, skip + limit);

            res.status(200).json({
                nameCategory: categorySlug === 'all' ? 'All Products' : category.name,
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
                data: paginatedData,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[GET]
    async categorySeo(req, res) {
        const categorySlug = req.params.slug || 'all';

        try {
            let products;
            let category = null;

            // Fetch category if not 'all'
            if (categorySlug !== 'all') {
                category = await Category.findOne({ slug: categorySlug }).exec();
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
            }

            const matchCondition = categorySlug !== 'all' ? { 'category_id.slug': categorySlug } : {};

            products = await Product.find({})
                .populate({
                    path: 'material_id',
                    select: 'name parent_id slug',
                    populate: {
                        path: 'parent_id',
                        select: 'name slug',
                    },
                })

                .limit(1)
                .exec();

            res.status(200).json({
                name_category: categorySlug === 'all' ? 'Products' : category.name,
                image: products[0].thumb,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //[GET]
    async categoryList(req, res) {
        try {
            const dataCategory = await Category.find({}).exec();
            if (dataCategory) {
                const categoryList = createCategoryList(dataCategory);
                res.json({ category_list: categoryList });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[POST]
    async categoryAdd(req, res) {
        const categories = req.body;
        const savedMaterials = [];
        try {
            for (const material of categories) {
                const materialCreate = new Category(material);
                const data = await materialCreate.save();
                savedMaterials.push(data);
            }

            res.status(200).json(savedMaterials);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[PATCH]
    async categoryUpdate(req, res) {
        const updatedCategory = req.body;
        try {
            // Use Promise.all to handle multiple updates
            const updatePromises = updatedCategory.map((category) => {
                return Category.findByIdAndUpdate(category._id, category, { new: true });
            });

            // Wait for all updates to complete
            const results = await Promise.all(updatePromises);

            res.json({ message: 'Materials updated successfully', results });
        } catch (error) {
            res.status(500).json({ message: 'Error updating materials', error });
        }
    }
    //[DELETE]
    async categoryDelete(req, res) {
        const { ids } = req.body;
        try {
            await Category.deleteMany({ _id: { $in: ids } });
            res.status(200).json({ message: 'Materials deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new CategoryController();
