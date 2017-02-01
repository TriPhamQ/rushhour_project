// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Item = mongoose.model('Item');
var Data = mongoose.model('gData');

module.exports = (function() {
    return {
        addItem: function(req, res) {
            console.log("========== adding a new item ==========");
            console.log(req.body);
            console.log("========== adding a new item ==========");

            var item = new Item(req.body);
            item.save(function(err){
            if(err){
                console.log("========== error adding a new item ==========");
                console.log(err);
                console.log("========== error adding a new item ==========");
            } else {
                var graphPoint = new Data({_product_id:item._id, count_time:[]});
                graphPoint.save(function(err){
                    if (!err){
                        console.log('graphPoint saved');
                    }
                })
                console.log("========== successfully added a new item ==========");
                console.log(item);
                console.log("========== successfully added a new item ==========");
                res.json(item);
                }
            });
        },
        getItems: function(req, res) {
            console.log("========== getting items ==============")
            Item.find({}, function(err, result) {
                if(err) {
                    console.log("========== error finding item ==========");
                    console.log(err);
                    console.log("========== error finding item ==========");
                } else {
                    console.log("========== successfully found all items ==========");
                    console.log(result);
                    console.log("========== successfully found all items ==========");
                    res.json(result);
                }
            })
        },
        increaseCount: function(req, res) {
            console.log("========== getting count ==========");
            console.log(req.body.id);
            console.log("========== getting count ==========");

            Item.findOne({_id: req.body.id}, function(err, result) {
                if(err){
                    console.log("========== error increasing count ==========");
                    console.log(err);
                    console.log("========== error increaseing count ==========");
                } else {
                    result.count ++;
                    result.save(function(){
                            Data.findOne({_product_id:result._id}, function(err, graphPoint){
                                graphPoint.count_time.push(result.updatedAt);
                                graphPoint.markModified('count_time');
                                graphPoint.save(function(){
                                    console.log('data added');
                                });

                            })
                    });
                    console.log("========== successfully increase count ==========");
                    console.log(result);
                    console.log("========== successfully increase count ==========");
                    res.json(result);
                }
            })
        },
        deleteItem: function(req, res) {
            console.log("========== getting item ==========");
            console.log(req.body);
            console.log("========== getting item ==========");

            Item.remove({_id: req.body.id}, function(err) {
                if(err) {
                    console.log("========== error in deleting item ==========");
                    console.log(err);
                    console.log("========== error in deleting item ==========");
                } else {
                    Item.find({}, function(err, result) {
                        if(err) {
                            console.log("========== error finding item ==========");
                            console.log(err);
                            console.log("========== error finding item ==========");
                        } else {
                            console.log("========== successfully found all items ==========");
                            console.log(result);
                            console.log("========== successfully found all items ==========");
                            res.json(result);
                        }
                    });
                    console.log("========== successfully delete item ==========");
                }
            });
        }
    }

})();
