import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Message} from './models/message.model';
import {User} from "./models/user.model";

const app = express();
const server = new http.Server(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('New client connected...');

  let messages: Message[] = [];
  let users: User[] = [];

  socket.on('join-user', (user) => {
    io.emit('join-user', user);
    users.push(user);
  });

  socket.on('message', ({id , username, text}) => {
    io.emit('message', {
      id: id =  _.uniqueId(),
      username: username,
      text: text,
      timestamp: moment().format('hh:mm:ss a'),
    });
    const message = new Message(id, username, text);
    messages.push(message);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}...`));