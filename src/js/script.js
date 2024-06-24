import { Canvas } from "./Canvas/Canvas.js";
import { GameResizer } from "./Canvas/GameResizer.js";
import { Player } from "./Objects/Player.js";
import { GrassBlock } from "./Objects/GrassBlock.js";
import { DirtBlock } from "./Objects/DirtBlock.js";
import { Game } from "./game.js";
import { ItemSlot } from "./Inventory/ItemSlot.js";
import { InventoryItem } from "./Inventory/InventoryItem.js";
import { PlayerInventoryButton } from "./Inventory/PlayerInventoryButton.js";
import { PlayerInventory } from "./Inventory/PlayerInventory.js";
import { PlayerUtility } from "./Utility/PlayerUtility.js";
import { Item } from "./Inventory/Item.js";
import { DroppedItem } from "./Inventory/DroppedItem.js";

GameResizer.resizeAlways();
Canvas.start();

const player = new Player();

for (let x = Game.leftBorder; x <= Game.rightBorder; x += 64) {
    const grassblock = new GrassBlock(x, Game.ground);

    for (let y = 0; y < 4; y++) {
        const dirtblock = new DirtBlock(x, Game.ground + (y + 1) * 64);
    }
}


player.inventory.addItem(new InventoryItem('wood', 2))
player.inventory.addItem(new InventoryItem('stone', 15))
player.inventory.removeItems(new Item('stone', 8));

const drop = new DroppedItem("stone", 5, 100, -500, player);