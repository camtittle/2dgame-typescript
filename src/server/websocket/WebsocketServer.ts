import * as ws from 'ws';
import { v4 as uuidv4 } from 'uuid';

export class WebsocketServer {

  private server: ws.Server;
  private port = 8080;

  private onConnectionListeners: ConnectEventListener[] = [];
  private onReceiveMessageListeners: ReceiveMessageEventListener[] = [];


  constructor() {
    this.server = new ws.Server({port: this.port});
    console.log('Websocket started on port 8080');

    this.server.on('connection', (socket, request) => {
      socket.id = uuidv4();
      console.log('Connection received with ID: ' + socket.id);
      this.onConnectionListeners.forEach(listener => listener(socket));

      socket.on('message', (msg) => {
        console.log(`Received message from user ${socket.id}. Message contents: ${msg} `);
        this.onReceiveMessageListeners.forEach(listener => listener(socket, JSON.parse(msg as string)))
      });
    });
  }

  addOnConnectListener(listener: ConnectEventListener) {
    this.onConnectionListeners.push(listener);
  }

  addOnReceiveMessageListener(listener: ReceiveMessageEventListener) {
    this.onReceiveMessageListeners.push(listener);
  }

  sendToClient(clientId: string, msg: any) {
    this.server.clients.forEach((client: ws.Client) => {
      if (client.id === clientId) {
        client.send(msg);
      }
    });
  }

  sendToAll(message: string, exclude: ws.Client) {
    this.server.clients.forEach((client: ws.Client) => {
      if (client != exclude && client.readyState === ws.OPEN) {
        console.log('sending message to id: ' + (<any>client).clientId);
        client.send(message);
      }
    });
  }

}

type ConnectEventListener = (socket: ws.Client) => void;
type ReceiveMessageEventListener = (socket: ws.Client, msg: any) => void;