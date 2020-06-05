import {BeanGame} from "./BeanGame";
import {ClientNetworkManager} from "../engine/network/ClientNetworkManager";
import {config} from "./config";
import {MessageHandler} from "./network/MessageHandler";
import {Message} from "./network/Message";

export class BeanGameClient extends BeanGame {

  username: string;

  constructor(canvasElementId: string, username: string) {
    super(false, canvasElementId);
    this.username = username;
  }

  async initialise(): Promise<void> {
    await super.initialise();
    this.initNetwork();
  }

  private initNetwork() {
    if (!this.username) {
      throw new Error('Cannot initialise connection. No username provided');
    }

    const url = config.websocketUrl + '?username=' + this.username;
    const networkManager = new ClientNetworkManager(url);
    const messageHandler = new MessageHandler(this.entitySpawner, this.entityManager, networkManager);

    networkManager.onReceiveListener = msg => {
      messageHandler.handleMessage(msg as Message);
    };

    networkManager.connect();
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void {
    ctx.font = '60px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText("Loading...", this.canvasManager.getWidth() / 2, this.canvasManager.getHeight() / 2);
  }


}
