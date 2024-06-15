import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";

export class DirtBlock extends Sprite {
    constructor(x, y) {
        super({width: 64, height: 64, x: x, y: y, imageName: "dirtblock"});

        Canvas.addObject(this)
    }
}