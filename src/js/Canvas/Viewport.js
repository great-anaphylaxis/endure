import { Canvas } from "./Canvas.js";
import { GameResizer } from "./GameResizer.js";

export class Viewport {
    static x = 0;
    static y = 0;

    static getScreenToWorldPoints(e) {
        const [mouseX, mouseY] = this.getScreenPoints(e);
        
        const pointX = mouseX + this.x;
        const pointY = mouseY + this.y;

        return [pointX, pointY];
    }

    static getScreenPoints(e) {
        const scaleX = Canvas.element.width / GameResizer.aspectRatioWidth;
        const scaleY = Canvas.element.height / GameResizer.aspectRatioHeight;

        const mouseX = parseInt(e.offsetX / scaleX);
        const mouseY = parseInt(e.offsetY / scaleY);
        
        return [mouseX, mouseY]
    }

    static pointOnObject(obj, pointX, pointY) {
        if (pointX >= obj.x && pointX <= obj.x + obj.width && pointY >= obj.y && pointY <= obj.y + obj.height) {
            return true
        }

        return false
    }
}