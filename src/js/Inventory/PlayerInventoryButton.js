import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";

export class PlayerInventoryButton extends Sprite {
    constructor(x, y, playerInventory) {
        super({
            width: 80, 
            height: 80, 
            x: x, y: y, z: SpriteZMap['itemslots'], 
            imageName: 'playerinventorybutton', 
            layer: 'screen'
        });

        this.playerInventory = playerInventory

        Canvas.addObject(this)
    }

    mouseup() {
        this.playerInventory.toggleVisibility();
    }

    keyup(e) {
        if (e.key == "Tab") {
            this.playerInventory.toggleVisibility();
        } 
    }
}