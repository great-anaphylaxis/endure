export class Canvas {
    static element = document.getElementById('game');
    static canvas = this.element.getContext('2d');
    static objects = [];

    static draw() {
        this.canvas.clearRect(0, 0, 10000, 10000);

        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i];

            obj.draw();
            if (obj.loop) obj.loop();
        }
    }
    
    static drawLoop() {
        this.draw();
        window.requestAnimationFrame(() => this.drawLoop());
    }

    static addObject(obj) {
        this.prepareObject(obj);
        this.objects.push(obj);
    }

    static prepareObject(obj) {
        if (obj.keydown) window.addEventListener('keydown', e => obj.keydown(e));
        if (obj.keyup) window.addEventListener('keyup', e => obj.keyup(e));
    }

    static noImageSmoothing() {
        this.canvas.imageSmoothingEnabled = false;
    }
}