import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";

export class PlayerUtility extends Sprite {
    constructor() {
        super({
            x: 731, y: 25, z: SpriteZMap['itemslots'], 
            width: 547, height: 548, 
            layer: 'screen',
            imageName: 'playerutility'
        });

        Canvas.addObject(this);
    }

    toggleVisibility() {
        this.visible = !this.visible;
    }
}