// passing our module the express module

module.exports = function(app) {
	var twitterService = require('./twitterService.js')(app);
};