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

class MaterialController {
    //[GET]
    async materialGet(req, res) {
        try {
            const dataMaterial = await Material.find({}).exec();
            if (dataMaterial) {
                const materialList = createMaterialList(dataMaterial);
                res.status(200).json({ material_list: materialList });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //[POST]
    async materialAdd(req, res) {
        try {
            const materials = req.body; // Expecting an array of materials
            const savedMaterials = [];

            for (const material of materials) {
                const materialCreate = new Material(material);
                const data = await materialCreate.save();
                savedMaterials.push(data);
            }

            res.status(200).json(savedMaterials);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //[PATCH]
    async materialUpdate(req, res) {
        const updatedMaterials = req.body;

        try {
            // Use Promise.all to handle multiple updates
            const updatePromises = updatedMaterials.map((material) => {
                return Material.findByIdAndUpdate(material._id, material, { new: true });
            });

            // Wait for all updates to complete
            const results = await Promise.all(updatePromises);

            res.json({ message: 'Materials updated successfully', results });
        } catch (error) {
            res.status(500).json({ message: 'Error updating materials', error });
        }
    }
    //[DELETE]
    async materialDelete(req, res) {
        const { ids } = req.body;
        try {
            await Material.deleteMany({ _id: { $in: ids } });
            res.status(200).json({ message: 'Materials deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MaterialController();
