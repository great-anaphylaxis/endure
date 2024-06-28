import { Canvas } from "../Canvas/Canvas.js";
import { SpritePathMap } from "./SpritePathMap.js";
import { Viewport } from "../Canvas/Viewport.js";
import { SpriteAnimationPathMap } from "./SpriteAnimationMap.js";

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
        this.filter = params.filter || "none";
        this.animation = SpriteAnimationPathMap[params.animationName] || [];
        this.animationDelay = params.animationDelay || 500;
        this.animationPlayed = false;
    }

    playAnimation() {
        this.animationPlayed = true;

        this.nextAnimation();
    }

    nextAnimation() {
        setTimeout(function() {
            if (this.animationPlayed) {
                this.animation.push(this.animation.shift());

                this.nextAnimation();
            }
        }.bind(this), this.animationDelay)
    }

    stopAnimation() {
        this.animationPlayed = false;
    }

    draw() {
        let finalX = this.x;
        let finalY = this.y;

        if (this.layer === "world") {
            finalX = finalX - Viewport.x;
            finalY = finalY - Viewport.y;
        }

        if (this.animation.length > 0) {
            const img = this.animation[0];

            Canvas.canvas.filter = this.filter;
            Canvas.canvas.drawImage(img, finalX, finalY, this.width, this.height);
        }
        
        else if (this.img.complete) {
            Canvas.canvas.filter = this.filter;
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