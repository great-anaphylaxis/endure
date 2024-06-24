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
        this.visible = params.visible ?? true;
    }

    draw() {
        let finalX = this.x;
        let finalY = this.y;

        if (this.layer === "world") {
            finalX = finalX - Viewport.x;
            finalY = finalY - Viewport.y;
        }
        
        if (this.img.complete) {
            Canvas.canvas.drawImage(this.img, finalX, finalY, this.width, this.height);
        }

    }

    remove() {
        for (let i = 0; i < Canvas.objects.length; i++) {
            const obj = Canvas.objects[i];

            if (obj == this) {
                Canvas.objects.splice(i, 1);
            }
        }
    }
}