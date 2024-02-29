import { constants } from '../key_classes/constants.js';
import { Scene } from 'phaser';
import { KeyButton } from '../key_classes/KeyButton.js';
import { KingdomManager } from '../key_classes/KingdomManager.js';
import { Castle } from '../buildings/Castle.js';
import { RoundManager } from '../key_classes/RoundManager.js';

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
        this.kingdomManager = new KingdomManager(this, 1920/2, 910, 1600, 230);
        this.roundManager = new RoundManager(this, 160, 200, 1600, 40);
        this.keyButtons = []
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 14; j++) {
                if (j < constants.rowLengths[i]) {
                    let button = new KeyButton(this, j*120+68, i*120+120/2+280, 120, constants.rowStartNum[i] + j, this.keyColor, this.textColor);
                    this.add.existing(button);
                    this.keyButtons.push(button);
                }
            }
        }

        this.Castle = new Castle(this.keyButtons[0], 
                                 this.keyButtons[constants.rowStartNum[1]],
                                 this.keyButtons[constants.rowStartNum[2]],
                                 this.keyButtons[constants.rowStartNum[3]],
                                 55,280+240-8,this, this.kingdomManager);

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
        this.roundManager.update(time,delta);
    }
}
