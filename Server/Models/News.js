const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String, require: false },
        thumb: { type: String, require: true },
        content: { type: String, require: true },
        tags: { type: Array, require: true },
        author: { type: String, require: true },
        slug_description: { type: String, required: false, unique: false },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'news',
    },
);

module.exports = mongoose.model('News', NewsSchema);
