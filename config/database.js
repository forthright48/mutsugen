const mongoose = require('mongoose');
const dburl = require('config').dburl;

mongoose.Promise = global.Promise;
const promise = mongoose.connect(dburl, {
  useMongoClient: true,
});

promise.then(function(db) {
  console.log('Successfully connected to database');
}).catch(function(err) {
  console.log(err);
});
