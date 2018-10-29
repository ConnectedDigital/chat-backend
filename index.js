"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var moment = require("moment");
var _ = require("lodash");
var message_model_1 = require("./models/message.model");
var app = express();
var server = new http.Server(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;
io.on('connection', function (socket) {
    console.log('New client connected...');
    var messages = [];
    var users = [];
    socket.on('join-user', function (user) {
        io.emit('join-user', user);
        users.push(user);
        console.log(users);
    });
    socket.on('message', function (_a) {
        var id = _a.id, username = _a.username, text = _a.text;
        io.emit('message', {
            id: id = _.uniqueId(),
            username: username,
            text: text,
            timestamp: moment().format('hh:mm:ss a')
        });
        var message = new message_model_1.Message(id, username, text);
        messages.push(message);
        console.log(messages);
    });
});
server.listen(port, function () { return console.log("Listening on port " + port + "..."); });
