// The "backend" that runs the server
var express = require('express'),
	app = express();

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);
