import { VerticalHealthBar } from "../key_classes/VerticalHealthBar.js"
// ----------------------------------------------------------------------------
//
// Class: Enemy (Sprite)
// Desc: Implements:
//     - Spirte texture
//     - healthbar?
//     - collisions with keyButtons
//     - walkSpeed
// ----------------------------------------------------------------------------

export class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, lane, speed, startHealth) {
        super(scene, 1920, lane*120+120/2+160, '');
        this.speed = speed;
        this.startHealth = startHealth;
        this.curHealth = startHealth;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.setVelocityX(-speed);
        this.body.setSize(100, 100, false);
        this.body.setOffset(35,10);
        this.body.setBoundsRectangle();
        this.body.setImmovable(true);

        this.healthBar = new VerticalHealthBar(scene, this.x, this.y, 4, 100);
        scene.physics.add.existing(this.healthBar);
        this.healthBar.body.setAllowGravity(false);
        this.healthBar.body.setVelocityX(-speed);
        this.healthBar.body.setImmovable(true);
    }

    updateHealthBar()
    {
        if(this.healthBar != null) {
            this.healthBar.setPercent(this.curHealth / this.startHealth);
        }
    }

    destroy()
    {
        if(this.healthBar != null) {
            this.healthBar.destroy();
        }
        if('scene' in this && 'kingdomManager' in this.scene) {
            this.scene.kingdomManager.removeEnemy(this);
        }
        super.destroy()
    }
}
