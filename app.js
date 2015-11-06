
/**
 * Module dependencies.
 */

var express = require('express'),
    models = require('./models/models'),
    Postcode = models.Postcode;

var app = express.createServer();

// Configuration

app.configure(function(){
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.set('view options', { pretty: true });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express['static'](__dirname + '/public'));
  //app.use(express.favicon(__dirname+'/public/images/favicon.ico'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/postcode-to-geo/:postcode', function(req, res){

  var postcode = req.param('postcode').toUpperCase();

  Postcode.findOne({'postcode':postcode}, function(err, result){

    if (err){

      res.json(500, {'error':err});

    } else if (!result){

      res.send(404);

    } else {

      try {

        res.json({'postcode': result.postcode, 'geo': result.geo});

      } catch (e) {

        res.json(500, {'error':e});

      }

    }

  });

});

app.get('/geo-to-postcode/:lat,:lng', function(req, res){

});

var port = process.env.PORT || 3050;

app.listen(port, function(){
  console.log("Express server listening");
});
