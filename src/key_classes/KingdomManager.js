import { ProgressBar } from './ProgressBar.js'
// ----------------------------------------------------------------------------
//
// Class: KindomManager
// Desc: Implements:
//     - tracking the buildings and their associated keynum
//     - dealing with KeyButton activations
//     - updating buildings and resources state from scene.update()
//     - dealing with collisions with buildings
//     - Handling the display and update of the bottom of the screen
//         - Current Resource Collected (number + bar graph)
//         - Current 
// ----------------------------------------------------------------------------

export class KindomManager extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.background = scene.add.nineslice(x, y, 'kBack', '', width, height, 25, 25, 25, 25);
        this.inset = scene.add.nineslice(x, y, 'kInset', '', width-24, height-24, 25, 25, 25, 25);
        this.resourceMeter = new ProgressBar(scene, 1920/2, 850, 1500, 26, 'meterYellow', 5, 0);
        //this.minWidth = 9; // nineslice left and right  = 18 pixels
        //this.meterBack = scene.add.nineslice(x, y, 'meterBack', '', width-80, 26, this.minWidth, this.minWidth);
        //this.meterYellow = scene.add.nineslice(x-width/2+40 + this.minWidth, y, 'meterYellow', '', this.minWidth*2, 24, this.minWidth, this.minWidth);
        this.target = 1000;
        this.resource = 0;
    }

    activation (keyButton) {
        if(keyButton.keyText == '⌫') {
            this.scene.scene.start('MainMenu');
        } else {
            this.addResource(20);
        }
    }

    update(time,delta)
    {
    }

    addResource(amt)
    {
        this.resource += amt;
        this.resourceMeter.setPercent(this.resource/this.target);
    }
}
