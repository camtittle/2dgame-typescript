import {BeanGame} from "../beangame/BeanGame";
import {WebsocketServer} from "./websocket/WebsocketServer";
import {ConnectionResponse} from "../beangame/network/ConnectionResponse";
import {MessageType} from "../beangame/network/MessageType";

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

    this.server.addOnConnectListener(socket => {
      const response: ConnectionResponse = {
        messageType: MessageType.ConnectionResponse,
        clientId: socket.id
      };
      socket.send(JSON.stringify(response));
    });

    this.server.addOnReceiveMessageListener((socket, msg) => {
      console.log(msg);
    });
  }

}
