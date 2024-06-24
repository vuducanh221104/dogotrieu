const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DimensionsSchema = new Schema(
    {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        length: { type: Number, required: true },
        unit: { type: String, required: true }, //cm
    },
    {
        _id: false,
        timestamps: false,
    },
);

const ProductTypeSchema = new Schema(
    {
        sku: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        tags: { type: [String], required: true },
        dimensions: { type: DimensionsSchema, required: true },
        images: { type: [String], required: true },
        created_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now },
    },
    {
        timestamps: false,
        collection: 'product_type',
    },
);

module.exports = mongoose.model('ProductType', ProductTypeSchema);
