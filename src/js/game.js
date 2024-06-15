import { Canvas } from "./Canvas.js";
import { GameResizer } from "./GameResizer.js";
import { Sprite } from "./Sprite.js";
import { Viewport } from "./Viewport.js";

GameResizer.resizeAlways();
Canvas.noImageSmoothing();
Canvas.drawLoop();

const grassblock = new Sprite({width: 64, height: 64, x: 100, y: 500, imageName: 'grassblock'});

let left = false;
let right = false;
let velocityY = 0;
let accelerationY = 0.2;
let allowJump = true;
let jumped = false;

const player = new Sprite({width: 64, height: 64, x: 100, y: 100, imageName: 'player'});

player.on('keydown', e => {
    if (e.key == "a") {
        left = true;
    }

    if (e.key == "d") {
        right = true
    }

    if (e.key == " " && allowJump) {
        jumped = true
        allowJump = false;
    }
});

player.on('keyup', e => {
    if (e.key == "a") {
        left = false;
    }

    if (e.key == "d") {
        right = false;
    }

    if (e.key == " ") {
        allowJump = true;
    }
});

player.setLoop(() => {
    if (left) {
        player.x -= 5;
    }

    if (right) {
        player.x += 5;
    }
    
    velocityY += accelerationY;

    if (player.y + player.height >= grassblock.y) {
        player.y = grassblock.y - player.height;
        velocityY = 0;
    }

    if (jumped) {
        jumped = false;

        velocityY = -5.5;
    }

    player.y += velocityY;

    Viewport.x = player.x - 1280 / 2;
    Viewport.y = player.y - 720 / 2;
});