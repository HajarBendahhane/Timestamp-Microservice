
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  
app.use(express.static('public'));

// Additional Function

const isInvalid=(date)=> date.toUTCString() === "Invalid Date";

// Routes 
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api',function(req,res){
  var now = new Date();
  res.json({"unix":now.getTime(),"utc":now.toUTCString()});
});
app.get('/api/:date',function(req,res){
  var date = new Date(req.params.date);
  if(isInvalid(date)){
    date = new Date(+req.params.date);
  }
  if(isInvalid(date)){
    res.json({error:"Invalid Date"});
  }
  res.json({"unix":date.getTime(),"utc":date.toUTCString()});
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// End Routes
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});