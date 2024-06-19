import { Inventory } from "./Inventory.js";
import { ItemSlot } from "./ItemSlot.js";
import { PlayerInventoryButton } from "./PlayerInventoryButton.js";

export class PlayerInventory extends Inventory {
    slots = [];
    visible = true;

    constructor(player) {
        super();

        this.player = player;
        this.createSlots();
        this.createPlayerInventoryButton();
    }

    createSlots() {
        for (let i = 0; i < 7; i++) {
            const itemSlot = new ItemSlot(410 + (i * 64), 600);
            this.addSlot(itemSlot);
        }

        for (let i = 0; i < 7; i++) {
            const itemSlot = new ItemSlot(100 + (i * 64), 100);
            this.addSlot(itemSlot);

            this.slots.push(itemSlot);
        }
    }

    createPlayerInventoryButton() {
        const button = new PlayerInventoryButton(858, 600, this.player);
    }

    toggleVisibility() {
        this.visible = !this.visible;

        for (let i = 0; i < this.slots.length; i++) {
            const slot = this.slots[i];

            slot.visible = this.visible;

            if (slot.item) {
                slot.item.counter.visible = this.visible;
                slot.item.visible = this.visible;
            }
        }
    }
}