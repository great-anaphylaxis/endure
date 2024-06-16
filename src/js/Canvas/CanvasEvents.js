import { Canvas } from "./Canvas.js";
import { GameResizer } from "./GameResizer.js";
import { Viewport } from "./Viewport.js";

export class CanvasEvents {
    static addCanvasEvents() {
        Canvas.element.addEventListener('click', e => {
            const scaleX = Canvas.element.width / GameResizer.aspectRatioWidth;
            const scaleY = Canvas.element.height / GameResizer.aspectRatioHeight;

            const mouseX = parseInt(e.offsetX / scaleX);
            const mouseY = parseInt(e.offsetY / scaleY);
            
            const pointX = mouseX + Viewport.x;
            const pointY = mouseY + Viewport.y;

            for  (let i = 0; i < Canvas.objects.length; i++) {
                const obj = Canvas.objects[i];

                if (pointX >= obj.x && pointX <= obj.x + obj.width && pointY >= obj.y && pointY <= obj.y + obj.height) {
                    if (obj.click) obj.click(e);
                }
            }
        })
    }

    static addEventsToObject(obj) {
        if (obj.keydown) window.addEventListener('keydown', e => obj.keydown(e));
        if (obj.keyup) window.addEventListener('keyup', e => obj.keyup(e));
    }
}