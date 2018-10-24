import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as moment from 'moment';

const app = express();
const server = new http.Server(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New client connected...');

    socket.on('join-user', (user) => io.emit('join-user', user));
    socket.on('message', ({username, text}) => io.emit('message', {
        username: username,
        text: text,
        timestamp: moment().format('hh:mm:ss a')
    }));
});

server.listen(port, () => console.log(`Listening on port ${port}...`));