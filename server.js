// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Photo     = require('./app/models/photo');


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/gallery'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));





// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api change!' });   
});

// more routes for our API will happen here


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);





router.route('/photos')

    /*// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        console.log('hitting this post function', req);
        
        var photo = new Photo(req.body);      // create a new instance of the Bear model

        // save the bear and check for errors
        photo.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Photo created!' });
        });
        
    })*/


    .get(function(req, res) {
        Photo.find(function(err, photos) {
            if (err)
                res.send(err);

            res.json(photos);
        });
    });


/*router.route('/photos/:photo_id')

	.delete(function(req, res) {

        Photo.remove({
            _id: req.params.photo_id
        }, function(err, bear) {

            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });*/










// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);