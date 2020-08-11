const http = require('http');
const app = require('./index');
const mongoose = require('./database');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);