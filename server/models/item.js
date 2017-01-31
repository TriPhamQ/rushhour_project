// Require Mongoose
var mongoose = require('mongoose');


// Create the item schema
var ItemSchema = new mongoose.Schema({
    item: {type: String, required: true},
}, {timestamps: true});

mongoose.model('Item', ItemSchema); // We are setting this Schema in our Models as 'Item'
