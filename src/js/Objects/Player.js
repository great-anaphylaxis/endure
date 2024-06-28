import { Canvas } from "../Canvas/Canvas.js";
import { Viewport } from "../Canvas/Viewport.js";
import { PlayerInventory } from "../Inventory/PlayerInventory.js";
import { PlayerUtility } from "../Utility/PlayerUtility.js";
import { Game } from "../game.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";
import { Sprite } from "../Sprites/Sprite.js";

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
    direction = "right";

    player;

    isDamageCooldown = false;
    canDamage = false;
    damageCooldown = 500;
    damage = 6;

    constructor() {
        super({
            width: 64, height: 64, 
            x: 100, y: 100, z: SpriteZMap['player']
        });
        this.toggleVisibility();

        Canvas.addObject(this);

        Player.player = this;
    }

    static get() {
        return Player.player;
    }

    collides(obj) {
        if (
            obj.x < this.x + this.width &&
            obj.x + obj.width > this.x &&
            obj.y < this.y + this.height &&
            obj.y + obj.height > this.y
        ) {
            return true;
        }

        return false;
    }

    loop() {
        if (this.left && !this.isDamageCooldown) {
            if (this.x <= Game.leftBorder) {
                this.x = Game.leftBorder;
            }
            else {
                this.x += -this.speed;
            }

            this.playAnimation('playerwalkingleft', 100);
        }
    
        if (this.right && !this.isDamageCooldown) {
            if (this.x >= Game.rightBorder) {
                this.x = Game.rightBorder;
            }
            else {
                this.x += this.speed;
            }

            this.playAnimation('playerwalkingright', 100);
        }

        if (!this.animationPlayed) {
            this.playAnimation(`playeridle${this.direction}`, 1000);
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

        // collision stuff
        if (this.canDamage) {
            this.canDamage = false;
        }
    }

    keydown(e) {
        if (e.key.toLowerCase() == "a") {
            this.left = true;

            this.direction = "left";
        }
    
        if (e.key.toLowerCase() == "d") {
            this.right = true;

            this.direction = "right";
        }
    
        if (e.key == " " && this.allowJump) {
            this.jumped = true
            this.allowJump = false;
        }

        if (e.key == "Enter" && !this.isDamageCooldown) {
            this.canDamage = true;
            this.playAnimation(`playerattack${this.direction}`, 30, false);

            this.isDamageCooldown = true;
            setTimeout(function() {
                this.isDamageCooldown = false;

                
            }.bind(this), this.damageCooldown);
        }
    }

    keyup(e) {
        if (e.key.toLowerCase() == "a") {
            this.left = false;

            this.playAnimation('playeridleleft', 1000);
        }
    
        if (e.key.toLowerCase() == "d") {
            this.right = false;

            this.playAnimation('playeridleright', 1000);
        }
    }

    toggleVisibility() {
        this.inventory.toggleVisibility();
        this.utility.toggleVisibility();
    }
}
