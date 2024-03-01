// ----------------------------------------------------------------------------
// Class: VerticalHealthBar
// ----------------------------------------------------------------------------

export class VerticalHealthBar extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, maxHeight) {
        super(scene, x, y, 'White');
        this.width = width;
        this.maxHeight = maxHeight;
        this.setPercent(1);
        scene.add.existing(this);
    }

    setPercent(fillPercent)
    {
        this.setDisplaySize(this.width, this.maxHeight * fillPercent);
        if(fillPercent > 0.7) {
            this.setTint(0x00FF00); //green
        } else if(fillPercent > 0.35) {
            this.setTint(0xFFFF00); //yellow
        } else {
            this.setTint(0xFF0000); //red
        }
    }
}
