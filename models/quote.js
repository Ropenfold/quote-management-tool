const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: [true, "quote is required"]
    },
    author: {
        type: String,
        required: [true, "author is required"]
    }
});

module.exports = mongoose.model('Quote', quoteSchema); 