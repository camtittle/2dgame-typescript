import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Coin, CoinSource} from "../entity/Coin";
import {EntityManager} from "../../engine/entity/EntityManager";

export class CoinFactory {

  public constructor(private readonly entityManager: EntityManager,
                     private readonly imageProvider: ImageProvider) {
  }

  create(x: number, y: number, coinSource: CoinSource, followsCursor: boolean): Coin {
    const coin = new Coin(this.entityManager, coinSource, followsCursor);
    coin.setupImages(this.imageProvider);
    return coin;
  }
}
