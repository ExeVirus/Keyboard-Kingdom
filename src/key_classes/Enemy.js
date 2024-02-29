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
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.setVelocityX(-speed);
        this.body.setSize(100, 100, false);
        this.body.setOffset(35,10);
        this.body.setBoundsRectangle();
        this.body.setImmovable(true);
    }
}
