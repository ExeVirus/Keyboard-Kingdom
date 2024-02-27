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
    constructor(scene, kindomManager, name, width, height, maxHealth) {
        super(scene, 0, 0, '');
        this.scene = scene
        this.kindomManager = kindomManager
        this.maxHealth = maxHealth;
        this.curHealth = maxHealth;
        this.name = name;
        this.buildingTexture = scene.textures.get(name)
        if(scene.textures.exists('dyn' + name)) {
            this.dynamicTexture = scene.textures.get('dyn' + name);
        } else {
            this.dynamicTexture = scene.textures.addDynamicTexture('dyn' + name, width, height);
        }
        this.setTexture('dyn' + 'Castle');
    }

    update(time, delta) {}

    activation(keyButton) {}
}
