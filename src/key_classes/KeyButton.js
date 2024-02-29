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

import { constants } from './constants.js';

export class KeyButton extends Phaser.GameObjects.Sprite {
    percent = -1;
    percentColor = '#00E000'; // green
    health = -1;
    sidelen = -1;
    keyNum = -1;
    keyText = -1;
    keySymbols = -1;
    keyNum = -1;
    building  = null;
    keyColor = '';
    textColor = '';
    baseTexture;
    dynamicTexture;

    // key = just the letters from here: https://github.com/phaserjs/phaser/blob/v3.70.0/src/input/keyboard/keys/KeyCodes.js
    constructor(scene, x, y, sidelen, keyNum, keyColor, textColor) {
        super(scene, x, y, keyColor);
        // Save the sidelen, and key
        this.sidelen = sidelen;
        this.keyNum = keyNum;
        this.keyText = constants.keyText[keyNum];
        this.keySymbol = constants.keySymbols[keyNum];
        this.textColor = textColor;
        this.keyColor = keyColor;

        this.buildBaseTexture(scene);
        this.setTexture(this.keyText);

        //turn on mouse clicks and keydowns
        this.enableInput(scene);
    }

    changeBuilding(building) {
        this.building = building;
        if(building != null) {
            this.enableCollisions();
        } else {
            this.disableCollisions();
        }
        this.rebuildTexture();
    }

    // Called by pressing key or clicking the button
    activation() {
        if(this.building != null && !this.scene.kingdomManager.isBuilding) {
            this.building.activation(this);
        } else {
            this.scene.kingdomManager.activation(this)
        }
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
        // clicks
        this.setInteractive().on('pointerdown', () => this.activation() );
        // keydowns
        scene.input.keyboard.on('keydown', event =>
        {
            if(!constants.keySymbols[constants.keyText.indexOf('R')].includes(event.keyCode) &&
               !constants.keySymbols[constants.keyText.indexOf('SHFT')].includes(event.keyCode)) {
                event.preventDefault(); //Shift and R are used to refresh (with cntl), kinda evil to block that for now
            }
            if(this.keySymbol.includes(event.keyCode)) {
                this.activation();
            }
        });
    }

    disableCollisions() {
        //TODO
        //this.scene.physics.arcade.disableBody(this); ??
    }

    buildBaseTexture(scene) {
        //build baseTexture
        let text = scene.add.text(0,0,this.keyText, {fontFamily: '"Bungee"', fontSize: '20px', color: this.textColor }) //TODO make color changable
        if(scene.textures.exists('base' + this.keyText)) {
            this.baseTexture = scene.textures.get('base' + this.keyText);
        } else {
            this.baseTexture = scene.textures.addDynamicTexture('base' + this.keyText, this.sidelen, this.sidelen);
        }
        let scale = this.sidelen / scene.textures.get(this.keyColor).getSourceImage().width;
        this.baseTexture.clear();
        this.baseTexture.stamp(this.keyColor, null, 0, 0, { scale: scale, originX: 0, originY: 0}); //TODO make color changable
        this.baseTexture.draw(text, 20, 20);
        text.destroy();

        // create the dynamicTexture
        if(scene.textures.exists(this.keyText)) {
            this.dynamic_texture = scene.textures.get(this.keyText);
        } else {
            this.dynamic_texture = scene.textures.addDynamicTexture(this.keyText, this.sidelen, this.sidelen);
        }
        // rebuild the dynamicTexture for first time
        this.rebuildTexture();
    }

    rebuildTexture() {
        this.dynamic_texture.clear();
        this.dynamic_texture.stamp('base' + this.keyText, null, 0, 0, { originX: 0, originY: 0});
        if(this.percent > -1) {
            // green bar TODO
        }
        if(this.health > -1) {

        }
        if(this.building != null) {

        }
    }
}
