import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";

export class PlayerInventoryButton extends Sprite {
    constructor(x, y, player) {
        super({
            width: 64, 
            height: 64, 
            x: x, y: y, z: SpriteZMap['itemslots'], 
            imageName: 'playerinventorybutton', 
            layer: 'screen'
        });

        this.player = player;

        Canvas.addObject(this)
    }

    mouseup() {
        this.player.toggleVisibility();
    }

    keyup(e) {
        if (e.key == "Tab") {
            this.player.toggleVisibility();
        } 
    }
}