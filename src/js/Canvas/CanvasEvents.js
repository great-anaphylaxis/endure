import { Canvas } from "./Canvas.js";
import { Viewport } from "./Viewport.js";

export class CanvasEvents {
    static addCanvasEvents() {
        Canvas.element.addEventListener('mousedown', e => {
            const [pointX, pointY] = Viewport.getScreenToWorldPoints(e);
            const [fixedX, fixedY] = Viewport.getScreenPoints(e);

            for  (let i = 0; i < Canvas.objects.length; i++) {
                const obj = Canvas.objects[i];
                const onWorldLayer = (obj.layer === "world")
                const onScreenLayer = (obj.layer === "screen")

                if (Viewport.pointOnObject(obj, pointX, pointY) && onWorldLayer) {
                    if (obj.mousedown) {
                        obj.mousedown(e);
                    }
                }

                else if (Viewport.pointOnObject(obj, fixedX, fixedY) && onScreenLayer) {
                    if (obj.mousedown) {
                        obj.mousedown(e);
                    }
                }
            }
        })

        Canvas.element.addEventListener('mouseup', e => {
            const [pointX, pointY] = Viewport.getScreenToWorldPoints(e);
            const [fixedX, fixedY] = Viewport.getScreenPoints(e);

            for  (let i = 0; i < Canvas.objects.length; i++) {
                const obj = Canvas.objects[i];
                const onWorldLayer = (obj.layer === "world")
                const onScreenLayer = (obj.layer === "screen")

                if (Viewport.pointOnObject(obj, pointX, pointY) && onWorldLayer) {
                    if (obj.mouseup) {
                        obj.mouseup(e);
                    }
                }

                else if (Viewport.pointOnObject(obj, fixedX, fixedY) && onScreenLayer) {
                    if (obj.mouseup) {
                        obj.mouseup(e);
                    }
                }
            }
        })
    }

    static addEventsToObject(obj) {
        if (obj.keydown) {
            window.addEventListener('keydown', e => obj.keydown(e));
        }

        if (obj.keyup) {
            window.addEventListener('keyup', e => obj.keyup(e));
        }

        if (obj.mousemove) {
            Canvas.element.addEventListener('mousemove', e => obj.mousemove(e));
        }
    }
}