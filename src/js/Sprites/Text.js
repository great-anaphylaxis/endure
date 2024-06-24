import { Canvas } from "../Canvas/Canvas.js";
import { Viewport } from "../Canvas/Viewport.js";

export class Text {
    constructor(params) {
        this.text = params.text || '';
        this.font = params.font || '20px monospace';
        this.color = params.color || 'black';
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.z = params.z || 0;
        this.layer = params.layer || "screen";
        this.visible = params.visible || true;

        Canvas.addObject(this);
    }

    draw() {
        let finalX = this.x;
        let finalY = this.y;

        if (this.layer === "world") {
            finalX = finalX - Viewport.x;
            finalY = finalY - Viewport.y;
        }

        Canvas.canvas.font = this.font;
        Canvas.canvas.textBaseline = "top";
        Canvas.canvas.fillStyle = this.color;
        Canvas.canvas.fillText(this.text, finalX, finalY);
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