require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
// Add the method-override middleware to your router



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const createRouter = require('./routes/create');
const cerealRouter = require('./routes/cereal');

const dairyRouter = require('./routes/dairy');
const bakeryRouter = require('./routes/bakery');
const produceRouter = require('./routes/produce');
const fruitsRouter = require('./routes/fruits');


const app = express();

app.use(methodOverride('_method'));

//setting up database
const dbURI =process.env.DB_CONNECT


mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB is:', err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/users', usersRouter);

app.use('/cereal', cerealRouter);
app.use('/delete', cerealRouter);
app.use('/update', cerealRouter);

app.use('/dairy', dairyRouter);
app.use('/fruits', fruitsRouter);
app.use('/bakery', bakeryRouter);
app.use('/produce', produceRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
