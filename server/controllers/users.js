console.log('users controller');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function () {
	return {
		register: function (req, res) {
			console.log("In the register");
			console.log(req.body);
			User.findOne({email: req.body.email}, function (err, result) {
				if (err) {
					console.log("Error when checking email in db...");
				}
				else if (result) {
					console.log("Email is already registered...");
					res.json({error: "Email is already registered, try login or type new email"})
				}
				else {
					console.log("No user found. Start creating...");
					req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
					User.create(req.body, function (err, results) {
						if (err) {
							console.log(err);
						}
						else {
							console.log("New user created");
							res.json(results);
						};
					});
				}
			});
		},
		login: function (req, res) {
			console.log("In the login");
			User.findOne({email: req.body.email}, function (err, result) {
				if (err) {
					console.log("Error when checking email in db...");
				}
				else if (!result) {
					console.log("Email is not registered...");
					res.json({error: "Email is not registered, try register"})
				}
				else {
					console.log("User found. Start to check password");
					bcrypt.compare(req.body.password, result.password, function(err, match) {
						console.log("MATCH?", match);
						if (match) {
							console.log("Successfully logged in");
							console.log(result);
							var token = jwt.sign({user: result.name, email: result.email, _id: result._id}, 'super secret');
							// res.json({user: result.name, email: result.email, _id: result._id});
							console.log("TOKEN", token);
							res.json({token: token, user: result.name, email: result.email, _id: result._id});
						}
						else {
							console.log("Wrong password...");
							res.json({error: "Wrong password, try again"});
						}
					});
				};
			});
		},
		getall: function (req, res) {
			console.log("Getting all users");
			User.find({}, function (err, results) {
				if (err) {
					console.log("Error when getting all users in db...");
				}
				else {
					console.log("Got all the users");
					res.json(results);
				}
			})
		}
	}
})();
