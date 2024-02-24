import { constants } from '../key_classes/constants.js';
import { Scene } from 'phaser';
import { KeyButton } from '../key_classes/KeyButton.js';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    preload (){}

    create ()
    {
        let scene = this.scene
        this.kingdomManager = {
            activation: function(keyButton) {
                scene.start('Game', { textColor: keyButton.textColor, keyColor: keyButton.keyColor });
            }
        }

        this.events.on('shutdown', this.shutdown, this);

        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 14; j++) {
                if (j < constants.rowLengths[i]) {
                    let button = new KeyButton(this, j*120+120/2, i*120+120/2+280, 120, constants.rowStartNum[i] + j, constants.keyColors[i], constants.textColors[j]);
                    this.add.existing(button);
                }
            }
        }
    }

    shutdown ()
    {
        this.input.keyboard.shutdown();
    }
}
