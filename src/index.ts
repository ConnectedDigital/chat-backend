import express, {Request, Response} from 'express';
import socketIO, {Socket} from 'socket.io';
import {Server} from 'http';
import * as _ from 'lodash';
import * as validUrl from 'valid-url';

import {User} from './models/user.model';
import {Message} from './models/message.model';
import {parse} from './link-parser/link-parser';

const app: express.Application = express();
const server: Server = new Server(app);
const io: socketIO.Server = socketIO(server);

const port = process.env.PORT || 3000;

let users: User[] = [];
let messages: Message[] = [];

app.get('/refresh/users', (req: Request, res: Response) => {
  res.send(users);
});

app.get('/refresh/messages', (req: Request, res: Response) => {
  res.send(messages);
});

io.on('connect', (socket: Socket) => {
    console.log('New client connected...');

    socket.on('user', (user: User) => {
        user.id = socket.id;
        io.emit('user', user);
        console.log('New user joined: ', user);

        users.push(user);
        console.log('Users: ', users);
    });

    socket.on('message', async (message: Message) => {
        message.id = _.uniqueId();

        if (validUrl.isUri(message.text)) {
            message.link = await parse(message.text);
        }
        message.at = new Date().toLocaleTimeString();

        io.emit('message', message);
        console.log('New message received: ', message);

        messages.push(message);
        console.log('Messages: ', messages);
    });

    socket.on('disconnect', () => console.log('Client disconnected...'));
});

server.listen(port, () => console.log(`Listening on port ${port}...`));