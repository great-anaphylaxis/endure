import { Canvas } from "../Canvas/Canvas.js";
import { DroppedItem } from "../Inventory/DroppedItem.js";
import { Sprite } from "../Sprites/Sprite.js";
import { Game } from "../game.js";
import { Player } from "./Player.js";

export class Tree extends Sprite {
    constructor(x) {
        super({
            x: x, y: Game.ground - 164,
            width: 96, height: 164,
            imageName: "tree"
        });

        this.health = 35;

        Canvas.addObject(this);
    }

    loop() {
        const player = Player.get();

        if (player.canDamage && player.collides(this)) {
            this.health -= player.damage;
            this.filter = "brightness(0) invert(1)";

            setTimeout(function() {
                this.filter = "none";
            }.bind(this), 100);
        }

        if (this.health <= 0) {
            new DroppedItem("wood", 3, this.x, this.y)
            this.remove();
        }
    }
}