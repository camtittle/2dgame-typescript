import {BeanGame} from "../beangame/BeanGame";
import {WebsocketServer} from "./websocket/WebsocketServer";
import {ServerMessageHandler} from "./MessageHandler";

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
    const messageHandler = new ServerMessageHandler(this.entityManager, this.entitySpawner, this.server);

    this.server.addOnConnectListener(socket => {
      messageHandler.handlePlayerConnect(socket.id);
    });

    this.server.addOnReceiveMessageListener((socket, msg) => {
      messageHandler.handleMessage(socket.id, msg);
    });
  }

}
