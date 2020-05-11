import {SpriteDrawable} from "../graphics/SpriteDrawable";

export type MouseBehaviour = (this: SpriteDrawable, x: number, y: number) => void;
