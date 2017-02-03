// Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the item schema
var ItemSchema = new mongoose.Schema({
    item: {type: String, required: true},
    image: {type: String},
    count: {type: Number},
    busy:Boolean,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

mongoose.model('Item', ItemSchema); // We are setting this Schema in our Models as 'Item'
