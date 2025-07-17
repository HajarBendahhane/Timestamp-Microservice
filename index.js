
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  
app.use(express.static('public'));

// Routes 
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api',function(req,res){
  var now = new Date();
  res.json({"unix":now.getTime(),"utc":now.toUTCString()});
});
app.get('/api/:date',function(req,res){
  var input = req.params.date;
  if(!isNaN(input)){
    var date=new Date(Number(input));
    res.json({"unix":Number(input),"utc":date.toUTCString()});
  }
  else{
    var date=new Date(input);
    if(!isNaN(date.getTime())){
    res.json({"unix":date.getTime(),"utc":date.toUTCString()});}
    else {res.json({error:"Invalid Date"});}
  } 
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// Routes
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});