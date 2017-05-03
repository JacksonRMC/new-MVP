var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  date: String,
  neo: String,
  name: String,
  url: String,
  magnitude: Number,
  hazard: String

});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
  .sort({'magnitude' : -1});
};

module.exports.selectAll = selectAll;
module.exports.Item = Item;