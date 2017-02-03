// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Item = mongoose.model('Item');
var Data = mongoose.model('gData');
var User = mongoose.model('User');

module.exports = (function() {
    return {
        addItem: function(req, res) {
            console.log("========== adding a new item ==========");
            console.log(req.body);
            console.log("========== adding a new item ==========");

            var item = new Item(req.body);
            item.busy = false;
            item.save(function(err){
            if(err){
                console.log("========== error adding a new item ==========");
                console.log(err);
                console.log("========== error adding a new item ==========");
            } else {
                var graphPoint = new Data({_product_id:item._id, count_time:[], _user: req.body._user});
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
            Item.find({_user: req.body.userid}, function(err, result) {
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
                                if (!err){
                                    if (graphPoint){
                                        graphPoint.count_time.push(result.updatedAt);
                                        graphPoint.markModified('count_time');
                                        graphPoint.save(function(){
                                            console.log('data added');


                                        });
                                        res.json({});
                                    } else {console.log('no graphpoint found..')}
                                } else {console.log(err)}
                            })

                    });
                    console.log("========== successfully increase count ==========");
                    console.log(result);
                    console.log("========== successfully increase count ==========");


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
                    Data.remove({_product_id: req.body.id}, function (err) {
                        if (!err) {
                            Item.find({_user: req.body.userid}, function(err, result) {
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
                    })
                }
            });
        },
        showBusy:function(req, res){
            console.log(req.body, 'busy item');
            User.findOne({name:req.body.userid}, function(err, theUser){
                if (!err){
                    theUser.busy = true;
                    theUser.save();
                    console.log(theUser);
                    res.json({});
                }
            })
        },
        notBusy:function(req, res){
            console.log(req.body, 'busy item');
            User.findOne({name:req.body.userid}, function(err, theUser){
                if (!err){
                    theUser.busy = false;
                    theUser.save();
                    console.log(theUser);
                    res.json({});
                }
            })
        },
        getBusy:function(req, res){
            User.find({busy:true}, function(err, theUsers){
                console.log(theUsers, '*************************');
                res.json(theUsers);
            })
        }
    }

})();
