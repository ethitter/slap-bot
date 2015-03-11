var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var request = require('request');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/', function(req, response) {
	console.log( req.body );
	request.post({
	    url: 'https://hooks.slack.com/services/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',
		body: '{"text":"test slap.", "channel":"' + req.body.channel_id + '"}',
	},
	function (error, postResponse, body) {
		console.log( body )
	});

	response.send( 'slap ' + req.body.text );

//  response.send( request.body );
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
