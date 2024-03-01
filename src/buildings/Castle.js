import { Building } from "../key_classes/Building.js"
import { VerticalHealthBar } from "../key_classes/VerticalHealthBar.js"

export class Castle extends Building
{
    constructor(k1, k2, k3, k4, x, y, scene, kingdomManager) {
        super(scene, kingdomManager, x, y, 'Castle', 108, 500, 500)
        this.keyButtons = [k1, k2, k3, k4];
        k1.changeBuilding(this);
        k2.changeBuilding(this);
        k3.changeBuilding(this);
        k4.changeBuilding(this);
        this.litKey = k1;
        this.litKeyNum = 0;
        this.rebuildTexture();
        this.healthBar = new VerticalHealthBar(scene, x-this.width/2+2, this.y, 4, this.height-20);
    }

    rebuildTexture()
    {
        this.dynamicTexture.clear();
        this.dynamicTexture.stamp('Castle', null, 0, 0, { originX: 0, originY: 0});
        this.dynamicTexture.fill(0x8888FF, 0.4, 0, 12+120*this.litKeyNum, this.width, 110);//Light up first key
    }

    getNewKey()
    {
        function getRandomIndex(arr) {
            return Math.floor(Math.random() * arr.length);
        }
        let choices = []
        for (let i = 0; i < this.keyButtons.length; i++) {
            if(i != this.litKeyNum) {
                choices.push(this.keyButtons[i]);
            }
        }
        this.litKey = choices[getRandomIndex(choices)];
        this.litKeyNum = this.keyButtons.findIndex(e => e.keyText == this.litKey.keyText);
    }

    activation(keyButton) {
        const idx = this.keyButtons.findIndex(e => e.keyText == keyButton.keyText);
        if(idx == this.litKeyNum) {
            this.kingdomManager.addResource(30);
            this.getNewKey();
            this.rebuildTexture();
        } else {
            this.kingdomManager.addResource(-30);
        }
    }
}