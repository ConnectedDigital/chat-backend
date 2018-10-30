import {Link} from './link.model';

export class Message {
  constructor(public id: string, public from: string, public text: string, public at: string, public link?: Link) { }
}