import { ProgressBar } from './ProgressBar.js';
import { constants } from './constants.js';
import { Laser } from './Laser.js';
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
        this.target = this.getTarget().c;
        this.background = scene.add.nineslice(x, y, 'kBack', '', width, height, 25, 25, 25, 25);
        this.inset = scene.add.nineslice(x, y, 'kInset', '', width-24, height-24, 25, 25, 25, 25);
        this.resourceMeter = new ProgressBar(scene, 1920/2, 850, 1500, 26, 'meterYellow', 5, 0);
        this.resourceMeter.setPercent(this.resource/this.target);
        this.progressText = this.scene.add.bitmapText(1920/2-200, 860, 'sono', this.getProgressText()).setScale(0.5);
        this.progressText.setTint(0x000000);
        this.laser = null;
        this.updateList = [];
        this.enemyList = [];
        this.reAddedTargets = [];
        this.enableInput();
    }

    getProgressText()
    {
        return 'Next Building: ' + this.getTarget().b.name + ' [' + this.resource.toFixed(0) + ' / ' + this.target.toFixed(0) + ']';
    }

    enableInput()
    {
        this.scene.input.keyboard.on('keydown', event => {
            if(constants.spacebar.includes(event.keyCode)) {
                this.tryBuild();
            }
        });
    }

    tryBuild()
    {
        if(this.resource >= this.target) {
            this.scene.kingdomManager.isBuilding = true;
            this.progressText.text = '--BUILDING ' + this.getTarget().b.name + '--';
        }
    }

    activation (keyButton)
    {
        if(this.scene.kingdomManager.isBuilding && keyButton.building == null) {
            this.trySubtract(this.target)
            let con = this.getTarget().b;
            if(this.targetIdx == -1) {
                new con(keyButton, this.scene, this, this.reAddedTargets.slice(-1)[0].idx);
                this.reAddedTargets.pop();
                if(this.reAddedTargets.length <= 0) {
                    this.targetIdx = this.nextIdx;
                }
            } else {
                new con(keyButton, this.scene, this, this.targetIdx);
                this.targetIdx += 1;
            }
            this.target = this.getTarget().c;
            this.progressText.text = this.getProgressText();
            this.scene.kingdomManager.isBuilding = false;
            this.addToUpdateList(keyButton);
        } else if(this.laser == null && this.trySubtract(70)) {
            this.fireLaserAtEnemiesNear(keyButton);
        }
    }

    addToUpdateList(keyButton)
    {
        this.updateList.push(keyButton);
    }

    getTarget() 
    { 
        if(this.targetIdx >= 0) {
            return constants.gameProgression[this.targetIdx];
        } else {
            return this.reAddedTargets.slice(-1)[0].t;
        }
    }

    reAddTarget(idx)
    {
        if(idx != undefined) {
            if(this.targetIdx >= 0) {
                this.nextIdx = this.targetIdx;
            }
            this.targetIdx = -1;
            this.reAddedTargets.push({t: constants.gameProgression[idx], idx: idx});
            this.target = this.getTarget().c;
            this.progressText.text = this.getProgressText();
        }
    }

    removeFromUpdateList(keyButton)
    {
        this.updateList = this.updateList.filter(item => item.keyText !== keyButton.keyText);
    }

    addEnemy(enemy)
    {
        this.enemyList.push(enemy);
    }

    removeEnemy(enemy)
    {
        this.enemyList = this.enemyList.filter(_enemy => _enemy != enemy);
    }

    fireLaserAtEnemiesNear(keyButton)
    {
        for(let i = 0; i < this.enemyList.length;i++){
            let enemy = this.enemyList[i];
            const distX = Math.abs(enemy.x - keyButton.x);
            const distY = Math.abs(enemy.y - keyButton.y);
            if(distX < 110 && distY < 110) {
                enemy.curHealth -= 60;
                if(enemy.curHealth / enemy.startHealth < 0.03) {
                    enemy.destroy();
                } else {
                    enemy.updateHealthBar();
                }
            }
        }
        this.laser = new Laser(this.scene, this, keyButton.x, keyButton.y, 200);
    }

    update(time,delta)
    {
        if(this.laser != null) {
            this.laser.update(time,delta);
        }
        for(let i = 0; i < this.updateList.length; i++) {
            this.updateList[i].building.update(time,delta);
        }
    }

    addResource(amt)
    {
        this.resource += amt;
        this.resource = Math.max(this.resource, 0); // shouldn't go negative
        this.resourceMeter.setPercent(this.resource/this.target);
        if(!this.scene.kingdomManager.isBuilding) {
            this.progressText.text = this.getProgressText();
        }
    }

    trySubtract(amt)
    {
        if(this.resource >= amt) {
            this.resource -= amt;
            this.resourceMeter.setPercent(this.resource/this.target);
            if(!this.scene.kingdomManager.isBuilding) {
                this.progressText.text = this.getProgressText();
            }
            return true;
        }
        return false;
    }
}
