const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
    {
        value: { type: String, required: true },
        created_at: { type: Date, required: true, default: Date.now },
        expires_at: { type: Date, required: true },
    },
    {
        _id: false,
    },
);

const UserSchema = new Schema(
    {
        user_name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        full_name: { type: String, required: false },
        type: { type: String, required: true, enum: ['WEBSITE', 'GOOGLE'], default: 'WEBSITE' },
        role: { type: Number, required: true, enum: [0, 1, 2], default: 0 }, // Role (0) User , (1) Manager (2) Admin
        gender: { type: String, enum: ['male', 'female', 'other', ''], default: '', required: false },
        phone_number: { type: String, required: false },
        address: {
            street: { type: String, default: '' },
            ward: { type: String, default: '' },
            district: { type: String, default: '' },
            city: { type: String, default: '' },
            country: { type: String, default: '' },
        },
        avatar: { type: String, required: false },
        date_of_birth: { type: String, required: false },
        id_auth_provider: { type: String, required: false },
        is_verified: { type: Boolean, required: false },
        new_email: { type: String, required: false },
        email_verification_token: { type: TokenSchema, required: false },
        forgot_password_token: { type: TokenSchema, required: false },
        status: { type: Number, required: true, enum: [0, 1], default: 0 }, // Trạng thái (1: active, 0: inactive)
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'user',
    },
);

module.exports = mongoose.model('User', UserSchema);
