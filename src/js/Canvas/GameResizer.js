import { Canvas } from "./Canvas.js";

export class GameResizer {
    static aspectRatioWidth = 1280;
    static aspectRatioHeight = 720;

    static resizeAlways() {
        this.resize();
        window.addEventListener("resize", () => this.resize());
    }

    static resize() {
        const ratio = this.aspectRatioWidth / this.aspectRatioHeight;

        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;

        if (width / ratio > height) {
            width = height * ratio;
        }

        else {
            height = width / ratio;
        }

        Canvas.element.width = width;
        Canvas.element.height = height;

        this.scale(width, height);
        Canvas.noImageSmoothing();
        
        Canvas.draw();
    }

    static scale(width, height) {
        const scaleX = width / this.aspectRatioWidth;
        const scaleY = height / this.aspectRatioHeight;
        
        Canvas.canvas.scale(scaleX, scaleY);
    }
}