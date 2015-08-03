var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.sendfile('./dist/index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
