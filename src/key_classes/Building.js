import { VerticalHealthBar } from "./VerticalHealthBar.js";

// ----------------------------------------------------------------------------
//
// Class: Building
// Desc: Base Class that implements:
//      - a tracked dynamic texture, derived adds the tracked building texture
//      - description
//      - health
//      - update() 
//      - activation() method
//      - track this scene and the kingdomManager
// 4. As they are created, they get pushed onto a list in the KingdomManager
// 5. As they are destroyed, they are erased from that list, removed from the keyButton, and pushed to the front of the "next building" list
//     - They cost the same as before, that is kept with their instance. 
// ----------------------------------------------------------------------------

export class Building extends Phaser.GameObjects.Sprite
{
    constructor(scene, kingdomManager, x, y, name, width, height, maxHealth) {
        super(scene, x, y, '');
        this.scene = scene
        this.kingdomManager = kingdomManager
        this.maxHealth = maxHealth;
        this.curHealth = maxHealth;
        this.name = name + kingdomManager.buildingNum.toString();
        this.kingdomManager.buildingNum++;
        if(scene.textures.exists('dyn' + this.name)) {
            this.dynamicTexture = scene.textures.get('dyn' + this.name);
        } else {
            this.dynamicTexture = scene.textures.addDynamicTexture('dyn' + this.name, width, height);
        }
        this.setTexture('dyn' + this.name);
        scene.add.existing(this);
        this.healthBar = null;
    }

    onCollide(keyButton, Enemy)
    {
        if(Enemy.curHealth >= this.curHealth) {
            Enemy.curHealth -= this.curHealth;
            this.kingdomManager.reAddTarget(keyButton.building.progressionID);
            keyButton.changeBuilding(null);
            this.kingdomManager.removeFromUpdateList(keyButton);
            this.destroy();
            if(Enemy.curHealth / Enemy.startHealth < 0.05) {
                Enemy.destroy();
            } else {
                Enemy.updateHealthBar();
            }
        } else {
            this.curHealth -= Enemy.curHealth;
            if(this.curHealth / this.maxhealth < 0.05) {
                this.destroy();
            } else {
                this.updateHealthBar();
            }
            Enemy.destroy();
        }
    }

    updateHealthBar()
    {
        if(this.healthBar != null) {
            this.healthBar.setPercent(this.curHealth / this.maxHealth);
        }
    }

    destroy()
    {
        if(this.healthBar != null) {
            this.healthBar.destroy();
        }
        super.destroy();
    }
}
