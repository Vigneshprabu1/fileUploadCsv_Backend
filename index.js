const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
var fileupload = require("express-fileupload");
// Routing Path

const users = require('./api/router/UserTable');
const logger = require("./api/lib/logger");


const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'dist/trc-cli')))
app.use(bodyparser.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(bodyparser.json());

// Url Routing
app.use('/api/users',users);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/public', express.static(path.join(__dirname, 'public')));

app.use(fileupload());
app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'dist/trc-cli/index.html'))
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Orgin", "http://localhost:4200");
    res.header("Access-Control-Allow-Header", "Orgin,X-Request-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    //  logger.info('error',error.message);
    if (error.name === 'ValidationError') {
        logger.error(error.name);
        res.status(error.status || 500).json({
            error: {
                message: error.message
            }
        });
    } else {
        logger.error(error.message);
        res.status(error.status || 500).json({
            error: {
                message: error
            }
        });
    }
});

module.exports = app;