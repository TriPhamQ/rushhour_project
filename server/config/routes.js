console.log("Routes...");
var users = require('../controllers/users.js');
var maps = require('../controllers/maps.js');
var items = require('../controllers/items.js');

module.exports = function(app){
    app.get('/', function (req, res) {
		console.log("Hello");
	});
    app.post('/reg', function (req, res) {
        users.register(req, res);
    });
    app.post('/log', function (req, res) {
        users.login(req, res);
    });
    app.post('/validate_address', function(req, res){
    	maps.validateAddress(req, res);
    });
    app.get('/markers', function(req, res){
        maps.getMarkers(req, res);
    app.post('/add', function(req, res) {
        items.addItem(req, res);
    });
    app.get('/getItem', function(req, res) {
        items.getItems(req, res);
    });
};
