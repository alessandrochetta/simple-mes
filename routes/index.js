var MongoClient = require('mongodb').MongoClient
var Server = require('mongodb').Server;
var mongoConfiguration = {
  dbConnection:"mongodb://@localhost:",
  dbPort:"27017",
  dbName:"/simple-mes"
}

var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SimpleMES Server' });
});

/* Collection getters ------------------------------------------------------*/
router.get('/api/getAllMaterials', function(req, res, next) {
  var collection = app.locals.db.collection('Materials');
  collection.find().toArray(function(err, items) {
    res.send(items);
  });
});

router.get('/api/getAllMachines', function(req, res, next) {
  var collection = app.locals.db.collection('Machines');
  collection.find().toArray(function(err, items) {
    res.send(items);
  });
});

router.get('/api/getAllRoutings', function(req, res, next) {
  var collection = app.locals.db.collection('Routings');
  collection.find().toArray(function(err, items) {
    res.send(items);
  });
});

router.get('/api/getAllOrders', function(req, res, next) {
  var collection = app.locals.db.collection('Orders');
  collection.find().toArray(function(err, items) {
    res.send(items);
  });
});

/* Collection insert ------------------------------------------------------*/
router.post('/api/insertMaterial', function(req, res, next) {
  var objectRecieved = req.body;
  if(objectRecieved == undefined) return;

  var collection = app.locals.db.collection('Materials');

  if(objectRecieved._id == "-1")
  {
    objectRecieved._id = null;
    collection.insert(objectRecieved);
  }else{
    // edit
  }
  res.send("Operation completed");
});

MongoClient.connect(mongoConfiguration.dbConnection + mongoConfiguration.dbPort + mongoConfiguration.dbName, { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
  console.log("mongo connected");
  app.locals.db = db;
});

module.exports = router;
