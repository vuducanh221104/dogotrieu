const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema(
    {
        images_banner: [
            {
                url: { type: String, required: true },
                link: { type: String, required: true },
            },
        ],
        images_banner_under_640: [
            {
                url: { type: String, required: true },
                link: { type: String, required: true },
            },
        ],
        images_customer_banner: {
            type: String,
            required: true,
        },
        images_customer: [
            {
                type: String,
                required: true,
            },
        ],
        featured_product: [
            {
                title: { type: String, required: true },
                query: { type: String, required: true },
                link_view_all: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
        collection: 'home',
    },
);

module.exports = mongoose.model('Home', HomeSchema);
