import { constants } from '../key_classes/constants.js';
import { Scene } from 'phaser';
import { KeyButton } from '../key_classes/KeyButton.js';
import { KindomManager } from '../key_classes/KingdomManager.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload () {}

    init(data)
    {
        this.keyColor = data.keyColor
        this.textColor = data.textColor
    }

    create ()
    {
        this.kingdomManager = new KindomManager(this, 1920/2, 910, 1600, 230);
        // console.log(this.kingdomManager);
        // this.add.existing(this.kingdomManager);
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 14; j++) {
                if (j < constants.rowLengths[i]) {
                    let button = new KeyButton(this, j*120+68, i*120+120/2+280, 120, constants.rowStartNum[i] + j, this.keyColor, this.textColor);
                    this.add.existing(button);
                }
            }
        }


        this.add.image(1920/2,80,'logo').setScale(0.6);
        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown ()
    {
        this.input.keyboard.shutdown();
    }

    update(time, delta)
    {
        this.kingdomManager.update(time,delta);
    }
}
