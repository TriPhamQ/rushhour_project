var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var path = require("path");
var port = 9000;

var app = express ();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/static")));
app.use(express.static(path.join(__dirname, "./bower_components")));
app.use(express.static(path.join(__dirname, "./server/config")));

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

var server = app.listen(port, function () {
	console.log("Listening on port", port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log('sockets on');

	socket.on('count', function(data){
		console.log('COUNTING');
		io.emit('COUNT_INCREASED', {package:data.item});
	});

	socket.on('up', function(data){
		console.log('up from: ', data.local);
		io.emit('mapUp', {data:data.local})
	})

	socket.on('down', function(data){
		console.log("####################\n", data);
	})
});
