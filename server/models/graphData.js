console.log('Graph Data Model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gDataSchema = new mongoose.Schema({

	_product_id:{type:Schema.Types.ObjectId, ref: 'Item'},
	count_time:Array

}, {timestamps:true});

mongoose.model('gData', gDataSchema);