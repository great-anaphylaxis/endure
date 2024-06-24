import { Sprite } from "../Sprites/Sprite.js";
import { Canvas } from "../Canvas/Canvas.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";

export class PlayerUtilityGroup extends Sprite {
    utilityItems = [];
    
    constructor(name) {
        super({
            x: 0, y: 0, z: SpriteZMap['playerutilitygroup'], 
            width: 64, height: 64, 
            layer: 'screen',
            imageName: name
        });
        this.name = name;
        
        Canvas.addObject(this);
    }
    
    toggleVisibility() {
        this.visible = !this.visible;
        
        for (let i = 0; i < this.utilityItems.length; i++) {
            const utilityItem = this.utilityItems[i];
            
            utilityItem.visible = !utilityItem.visible;
        }
    }
    
    addUtilityItem(item) {
        const length = this.utilityItems.length;
        const x = 740 + ((length % 11) * 48)
        const y = 260 + (Math.floor(length / 11) * 48)
        
        item.x = x;
        item.y = y;
        item.playerUtility = this.playerUtility;
        
        this.utilityItems.push(item);
    }
}