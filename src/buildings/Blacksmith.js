import { Building } from "../key_classes/Building.js"
import { VerticalHealthBar } from "../key_classes/VerticalHealthBar.js"

export class Blacksmith extends Building
{
    constructor(keyButton, scene, kingdomManager, progressionID) {
        super(scene, kingdomManager, keyButton.x+5, keyButton.y+8, 'Blacksmith', 90, 90, 60);
        this.keyButton = keyButton;
        this.progressionID = progressionID;
        keyButton.changeBuilding(this);
        this.burn = 50;
        this.lastBurn = this.burn;
        this.canBurn = true;
        this.lastUpdate = 0;
        this.rebuildTexture();
        this.healthBar = new VerticalHealthBar(scene, keyButton.x - 60, keyButton.y-10, 4, 100);
    }

    rebuildTexture()
    {
        this.dynamicTexture.clear();
        this.dynamicTexture.stamp('Blacksmith', null, 0, 0, { originX: 0, originY: 0, scale: 0.12});
        this.dynamicTexture.stamp('Fire', null, this.width/4, this.height/4, { originX: 0, originY: 0, scale: 0.5, alpha: (this.burn/100)});
        if(this.canBurn == false) {
            this.dynamicTexture.fill(0x000000, 0.5, 0, 60, this.width-20, this.height-70);//Light up first key
        }
    }

    activation(keyButton)
    {
        if(this.canBurn) {
            this.burn += 15;
            this.lastBurn = this.burn; //for reducing number of updates
            this.burn = Math.min(this.burn, 100);
            this.canBurn = false;
            this.lastUpdate = this.scene.sys.game.getTime();
            this.rebuildTexture();
        }
    }

    update(time, delta)
    {
        this.burn -= delta/200;
        this.burn = Math.max(this.burn, 0);
        if(this.lastUpdate + 1000 < time) {
            this.canBurn = true;
        }
        if(Math.abs(this.burn-this.lastBurn) > 2) {
            this.lastBurn = this.burn + 0.1;
            this.rebuildTexture();
        }
        if ('kingdomManager' in this) {
            this.kingdomManager.addResource(this.burn/2 * delta/1000);
        }
    }

}