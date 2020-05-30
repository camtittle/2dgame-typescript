import {BeanGame} from "./BeanGame";
import {ClientNetworkManager} from "../engine/network/ClientNetworkManager";
import {config} from "./config";
import {HamsterSpawner} from "./factory/HamsterSpawner";
import {Orientation} from "../engine/entity/Orientation";
import {MessageHandler} from "./network/MessageHandler";

export class BeanGameClient extends BeanGame {

  constructor(canvasElementId: string) {
    super(false, canvasElementId);
  }

  async initialise(): Promise<void> {
    await super.initialise();
    console.log('BeanGameClient init');
    this.initNetwork();
  }

  private initNetwork() {
    const networkManager = new ClientNetworkManager(config.websocketUrl);
    const messageHandler = new MessageHandler(this.entitySpawner, networkManager);

    networkManager.onReceiveListener = msg => {
      messageHandler.handleMessage(JSON.parse(msg));
    };

    networkManager.connect(() => {
      // networkManager.send({action: ''});
    });
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void {
    ctx.font = '60px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText("Loading...", this.canvasManager.getWidth() / 2, this.canvasManager.getHeight() / 2);
  }


}
