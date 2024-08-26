const Home = require('../Models/Home');

class HomeController {
    //[GET]
    async homeGet(req, res) {
        try {
            const dataHome = await Home.find({});
            res.status(200).json(dataHome);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    //[PATCH]
    async homePatch(req, res) {
        const id = '6672c321a2c4cd4662aa9d22';
        const dataBody = req.body;
        try {
            const updatedDataHome = await Home.findByIdAndUpdate(id, dataBody, { new: true });

            if (!updatedDataHome) {
                return res.status(404).json({ message: 'Document not found' });
            }

            res.status(200).json(updatedDataHome);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[POST]
    async homePost(req, res) {
        const dataBody = req.body;
        try {
            const dataHome = new Home(dataBody);
            const savedDataHome = await dataHome.save();
            res.status(200).json(savedDataHome);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    //[PATCH]
    async homePatchFeatProduct(req, res) {
        const homeId = '6672c321a2c4cd4662aa9d22';
        const { id: featProductId } = req.params;
        const updateData = req.body;
        try {
            // Find the Home document by ID
            const homeData = await Home.findById(homeId);

            if (!homeData) {
                return res.status(404).json({ message: 'Home document not found' });
            }

            // Find the index of the featured product to be updated
            const featuredProductIndex = homeData.featured_product.findIndex(
                (product) => product._id.toString() === featProductId,
            );

            if (featuredProductIndex === -1) {
                return res.status(404).json({ message: 'Featured product not found' });
            }

            // Update the featured product at the found index
            homeData.featured_product[featuredProductIndex] = {
                ...homeData.featured_product[featuredProductIndex].toObject(),
                ...updateData,
            };

            // Save the updated Home document
            const updatedHomeDoc = await homeData.save();

            res.status(200).json(updatedHomeDoc);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[PATCH]
    async homePatchFeaturedNews(req, res) {
        const homeId = '6672c321a2c4cd4662aa9d22';
        const { id: newsId } = req.params;
        const updateData = req.body;

        try {
            // Find the Home document by ID
            const homeData = await Home.findById(homeId);

            if (!homeData) {
                return res.status(404).json({ message: 'Home document not found' });
            }

            // Find the index of the featured news to be updated
            const featuredNewsIndex = homeData.featured_news.findIndex((news) => news._id.toString() === newsId);

            if (featuredNewsIndex === -1) {
                return res.status(404).json({ message: 'Featured news not found' });
            }

            // Update the featured news at the found index
            homeData.featured_news[featuredNewsIndex] = {
                ...homeData.featured_news[featuredNewsIndex].toObject(),
                ...updateData,
            };

            // Save the updated Home document
            const updatedHomeDoc = await homeData.save();

            res.status(200).json(updatedHomeDoc);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // [DELETE]
    async homeDeleteFeatProduct(req, res) {
        const homeId = '6672c321a2c4cd4662aa9d22';
        const { id: featProductIds } = req.params;
        const featProductIdList = featProductIds.split('&');
        try {
            const homeData = await Home.findById(homeId);

            if (!homeData) {
                return res.status(404).json({ message: 'Home not found' });
            }
            // Xóa các `featured_product` có ID trong danh sách
            const updatedFeaturedProducts = homeData.featured_product.filter(
                (product) => !featProductIdList.includes(product._id.toString()),
            );

            // Cập nhật tài liệu Home với danh sách `featured_product` mới
            homeData.featured_product = updatedFeaturedProducts;
            await homeData.save();
            res.status(200).json({ message: 'Delete Successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new HomeController();
