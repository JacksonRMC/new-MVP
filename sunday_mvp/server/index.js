var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var rp = require('request-promise');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/search', ( req, res ) => {


  var start = req.body.term;
  var date = start.split('-').map((x) => parseInt(x))
  var begin = date[0] + '-' + (date[1] - 1) + '-' + date[2];
  var end = date[0] + '-' + (date[1] - 1) + '-' + (date[2] + 7);
  


  rp(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${begin}&end_date=${end}&api_key=zAwFoAVebzEBR0k0q2UMX7FMhd9SSEKP2II2Qgqo`)
  .then((data) => {
    var newData = JSON.parse(data)
    var first = Object.keys(newData.near_earth_objects);
    first.forEach((x) => {
      var nearEarth = {
        date: x,       
        neo: newData.near_earth_objects[x][0].neo_reference_id,
        name: newData.near_earth_objects[x][0].name,
        url: newData.near_earth_objects[x][0].nasa_jpl_url,
        magnitude: newData.near_earth_objects[x][0].absolute_magnitude_h,
        hazard: newData.near_earth_objects[x][0].is_potentially_hazardous_asteroid
      };
      
    var newObj = new items.Item(nearEarth);
    newObj.save((err, newObj) => {
      if(err) {
        console.log(err)
      }
    })

    })    

    
  })
  .then(
    res.end('New user updated')
  )
  .catch((err) =>{
    console.log('err', err)
  })
  
});

app.get('/items',((req, res) => {
	console.log(" coming from GET")
  
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
}));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});