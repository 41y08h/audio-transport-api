import { Socket } from "socket.io";
import User from "../db/models/User";

export interface Client {
  user: User;
  socket: Socket;
}

export default class ConnectedClients {
  clients: Client[];

  constructor() {
    this.clients = [];
  }

  add(user: User, socket: Socket) {
    const client: Client = { user, socket };
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

  remove(socketId: string) {
    this.clients = this.clients.filter(
      (client) => client.socket.id !== socketId
    );
  }
}
