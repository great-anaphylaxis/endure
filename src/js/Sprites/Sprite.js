import { Canvas } from "../Canvas/Canvas.js";
import { SpritePathMap } from "./SpritePathMap.js";
import { Viewport } from "../Canvas/Viewport.js";
import { SpriteAnimationMap } from "./SpriteAnimationMap.js";

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
        this.animationName = params.animationName
        this.animation = SpriteAnimationMap[this.animationName] || [];
        this.animationDelay = params.animationDelay || 100;
        this.animationPlayed = false;
    }

    isPlayingAnimation(...names) {
        for (let i = 0; i < names.length; i++) {
            if (names[i] == this.animationName) {
                if (this.animationPlayed) {
                    return true;
                }
            }
        }

        return false;
    }

    playAnimation(name, delay, repeat=true) {
        if (!(name == this.animationName) || !repeat) {
            this.stopAnimation();
            this.animationDelay = delay || this.animationDelay;
            this.animationName = name;
            this.animation = [...SpriteAnimationMap[this.animationName]];
            this.animationPlayed = true;
            this.repeatAnimation = repeat;

            this.nextAnimation();
        }
    }

    nextAnimation() {
        this.animationTimeout = setTimeout(function() {
            if (this.animationPlayed) {
                this.animation.push(this.animation.shift());

                if (!this.repeatAnimation && this.hasRepeatedAnimation()) {
                    this.stopAnimation();
                }

                this.nextAnimation();
            }
        }.bind(this), this.animationDelay)
    }

    stopAnimation() {
        clearTimeout(this.animationTimeout)
        this.animationPlayed = false;
    }
    
    hasRepeatedAnimation() {
        const hasRepeated = (this.animation[0] == SpriteAnimationMap[this.animationName][0]);

        if (hasRepeated) {
            return true;
        }

        return false;
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