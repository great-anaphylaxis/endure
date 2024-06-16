import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";

export class ItemSlot extends Sprite {
    constructor(x) {
        super({width: 80, height: 80, x: x, y: 500, imageName: 'itemslot', layer: "screen"});

        Canvas.addObject(this)
    }
}