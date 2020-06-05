import {BeanGame} from "../beangame/BeanGame";
import {WebsocketServer} from "./websocket/WebsocketServer";
import {ServerMessageHandler} from "./messages/MessageHandler";
import {MessageSender} from "./messages/MessageSender";

export class BeanGameServer extends BeanGame {

  private server: WebsocketServer;

  constructor() {
    super(true);
  }

  async initialise(): Promise<void> {
    await super.initialise();
    this.initNetwork();
  }

  private initNetwork() {
    this.server = new WebsocketServer();
    const messageSender = new MessageSender(this.server);
    const messageHandler = new ServerMessageHandler(this.entityManager, this.entitySpawner, messageSender);

    this.server.addOnConnectListener((socket, request) => {
      const parts = request.url.split('?username=');
      if (parts.length < 2) {
        console.warn('No username found for user ID ' + socket.id);
        return;
      }
      const username = decodeURIComponent(parts[1]);
      console.log(username);
      messageHandler.handlePlayerConnect(socket.id, username);
    });

    this.server.addOnDisconnectListener(socket => {
      messageHandler.handlePlayerDisconnect(socket.id);
    });

    this.server.addOnReceiveMessageListener((socket, msg) => {
      messageHandler.handleMessage(socket.id, msg);
    });
  }

}
