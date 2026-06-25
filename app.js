var createError = function (status, message) {
    var err = new Error(message);
    err.status = status;
    return err;
};
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ---- Conexión a MongoDB usando Mongoose ----
// Base local llamada 'red_bicicletas'
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/red_bicicletas');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    db.once('open', function () {
        console.log('Conectado a la base de datos red_bicicletas');
    });
}

var apiBicicletasRouter = require('./routes/api/bicicletas');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Montamos la API de bicicletas
app.use('/api/bicicletas', apiBicicletasRouter);

app.get('/', function (req, res) {
    res.json({ msg: 'Bienvenido a la API de Red de Bicicletas' });
});

// catch 404
app.use(function (req, res, next) {
    next(createError(404, 'No encontrado'));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = app;
