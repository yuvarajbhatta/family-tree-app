
const cors = require('cors');

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var familyRouter = require('./routes/family');
var app = express();
var relationshipRouter = require('./routes/relationship');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', authRouter);
app.use('/api', familyRouter);
app.use('/api', relationshipRouter);

module.exports = app;
