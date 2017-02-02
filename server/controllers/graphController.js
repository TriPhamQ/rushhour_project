// Require Mongoose
var mongoose = require('mongoose');

// Require the model and save it in a variable
var Item = mongoose.model('Item');
var Data = mongoose.model('gData');

module.exports = (function() {
    return {


        getData:function(req, res){
            // Data.find({}).populate('_product_id').exec(function (err, results) {
            //     console.log("RESSSSSSSSSSSSSSSSS", results);
            // })
            Data.find({_user: req.body.userid}, function(err, allData){
                if (!err){
                    res.json(allData);
                } else {
                    console.log(err);
                    res.json({});
                }
            })
        }


        }

})();
