import { Canvas } from "./Canvas.js";
import { SpritePathMap } from "./SpritePathMap.js";
import { Viewport } from "./Viewport.js";

export class Sprite {
    constructor(params) {
        this.width = params.width || 100;
        this.height = params.height || 100;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.z = params.z || 0;
        this.imageName = params.imageName;
        this.loop = () => {};

        this.createImage()

        Canvas.addObject(this);
    }

    createImage() {
        this.img = new Image();
        this.img.src = SpritePathMap[this.imageName];
        this.img.onload = () => this.draw();
    }

    draw() {
        const finalX = this.x - Viewport.x;
        const finalY = this.y - Viewport.y;

        Canvas.canvas.drawImage(this.img, finalX, finalY, this.width, this.height);
    }

    on(event, callback) {
        window.addEventListener(event, e => callback(e))
    }

    setLoop(callback) {
        this.loop = callback;
    }
}