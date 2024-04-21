const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

const Accountsheme = new Schema(
    {
        username: { type: String },
        password: { type: String },
    },
    {
        collection: 'accounts',
    },
);

module.exports = mongoose.model('Accountsheme', Accountsheme);
