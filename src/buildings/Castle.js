import { Building } from "../key_classes/Building.js"
import { VerticalHealthBar } from "../key_classes/VerticalHealthBar.js"

export class Castle extends Building
{
    constructor(k1, k2, k3, k4, x, y, scene, kingdomManager) {
        super(scene, kingdomManager, 'Castle', 108, 500, 100)
        //this.healthBar = new VerticalHealthBar(scene, 'CastleHealth', x-5, y, 4, 480, 1);
        this.setPosition(x, y);
        this.keyButtons = [k1, k2, k3, k4];
        k1.changeBuilding(this);
        k2.changeBuilding(this);
        k3.changeBuilding(this);
        k4.changeBuilding(this);
        this.litKey = k1;
        this.litKeyNum = 0;
        this.rebuildTexture();
        //scene.add.image(x,y,'dyn' + 'Castle');
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