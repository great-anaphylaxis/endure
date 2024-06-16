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
        this.layer = params.layer || "world"; // or screen
        this.img = SpritePathMap[params.imageName || "player"];
    }

    draw() {
        let finalX = this.x;
        let finalY = this.y;

        if (this.layer === "world") {
            finalX = finalX - Viewport.x;
            finalY = finalY - Viewport.y;
        }

        Canvas.canvas.drawImage(this.img, finalX, finalY, this.width, this.height);
    }
}