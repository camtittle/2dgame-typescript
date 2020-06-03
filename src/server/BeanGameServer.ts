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

    this.server.addOnConnectListener(socket => {
      messageHandler.handlePlayerConnect(socket.id);
    });

    this.server.addOnDisconnectListener(socket => {
      messageHandler.handlePlayerDisconnect(socket.id);
    });

    this.server.addOnReceiveMessageListener((socket, msg) => {
      messageHandler.handleMessage(socket.id, msg);
    });
  }

}
