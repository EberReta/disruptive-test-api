const express = require("express");
const morgan = require('morgan');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();

/* Settings */
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routes */
app.use('/',require('./routes/binance'));


app.listen(app.get('port'), () => { console.log(`El servidor está inicializado en el puerto ${app.get('port')}`); });
