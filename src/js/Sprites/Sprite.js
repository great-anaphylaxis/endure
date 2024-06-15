import { Canvas } from "../Canvas/Canvas.js";
import { SpritePathMap } from "./SpritePathMap.js";
import { Viewport } from "../Canvas/Viewport.js";

export class Sprite {
    constructor(params) {
        this.width = params.width || 100;
        this.height = params.height || 100;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.z = params.z || 0;
        this.img = SpritePathMap[params.imageName || "player"];
    }

    draw() {
        const finalX = this.x - Viewport.x;
        const finalY = this.y - Viewport.y;

        Canvas.canvas.drawImage(this.img, finalX, finalY, this.width, this.height);
    }
}