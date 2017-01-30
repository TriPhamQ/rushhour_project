console.log("Routes...");
var users = require('../controllers/users.js');

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
};
