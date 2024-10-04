const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema(
    {
        name: { type: String, required: true },
        parent_id: { type: Schema.Types.ObjectId, ref: 'Material' },
        slug: { type: String, required: true, unique: true },
    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'material',
    },
);

module.exports = mongoose.model('Material', MaterialSchema);
