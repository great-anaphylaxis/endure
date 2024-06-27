import { Sprite } from "../Sprites/Sprite.js";
import { Canvas } from "../Canvas/Canvas.js"
import { Game } from "../game.js";
import { Text } from "../Sprites/Text.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";
import { InventoryItem } from "../Inventory/InventoryItem.js";
import { Player } from "../Objects/Player.js";

export class DroppedItem extends Sprite {
    accelerationY = 0.6;
    velocityY = 0;
    floatAllowance = 15;
    
    constructor(name, count, x, y) {
        super({
            x: x, y: y, z: SpriteZMap["droppeditems"],
            width: 48, height: 48,
            imageName: name
        });
        
        this.counter = new Text({
            x: x, y: y, z: SpriteZMap["droppeditemtext"],
            layer: "world",
            color: "yellow", 
            text: count
        });
        this.name = name;
        this.count = count;
        
        Canvas.addObject(this)
    }
    
    loop() {
        const player = Player.get();
        
        this.velocityY += this.accelerationY;
        
        if (this.y + this.height + this.floatAllowance >= Game.ground && !this.jumped) {
            this.y = Game.ground - this.height - this.floatAllowance;
            this.velocityY = 0;
        }
        
        this.y += this.velocityY;
        
        this.counter.x = this.x + 30;
        this.counter.y = this.y + 30;
        
        if (player.collides(this)) {
            player.inventory.addItem(new InventoryItem(this.name, this.count));
            
            this.counter.remove();
            this.remove();
        }
    }
}