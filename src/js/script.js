import { Canvas } from "./Canvas/Canvas.js";
import { GameResizer } from "./Canvas/GameResizer.js";
import { Player } from "./Objects/Player.js";
import { GrassBlock } from "./Objects/GrassBlock.js";
import { DirtBlock } from "./Objects/DirtBlock.js";
import { Game } from "./game.js";

GameResizer.resizeAlways();
Canvas.noImageSmoothing();
Canvas.drawLoop();

const player = new Player();

for (let i = 0; i < 20; i++) {
    const grassblock = new GrassBlock(i * 64, Game.ground);

    for (let j = 0; j < 4; j++) {
        const dirtblock = new DirtBlock(i * 64, Game.ground + (j + 1) * 64);
    }
}