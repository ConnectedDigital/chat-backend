"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var moment = require("moment");
var app = express();
var server = new http.Server(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;
io.on('connection', function (socket) {
    console.log('New client connected...');
    socket.on('join-user', function (user) { return io.emit('join-user', user); });
    socket.on('message', function (_a) {
        var username = _a.username, text = _a.text;
        return io.emit('message', {
            username: username,
            text: text,
            timestamp: moment().format('hh:mm:ss a')
        });
    });
});
server.listen(port, function () { return console.log("Listening on port " + port + "..."); });
