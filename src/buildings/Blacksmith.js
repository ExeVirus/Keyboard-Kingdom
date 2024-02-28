import { Building } from "../key_classes/Building.js"
import { VerticalHealthBar } from "../key_classes/VerticalHealthBar.js"

export class Blacksmith extends Building
{
    constructor(keyButton, scene, kindomManager) {
        super(scene, kindomManager, 'Blacksmith', 90, 90, 100)
        //this.healthBar = new VerticalHealthBar(scene, 'CastleHealth', x-5, y, 4, 480, 1);
        this.setPosition(keyButton.x+5, keyButton.y+8);
        this.keyButton = keyButton;
        keyButton.changeBuilding(this);
        this.rebuildTexture();
        //scene.add.image(x,y,'dyn' + 'Castle');
    }

    rebuildTexture()
    {
        this.dynamicTexture.clear();
        this.dynamicTexture.stamp('Blacksmith', null, 0, 0, { originX: 0, originY: 0, scale: 0.12});
    }

    activation(keyButton) {
        const idx = this.keyButtons.findIndex(e => e.keyText == keyButton.keyText);
        if(idx == this.litKeyNum) {
            this.kindomManager.addResource(30);
            this.getNewKey();
            this.rebuildTexture();
        } else {
            this.kindomManager.addResource(-30);
        }
    }
}