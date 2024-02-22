// ----------------------------------------------------------------------------
//
// Class: KeyButton
// Desc: Implements:
//     - a button square of size = sidelen
//          - That is clickable and has a specific keydown callback (same callback)
//          - That has a building string representing its current callback
//          - That can be collided with by enemies, triggering a different building callback
//          - That has a health bar related to the building health
//          - That has a colored meter bar related to the building state
//          - That maintains a dynamic texture for itself
//     - Uses the scene to grab the KingdomManager for callbacks and customization color data
// ----------------------------------------------------------------------------

export class KeyButton extends Phaser.GameObjects.Sprite {
    percent = -1;
    percentColor = '#00E000'; // green
    health = -1;
    sidelen = -1;
    key = '';
    building  = '';
    baseTexture;
    dynamicTexture;

    // key = just the letters from here: https://github.com/phaserjs/phaser/blob/v3.70.0/src/input/keyboard/keys/KeyCodes.js
    constructor(scene, x, y, sidelen, key) {
        super(scene, x, y, key);
        // Save the sidelen, and key
        this.sidelen = sidelen;
        this.key = 'keydown-' + key;

        this.buildBaseTexture(scene);

        //turn on mouse clicks and keydowns
        this.enableInput(scene);
    }

    changeBuilding(building) {
        this.building = building;
        if(building != "") {
            this.enableCollisions();
        }
        this.rebuildTexture();
    }

    // Called by pressing key or clicking the button
    activation() {
        alert('Activated the keyButton!');

        //TODO
        //this.scene.kingdomManager.activation(this)
    }

    collision(otherObject) {
        //TODO
    }

    enableCollisions() {
        //TODO
        //this.scene.physics.arcade.enableBody(this);
        //this.body.setCollideCallback(() => {
            // your collision logic here
        //});
    }

    enableInput(scene) {
        this.setInteractive()
            .on('pointerdown', () => this.activation() );
        scene.input.keyboard.on(this.key, event =>
        {
            this.activation();
        });
    }

    disableCollisions() {
        //TODO
        //this.scene.physics.arcade.disableBody(this); ??
    }

    buildBaseTexture(scene) {
        //build baseTexture
        let text = scene.add.text(0,0,this.key, {fontFamily: '"Bungee"', fontSize: '40px', color: scene.keyColor })
        this.baseTexture = scene.textures.addDynamicTexture('base' + this.key, this.sidelen, this.sidelen);
        this.baseTexture.stamp('key_' + scene.keyboard_color, null, this.sidelen, this.sidelen);
        this.baseTexture.draw(text, 50, 50);
        text.destroy();

        // create the dynamicTexture
        this.dynamic_texture = scene.textures.addDynamicTexture(this.key, this.sidelen, this.sidelen);
        // rebuild the dynamicTexture for first time
        this.rebuildTexture();
    }

    rebuildTexture() {
        this.dynamic_texture.stamp('base' + this.key, null, this.sidelen, this.sidelen);
        if(this.percent > -1) {
            // green bar TODO
        }
        if(this.health > -1) {

        }
        if(this.building != '') {

        }
    }

    cleanup() {
        this.baseTexture.destroy();
        this.dynamic_texture.destroy();
    }
}
