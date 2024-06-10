const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

function createMaterialList(categories, parent_id = null) {
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
            children: createMaterialList(categories, cate._id),
        });
    }
    return categoryList;
}

router.get('/', async (req, res) => {
    try {
        const dataMaterial = await Material.find({}).exec();
        if (dataMaterial) {
            const materialList = createMaterialList(dataMaterial);
            res.json({ material_list: materialList });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const materialCreate = new Material(req.body);
        const data = await materialCreate.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
