import { Canvas } from "../Canvas/Canvas.js";
import { DroppedItem } from "../Inventory/DroppedItem.js";
import { Sprite } from "../Sprites/Sprite.js";
import { Game } from "../game.js";
import { Player } from "./Player.js";

export class Rock extends Sprite {
    constructor(x) {
        super({
            x: x, y: Game.ground - 96,
            width: 96, height: 96,
            imageName: "rock"
        });

        this.health = 40;

        Canvas.addObject(this);
    }

    loop() {
        const player = Player.get();

        if (player.canDamage && player.collides(this)) {
            this.health -= player.damage;
        }

        if (this.health <= 0) {
            new DroppedItem("stone", 3, this.x, this.y)
            this.remove();
        }
    }
}