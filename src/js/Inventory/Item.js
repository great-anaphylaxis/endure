import { Canvas } from "../Canvas/Canvas.js";
import { Viewport } from "../Canvas/Viewport.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";
import { Text } from "../Sprites/Text.js";
import { ItemSlot } from "./ItemSlot.js";

export class Item extends Sprite {
    static itemDragging;

    static areTheSameItems(item1, item2) {
        if (item1.name === item2.name) {
            return true;
        }

        return false;
    }

    constructor(name, count=1) {
        super({width: 64, height: 64, z: SpriteZMap['items'], imageName: name, layer: "screen"});
        this.name = name;
        this.count = 1;
        this.counter = new Text({text: this.count, z: SpriteZMap['itemtext'], color: 'yellow'})

        this.setCount(count);

        Canvas.addObject(this)
    }

    setCount(count) {
        this.count = count;
        this.counter.text = this.count;
        this.counter.draw();
    }

    mousedown(e) {
        this.drag = true;
        this.z = SpriteZMap['elevateditems'];
        this.counter.z = SpriteZMap['elevateditemtext'];
        Item.itemDragging = this;
    }

    mousemove(e) {
        const [pointX, pointY] = Viewport.getScreenPoints(e);
        
        if (this.drag) {
            this.x = pointX - (this.width / 2);
            this.y = pointY - (this.height / 2);

            this.counter.x = this.x + (this.width - (this.width / 2));
            this.counter.y = this.y + this.height;
        }
    }

    mouseup(e) {
        this.drag = false;
        this.z = SpriteZMap['items'];
        this.counter.z = SpriteZMap['itemtext'];

        if (this.slot == ItemSlot.activeSlot) {
            this.slot.positionItem(this);
        }
    }
}