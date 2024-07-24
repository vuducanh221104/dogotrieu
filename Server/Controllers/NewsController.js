const NewsSchema = require('../models/News');

class NewsController {
    // [POST] /news
    async newsPost(req, res) {
        try {
            const newNews = new NewsSchema(req.body);
            await newNews.save();
            res.status(200).json({ message: 'Add Successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // [PATCH] /news/:id
    async newsUpdate(req, res) {
        try {
            const updatedNews = await NewsSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedNews) {
                return res.status(404).json({ message: 'News not found' });
            }
            res.status(200).json({ message: 'Edit Successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // [DELETE] /news/:id
    async newsDelete(req, res) {
        try {
            const deletedNews = await NewsSchema.findByIdAndDelete(req.params.id);
            if (!deletedNews) {
                return res.status(404).json({ message: 'News not found' });
            }
            res.status(200).json({ message: 'News deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[GET]
    async newsGetById(req, res) {
        try {
            const news = await NewsSchema.findById(req.params.id);
            if (!news) {
                return res.status(404).json({ message: 'News not found' });
            }
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[GET]
    async newsGetAll(req, res) {
        try {
            const news = await NewsSchema.find();
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[GET]
    async newsGetAllLimit(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            const totalItems = await NewsSchema.countDocuments();
            const news = await NewsSchema.find().skip(skip).limit(limit);

            const totalPages = Math.ceil(totalItems / limit);

            res.status(200).json({
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
                data: news,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    //[GET]
    async newsFeaturedGet(req, res) {
        const { ids } = req.query;

        if (!ids) {
            return res.status(400).json({ message: 'No IDs provided' });
        }

        const idsArray = Array.isArray(ids) ? ids : ids.split(',');

        try {
            const news = await NewsSchema.find({ _id: { $in: idsArray } });

            const sortedNews = idsArray.map((id) => news.find((item) => item._id.toString() === id));

            res.status(200).json(sortedNews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NewsController();
