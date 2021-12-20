const { model, Schema } = require('mongoose');
const User = require('./userModel');

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    review: String,
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    }
});

module.exports = model('Review', reviewSchema);