import { Canvas } from "../Canvas/Canvas.js";
import { Game } from "../game.js";
import { Entity } from "./Entity.js";

export class Rock extends Entity {
    constructor(x) {
        super({
            x: x, y: Game.ground - 96,
            width: 96, height: 96,
            imageName: "rock"
        });

        Canvas.addObject(this);
    }
}