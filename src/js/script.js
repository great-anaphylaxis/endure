import { Canvas } from "./Canvas/Canvas.js";
import { GameResizer } from "./Canvas/GameResizer.js";
import { Player } from "./Objects/Player.js";
import { GrassBlock } from "./Objects/GrassBlock.js";
import { DirtBlock } from "./Objects/DirtBlock.js";
import { Game } from "./game.js";
import { ItemSlot } from "./Inventory/ItemSlot.js";
import { Item } from "./Inventory/Item.js";

GameResizer.resizeAlways();
Canvas.start();

const player = new Player();

for (let x = Game.leftBorder; x <= Game.rightBorder; x += 64) {
    const grassblock = new GrassBlock(x, Game.ground);

    for (let y = 0; y < 4; y++) {
        const dirtblock = new DirtBlock(x, Game.ground + (y + 1) * 64);
    }
}

for (let i = 0; i < 7; i++) {
    const itemSlot = new ItemSlot(390 + (i * 80));
    player.inventory.addSlot(itemSlot);
}

player.inventory.addItem(new Item("wood"));
