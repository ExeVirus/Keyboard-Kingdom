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
    constructor(scene, kingdomManager, name, width, height, maxHealth) {
        super(scene, 0, 0, '');
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
    }

    onCollide(Enemy)
    {
        console.log("Building Hit!");
        Enemy.destroy();
    }
}
