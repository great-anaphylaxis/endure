import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpritePathMap } from "../Sprites/SpritePathMap.js";
import { Item } from "./Item.js";

export class ItemSlot extends Sprite {
    static activeSlot;

    static setActiveSlot(slot) {
        if (this.activeSlot) {
            this.activeSlot.img = SpritePathMap['itemslot'];
        }

        this.activeSlot = slot;
        this.activeSlot.img = SpritePathMap['activeitemslot'];
    }

    constructor(x) {
        super({width: 80, height: 80, x: x, y: 500, imageName: 'itemslot', layer: "screen"});

        Canvas.addObject(this)
    }

    addItem(item) {
        this.item = item;
        this.item.slot = this;

        this.positionItem(item)
    }

    positionItem(item) {
        item.x = this.x + ((this.width - this.item.width) / 2);
        item.y = this.y + ((this.height - this.item.height) / 2);

        item.counter.x = item.x + (item.width - (item.width / 4));
        item.counter.y = item.y + item.height;
    }

    mousedown(e) {
        ItemSlot.setActiveSlot(this)
    }

    mouseup(e) {
        ItemSlot.setActiveSlot(this)
        if (Item.itemDragging) {
            this.addItem(Item.itemDragging);
        }

        Item.itemDragging = null;
    }
}