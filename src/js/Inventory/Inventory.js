import { Game } from "../game.js";
import { Item } from "./Item.js";

export class Inventory {
    inventory = [];

    addSlot(slot) {
        this.inventory.push(slot);
    }

    addItem(newItem) {
        for (let i = 0; i < this.inventory.length; i++) {
            const slot = this.inventory[i];
            const item = slot.item;

            if (!item) {
                slot.item = newItem;
                newItem.slot = slot;

                slot.positionItem(slot.item);
                break;
            }

            else if (item && Item.areTheSameItems(item, newItem)) {
                const total = item.count + newItem.count;

                item.setCount(total);

                newItem.counter.remove();
                newItem.remove();
                break;
            }

            else {
                continue;
            }
        }
    }

}