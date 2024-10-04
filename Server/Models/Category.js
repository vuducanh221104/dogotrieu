const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: { type: String, required: true },
        parent_id: { type: Schema.Types.ObjectId, ref: 'Category' },
        slug: { type: String, required: true, unique: true },
    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'category',
    },
);

module.exports = mongoose.model('Category', CategorySchema);
