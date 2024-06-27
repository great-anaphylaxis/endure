import { Sprite } from "../Sprites/Sprite.js";

export class Entity extends Sprite {
    constructor(spriteParams, entityParams={}) {
        super(spriteParams);
        this.health = entityParams.health || 100;
    }
}