import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpritePathMap } from "../Sprites/SpritePathMap.js";
import { Game } from "../game.js";
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
        super({width: 80, height: 80, x: x, y: 500, z: 1, imageName: 'itemslot', layer: "screen"});

        Canvas.addObject(this)
    }

    swap(slot) {
        const slot1 = this;
        const slot2 = slot;

        const item1 = this.item;
        const item2 = slot.item;

        this.item.slot = slot2;
        this.item = item2;

        slot.item.slot = slot1;
        slot.item = item1;

        this.positionItem(this.item);
        slot.positionItem(slot.item);

    }

    addItem(item) {
        // if empty
        if (!this.item) {
            if (item.slot) {
                item.slot.item = null;
                item.slot = null;
            }

            this.item = item;
            this.item.slot = this;
    
            this.positionItem(item);
        }

        // if the same
        else if (item == this.item) {
            this.item = item;
            this.item.slot = this;
            
            this.positionItem(item);
        }

        else if (Item.areTheSameItems(item, this.item)) {
            this.item.setCount(this.item.count + item.count);

            item.counter.remove();
            item.remove();

            item.slot.item = null;
            item.slot = null;
        }
    }

    positionItem(item) {
        item.x = this.x + ((this.width - this.item.width) / 2);
        item.y = this.y + ((this.height - this.item.height) / 2);

        item.counter.x = item.x + (item.width - (item.width / 2));
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