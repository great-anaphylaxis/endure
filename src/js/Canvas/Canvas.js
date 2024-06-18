import { CanvasEvents } from "./CanvasEvents.js";

export class Canvas {
    static element = document.getElementById('game');
    static canvas = this.element.getContext('2d');
    static objects = [];

    static start() {
        this.drawLoop();
        this.noImageSmoothing();
        CanvasEvents.addCanvasEvents();
    }

    static draw() {
        this.canvas.clearRect(0, 0, 1280, 720);

        this.objects.sort((a, b) => a.z - b.z);

        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];

            if (!obj.visible) {
                continue;
            }

            obj.draw();
            
            if (obj.loop) {
                obj.loop();
            }
        }
    }
    
    static drawLoop() {
        this.draw();
        window.requestAnimationFrame(() => this.drawLoop());
    }

    static addObject(obj) {
        CanvasEvents.addEventsToObject(obj)
        this.objects.push(obj);
    }

    static noImageSmoothing() {
        this.canvas.imageSmoothingEnabled = false;
    }
}