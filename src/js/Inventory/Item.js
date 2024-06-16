import { Canvas } from "../Canvas/Canvas.js";
import { Viewport } from "../Canvas/Viewport.js";
import { Sprite } from "../Sprites/Sprite.js";
import { ItemSlot } from "./ItemSlot.js";

export class Item extends Sprite {
    static itemDragging;

    static areTheSameItems(item1, item2) {
        if (item1.name === item2.name) {
            return true;
        }

        return false;
    }

    constructor(name) {
        super({width: 64, height: 64, imageName: name, layer: "screen"});
        this.name = name;
        this.count = 1;

        Canvas.addObject(this)
    }

    mousedown(e) {
        this.drag = true;
        Item.itemDragging = this;
    }

    mousemove(e) {
        const [pointX, pointY] = Viewport.getScreenPoints(e);
        
        if (this.drag) {
            this.x = pointX - (this.width / 2);
            this.y = pointY - (this.height / 2);
        }
    }

    mouseup(e) {
        this.drag = false;

        if (this.slot == ItemSlot.activeSlot) {
            this.slot.positionItem(this);
        }
    }
}