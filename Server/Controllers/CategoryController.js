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
    //[GET] ~ Get To Slug
    async categoryAndQueryMaterial(req, res) {
        const categorySlug = req.params.slug;
        let queryGfMaterial = req.query.gf_material;

        // Lấy tham số limit và page từ query, đặt giá trị mặc định nếu không có
        const limit = parseInt(req.query.limit) || 48;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        // Nếu không có queryGfMaterial, đặt nó là một mảng rỗng
        if (!queryGfMaterial) {
            queryGfMaterial = [];
        }

        // Nếu queryGfMaterial không phải là một mảng, đặt nó vào một mảng
        if (!Array.isArray(queryGfMaterial)) {
            queryGfMaterial = [queryGfMaterial];
        }

        // Lọc ra các giá trị không hợp lệ (undefined hoặc null) trong queryGfMaterial
        queryGfMaterial = queryGfMaterial.filter(Boolean);

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

            // Hàm kiểm tra sản phẩm có khớp với categorySlug hay không
            const matchesCategory = (product) => {
                return product.category_id.some(
                    (category) =>
                        category.slug === categorySlug ||
                        (category.parent_id && category.parent_id.slug === categorySlug),
                );
            };

            let dataOrig = products.filter(matchesCategory);

            // Nếu có queryGfMaterial, lọc theo vật liệu
            if (queryGfMaterial.length > 0) {
                dataOrig = dataOrig.filter((product) => {
                    return product.category_id.some(
                        (category) =>
                            category.slug === queryGfMaterial ||
                            (category.parent_id && category.parent_id.slug === queryGfMaterial),
                    );
                });
            }

            // Tính toán tổng số sản phẩm và số trang
            const totalItems = dataOrig.length;
            const totalPages = Math.ceil(totalItems / limit);

            // Áp dụng phân trang và giới hạn
            const paginatedData = dataOrig.slice(skip, skip + limit);

            res.status(200).json({
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
        try {
            const categooryCreate = new Category(req.body);
            const data = await categooryCreate.save();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new CategoryController();
