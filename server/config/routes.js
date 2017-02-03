console.log("Routes...");
var users = require('../controllers/users.js');
var maps = require('../controllers/maps.js');
var items = require('../controllers/items.js');
var graph = require('../controllers/graphController');

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
    });
    app.post('/add', function(req, res) {
        items.addItem(req, res);
    });
    app.post('/getItem', function(req, res) {
        items.getItems(req, res);
    });
    app.post('/increase', function(req, res) {
        items.increaseCount(req, res);
    });
    app.post('/items/delete', function(req, res) {
        items.deleteItem(req, res);
    });
    app.post('/get_data', function(req, res){
        graph.getData(req, res);
    });
    app.post('/show_busy', function(req, res) {
        items.showBusy(req, res);
    });
    app.post('/not_busy', function(req, res){
        items.notBusy(req, res);
    });
    app.get('/get_busy', function(req, res){
        items.getBusy(req, res);
    });
};
