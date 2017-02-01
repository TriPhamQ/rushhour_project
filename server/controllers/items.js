// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Item = mongoose.model('Item');

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
                    result.save();
                    console.log("========== successfully increase count ==========");
                    console.log(result);
                    console.log("========== successfully increasee count ==========");
                    res.json(result);
                }
            })
        }
    }

})();
