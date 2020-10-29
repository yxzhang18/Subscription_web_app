var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyPasser = require('body-parser');

app.set('view engine','ejs');
app.use(bodyPasser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'join_us',   // the name of your db
  password : '<Your password here>'
});

// the home page
app.get("/", function(req, res){
 var q = 'SELECT COUNT(*) as count FROM users';
 connection.query(q, function (error, results) {
 if (error) throw error;
 var count = results[0].count;
 res.render('home', {data: count});
 });
});

// adding a /joke route
app.get("/joke", function(req, res){
  var joke = "joke joke ......";
 res.send(joke);
});

// adding a /random_num route
app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.post('/register', function(req,res){
 var person = {email: req.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 console.log(err);
 console.log(result);
 res.redirect("/");
 });
});


app.listen(8888, function () {
 console.log('App listening on port ' + '8888');
});
