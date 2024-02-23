import { constants } from '../key_classes/constants.js';
import { Scene } from 'phaser';
import { KeyButton } from '../key_classes/KeyButton.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
    }

    init(data)
    {
        this.keyColor = data.keyColor
        this.textColor = data.textColor
    }

    create ()
    {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 14; j++) {
                if (j < constants.rowLengths[i]) {
                    console.log([this, j*135+135/2, i*135+135/2, 135, constants.rowStartNum[i] + j, this.keyColor, this.textColor])
                    let button = new KeyButton(this, j*135+135/2, i*135+135/2, 135, constants.rowStartNum[i] + j, this.keyColor, this.textColor);
                    this.add.existing(button);
                }
            }
        }

        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown ()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
}
