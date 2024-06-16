import { Item } from "./Item.js";

export class Inventory {
    inventory = [];

    add(newItem) {
        for (let i = 0; i < this.inventory.length; i++) {
            const item = this.inventory[i];

            if (Item.areTheSameItems(item, newItem)) {
                
            }
        }
    }

}