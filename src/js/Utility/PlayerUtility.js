import { Canvas } from "../Canvas/Canvas.js";
import { Sprite } from "../Sprites/Sprite.js";
import { SpriteZMap } from "../Sprites/SpriteZMap.js";
import { PlayerUtilityGroup } from "../Utility/PlayerUtilityGroup.js";
import { PlayerUtilityItem } from "../Utility/PlayerUtilityItem.js";
import { Text } from "../Sprites/Text.js";
import { PlayerUtilityItemImage } from "../Utility/PlayerUtilityItemImage.js";
import { PlayerUtilityButton } from "../Utility/PlayerUtilityButton.js";
import { PlayerUtilityRequiredItem } from "../Utility/PlayerUtilityRequiredItem.js";
import { Item } from "../Inventory/Item.js";

export class PlayerUtility extends Sprite {
    utilityGroups = {};
    requiredItemsHint = [];
    
    constructor(player) {
        super({
            x: 731, y: 25, z: SpriteZMap['playerutility'], 
            width: 547, height: 548, 
            layer: 'screen',
            imageName: 'playerutility'
        });
        
        this.player = player;
        
        this.title = new Text({
            x: 860, y: 50, z: SpriteZMap['playerutilitytitle'],
            layer: 'screen', font: '35px monospace',
            text: ''
        });
        
        this.itemImage = new PlayerUtilityItemImage();
        this.button = new PlayerUtilityButton(this, this.player.inventory);
        this.createRequiredItemsHint()

        Canvas.addObject(this);
        
        // test
        this.addUtilityGroup(new PlayerUtilityGroup('wood'));
        
        this.utilityGroups["wood"].addUtilityItem(new PlayerUtilityItem('stone', [new Item('wood', 1), new Item('stone', 1)]));
    }

    toggleVisibility() {
        this.visible = !this.visible;
        this.title.visible = false;
        this.itemImage.visible = false;
        this.button.visible = false;
        
        this.title.text = '';
        
        for (let i = 0; i < this.requiredItemsHint.length; i++) {
            const requiredItem = this.requiredItemsHint[i];
            
            requiredItem.hide();
        }
        
        for (const key in this.utilityGroups) {
            const utilityGroup = this.utilityGroups[key];
            
            utilityGroup.toggleVisibility();
        }
    }
    
    addUtilityGroup(group) {
        const name = group.name;
        const length = Object.keys(this.utilityGroups).length;
        const x = 740 + (length * 48)
        
        group.x = x;
        group.y = 175;
        group.playerUtility = this;
        
        this.utilityGroups[name] = group;
    }
    
    createRequiredItemsHint() {
        for (let i = 0; i < 9; i++) {
            const x = 860 + ((i % 3) * 75);
            const y = 90 + (Math.floor(i / 3) * 25)
            const requiredItem = new PlayerUtilityRequiredItem(x, y);
            
            this.requiredItemsHint.push(requiredItem)
        }
    }
}
