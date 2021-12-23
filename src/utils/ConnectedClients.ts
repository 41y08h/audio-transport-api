import { Socket } from "socket.io";
import User from "../db/models/User";

export class Client {
  user: User;
  socket: Socket;
  inCallWith: Client | null;

  constructor(user: User, socket: Socket) {
    this.user = user;
    this.socket = socket;
    this.inCallWith = null;
  }
}

export default class ConnectedClients {
  clients: Client[];

  constructor() {
    this.clients = [];
  }

  add(user: User, socket: Socket) {
    const client = new Client(user, socket);
    this.clients.push(client);
    return client;
  }

  getBySocketId(socketId: string) {
    const client = this.clients.find((client) => client.socket.id === socketId);
    return client;
  }

  getByUsername(username: string) {
    return this.clients.find((client) => client.user.username == username);
  }

  addCall(caller: Client, callee: Client) {
    caller.inCallWith = callee;
    callee.inCallWith = caller;
  }

  remove(socketId: string) {
    this.clients = this.clients.filter(
      (client) => client.socket.id !== socketId
    );
  }
}
