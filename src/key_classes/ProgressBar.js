// ----------------------------------------------------------------------------
//
// Class: ProgressBar
// Desc: Implements:
//     - a Progress Bar
// minWidth is the pixels neded on left and right of the 9 slice
// ----------------------------------------------------------------------------

export class ProgressBar extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, width, height, meterTexture, minWidth, fillPercent) {
        super(scene, x, y);
        this.x = x;
        this.width = width;
        this.minWidth = minWidth;
        this.meterBack = scene.add.nineslice(x, y, 'meterBack', '', width, height, this.minWidth, this.minWidth);
        this.meterYellow = scene.add.nineslice(x, y, meterTexture, '', width, height-2, this.minWidth, this.minWidth);
        this.setPercent(fillPercent);
    }

    setPercent(fillPercent)
    {
        fillPercent = Math.max(Math.min(fillPercent, 1),0); //clamp to 0,1
        this.meterYellow.width = Math.max(this.width * fillPercent, this.minWidth*2); //minWdith = 18
        this.meterYellow.x = this.x - this.width/2 + Math.max(this.width/2*fillPercent, this.minWidth);
        console.log(fillPercent, Math.max(this.width * fillPercent, this.minWidth*2), this.x - this.width/2 + Math.max(this.width/2*fillPercent, this.minWidth))
    }
}
