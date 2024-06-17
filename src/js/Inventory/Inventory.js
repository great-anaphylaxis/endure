import { Game } from "../game.js";
import { Item } from "./Item.js";

export class Inventory {
    inventory = [];

    addSlot(slot) {
        this.inventory.unshift(slot);
    }

    addItem(newItem) {
        for (let i = 0; i < this.inventory.length; i++) {
            const slot = this.inventory[i];
            const item = slot.item;

            if (item && Item.areTheSameItems(item, newItem)) {
                const total = item.count += newItem.count;
                
                if (total > Game.inventoryLimit) {
                    continue;
                }

                else {
                    item.setCount(item.count + 1);
                }
            }

            else if (!item) {
                slot.item = newItem;
                newItem.slot = slot;

                slot.positionItem(slot.item);
            }

            else {
                continue;
            }
        }
    }

}