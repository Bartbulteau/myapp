// importing modules

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var fs = require('fs');
var cors = require('cors');

var config = require('./config/config');


// creating express app
var app = express();


// adding middlewares
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

// Fake DB
var JsonDB = require('node-json-db');
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
var db = new JsonDB("usersDB", true, true);

// Handles the routes
app.get('/api/users', (req, res) => {
	var response = db.getData("/users");
	console.log(response)
	res.json(response);
});

app.post('/api/users', (req, res) => {
	try {
		db.push("/users[]", req.body)
		console.log(db.getData('/users'))
	} catch(err) {
		res.send(err)
	}
	res.send('user registered')
});

app.get('/api/users/:id', (req, res) => {
	try {
		var response = db.getData('/users[' + req.params.id + ']')
	} catch (err) {
		res.send(err)
	}
	res.send(response)
});

app.post('/api/users/:id', (req, res) => {
	try {
		db.push('/users[' + req.params.id + ']', req.body)
	} catch (err) {
		res.send(err)
	}
	res.send('user modified')
});

app.delete('/api/users/:id', (req, res) => {
	try {
		db.delete('/users[' + req.params.id + ']')
	} catch (err) {
		res.send(err)
	}
	res.send('user deleted')
});


// starts the server
app.listen(config.port, () => {
	console.log('Server started on port ' + config.port + ' (http://localhost:' + config.port + ')\n\nTo stop it, press ^C\n\n');
});