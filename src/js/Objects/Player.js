import { Canvas } from "../Canvas/Canvas.js";
import { Viewport } from "../Canvas/Viewport.js";
import { PlayerInventory } from "../Inventory/PlayerInventory.js";
import { PlayerUtility } from "../Utility/PlayerUtility.js";
import { Sprite } from "../Sprites/Sprite.js";
import { Game } from "../game.js";

export class Player extends Sprite {
    left = false;
    right = false;
    velocityY = 0;
    accelerationY = 0.6;
    jumpStrength = 15.5;
    speed = 7;
    allowJump = false;
    jumped = false;
    inventory = new PlayerInventory(this);
    utility = new PlayerUtility(this);

    constructor() {
        super({width: 64, height: 64, x: 100, y: 100, imageName: 'player'});
        this.toggleVisibility();

        Canvas.addObject(this);
    }

    loop() {
        if (this.left) {
            if (this.x <= Game.leftBorder) {
                this.x = Game.leftBorder;
            }
            else {
                this.x += -this.speed;
            }
        }
    
        if (this.right) {
            if (this.x >= Game.rightBorder) {
                this.x = Game.rightBorder;
            }
            else {
                this.x += this.speed;
            }
        }
        
        this.velocityY += this.accelerationY;
        
        if (this.y + this.height >= Game.ground && !this.jumped) {
            this.y = Game.ground - this.height;
            this.velocityY = 0;
            
            this.allowJump = true;
        }
    
        if (this.jumped) {
            this.jumped = false;
    
            this.velocityY = -this.jumpStrength;
        }
    
        this.y += this.velocityY;
    
        Viewport.x = this.x - 1280 / 2;
        Viewport.y = this.y - 720 / 2;
    }

    keydown(e) {
        if (e.key.toLowerCase() == "a") {
            this.left = true;
        }
    
        if (e.key.toLowerCase() == "d") {
            this.right = true
        }
    
        if (e.key == " " && this.allowJump) {
            this.jumped = true
            this.allowJump = false;
        }
    }

    keyup(e) {
        if (e.key.toLowerCase() == "a") {
            this.left = false;
        }
    
        if (e.key.toLowerCase() == "d") {
            this.right = false;
        }
    }

    toggleVisibility() {
        this.inventory.toggleVisibility();
        this.utility.toggleVisibility();
    }
}
