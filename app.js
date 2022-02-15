var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
/** importa modulo method override */
const methodOverride = require('method-override');
/** importar middleware */
const middlewareLog = require('./middlewares/log');

const passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** ativa o method override em toda aplicação */
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/** permitindo que a pasta /uploads seja acessada a partir do front-end */
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
/** middlewares globais */
app.use(middlewareLog);
app.use(session({
    secret: 'petshop-express',
    resave: true,
    saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/', authenticationMiddleware, usersRouter);
app.use('/admin', authenticationMiddleware, adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

//auth
require('./middlewares/auth')(passport);
app.use(session({
    secret: '123', //configure um segredo seu aqui,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } //30min
}))
app.use(passport.initialize());
app.use(passport.session());


function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
}

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
}

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;