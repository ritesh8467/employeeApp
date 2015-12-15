var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dummy_data = require('./dummy_data');
var base_path = path.resolve("./")
var React = require('react');
// var main_component = require( base_path + "/public/react/main")
var app = express();

// view engine setup
app.set('views', path.join(base_path + "/views"));
app.set('view engine', 'jade');

app.use(session({ secret: 'keyboard cat', key: 'sid', resave: false, saveUninitialized: false}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(base_path + '/public'));

//Home Page Route
app.get('/', function(req, res){
	return res.render('app', {
		title: 'Employee App',
		page_data: "var employee_data = " + JSON.stringify(dummy_data)
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
