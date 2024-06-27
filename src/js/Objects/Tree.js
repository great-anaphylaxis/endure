import { Canvas } from "../Canvas/Canvas.js";
import { Game } from "../game.js";
import { Entity } from "./Entity.js";

export class Tree extends Entity {
    constructor(x) {
        super({
            x: x, y: Game.ground - 164,
            width: 96, height: 164,
            imageName: "tree"
        });

        Canvas.addObject(this);
    }
}