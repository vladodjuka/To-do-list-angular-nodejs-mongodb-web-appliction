var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

var mongoose = require("mongoose");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

Task = require("./model/task");

mongoose.connect("mongodb://localhost/todo");

var database = mongoose.connection;

app.use(express.static(__dirname + '/'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get("/get_tasks", function(req, res){
	Task.getTasks(function(err, tasks){
		if(err){
			throw err;
		}
		res.json(tasks);
	})
});

app.post("/post_tasks", function(req, res) {
	var data = req.body;
	database.collection("tasks").remove({});
	database.collection('tasks').insert(data);
	res.send("Done");
});



app.listen(4000);
console.log("Radi - 4000");