import { ProgressBar } from './ProgressBar.js';
import { constants } from './constants.js';
// ----------------------------------------------------------------------------
//
// Class: KingdomManager
// Desc: Implements:
//     - tracking the buildings and their associated keynum
//     - dealing with KeyButton activations
//     - updating buildings and resources state from scene.update()
//     - dealing with collisions with buildings
//     - Handling the display and update of the bottom of the screen
//         - Current Resource Collected (number + bar graph)
//         - Current 
// ----------------------------------------------------------------------------

export class KingdomManager extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        this.buildingNum = 1;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.resource = 975;
        this.targetIdx = 0;
        this.target = constants.gameProgression[this.targetIdx].c;
        this.background = scene.add.nineslice(x, y, 'kBack', '', width, height, 25, 25, 25, 25);
        this.inset = scene.add.nineslice(x, y, 'kInset', '', width-24, height-24, 25, 25, 25, 25);
        this.resourceMeter = new ProgressBar(scene, 1920/2, 850, 1500, 26, 'meterYellow', 5, 0);
        this.resourceMeter.setPercent(this.resource/this.target);
        this.progressText = this.scene.add.bitmapText(1920/2-200, 860, 'sono', this.resource.toString() + ' / ' + this.target.toString()).setScale(0.5);
        this.updateList = [];
        this.enableInput();
    }

    enableInput()
    {
        this.scene.input.keyboard.on('keydown', event =>
        {
            if(constants.spacebar.includes(event.keyCode)) {
                this.tryBuild();
            }
        });
    }

    tryBuild()
    {
        if(this.resource >= this.target) {
            this.scene.kingdomManager.isBuilding = true;
            this.progressText.text = '--BUILDING--';
        }
    }

    activation (keyButton)
    {
        if(this.scene.kingdomManager.isBuilding && keyButton.building == null) {
            this.trySubtract(this.target)
            console.log(keyButton.keyText);
            new constants.gameProgression[this.targetIdx].b(keyButton, this.scene, this);
            this.targetIdx += 1;
            this.target = constants.gameProgression[this.targetIdx].c;
            this.progressText.text = this.resource.toString() + ' / ' + this.target.toString();
            this.scene.kingdomManager.isBuilding = false;
            this.addToUpdateList(keyButton);
        }
        if(keyButton.keyText == '⌫') {
            this.scene.scene.start('MainMenu');
        }
    }

    addToUpdateList(keyButton)
    {
        this.updateList.push(keyButton);
    }

    removeFromUpdateList(keyButton)
    {
        this.updateList = this.updateList.filter(item => item.keyText !== keyButton.keyText);
    }

    update(time,delta)
    {
        for(let i = 0; i < this.updateList.length; i++) {
            this.updateList[i].building.update(time,delta);
        }
    }

    addResource(amt)
    {
        this.resource += amt;
        this.resource = Math.max(this.resource, 0); // shouldn't go negative
        this.resourceMeter.setPercent(this.resource/this.target);
        this.progressText.text = this.resource.toString() + ' / ' + this.target.toString();
    }

    trySubtract(amt)
    {
        if(this.resource >= amt) {
            this.resource -= amt;
            this.resourceMeter.setPercent(this.resource/this.target);
            this.progressText.text = this.resource.toString() + ' / ' + this.target.toString();
            return true;
        }
        return false;
    }
}
