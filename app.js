
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , http = require('http')
  , path = require('path');

var app = express();
 
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('htm', require('ejs').renderFile);
  /*
  app.set('views', __dirname + '/views');
  app.set('view engine', 'htm');
  */
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/getUrl', routes.getUrl);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
