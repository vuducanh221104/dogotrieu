const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String, require: true },
        thumb: { type: String, require: true },
        content: { type: String, require: true },
        tags: { type: Array, require: true },
        author: { type: String, require: true },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
    {
        timestamps: false,
        collection: 'news',
    },
);

module.exports = mongoose.model('News', NewsSchema);
