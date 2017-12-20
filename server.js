
// apply global configure first
require('./lib/globalConfigure')();

var express = require('express');
var config = require('config');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var http = require('http');
var utility = require('./lib/utility');
var path = require('path');
var jsonParser = require('./lib/jsonBodyParser');
var urlEncodedBodyParser = require('./lib/urlEncodedBodyParser');
var cors = require('cors');
var request = require('request');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "../../docs/html"));
// development features
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {

    // serve docs
    app.use('/docs', express.static('./docs/html'), function () { });

    // send loader io token
    app.use(express.static(path.join(__dirname, 'loaderio')));
}

// allow cross origin
app.use(cors());

// api key check middleware
//app.use(/^(?!\/docs|\/loaderio-.*|\/favicon.ico)/g, require('./lib/apiKeyCheck').middleware);

// parse json body
app.use(jsonParser({ limit: '50mb' }));

// parse urlEncoded data
app.use(urlEncodedBodyParser({ limit: '50mb', extended: true }));


// mount roots
utility.walkModulesSync(path.join(__dirname, 'routes'), require('./lib/Route'), function (route) {
    route.mount(app);
});

// handle errors
app.use(require('./lib/errorHandler'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// create server
var server = http.createServer(app);

// boot server
var connectAsync = Promise.promisify(mongoose.connect, { context: mongoose });
var listenAsync = Promise.promisify(server.listen, { context: server });
listenAsync(process.env.PORT || config.get('serverPort'), function () { });
//connectAsync(process.env.MONGODB_URI, { useMongoClient: true });
connectAsync(config.get('mongoUrl'), { useMongoClient: true });
var listenAsync = Promise.promisify(server.listen, { context: server });
listenAsync(process.env.PORT || config.get('serverPort'), function () { });
console.log("service is running......");


