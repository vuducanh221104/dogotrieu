const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DimensionsSchema = new Schema(
    {
        width: { type: Number, default: null },
        height: { type: Number, default: null },
        length: { type: Number, default: null },
        unit: { type: String }, // cm
    },
    {
        _id: false,
        timestamps: false,
    },
);

const ProductTypeSchema = new Schema(
    {
        sku: { type: String, required: true, unique: true },
        description: { type: String },
        tags: { type: [String], required: true },
        dimensions: { type: DimensionsSchema },
        images: { type: [String] },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'product_type',
    },
);

module.exports = mongoose.model('ProductType', ProductTypeSchema);
