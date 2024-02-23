import { constants } from '../key_classes/constants.js';
import { Scene } from 'phaser';
import { KeyButton } from '../key_classes/KeyButton.js';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    preload ()
    {
    }

    create ()
    {
        // const start = this.add.text(0, 900, 'Press <ENTER> to play', {
        //     fontFamily: '"Bungee"',
        //     fontSize: '80px',
        // });

        // this.input.keyboard.on('keydown-ENTER', function () {
        //     this.scene.start('Game', { id: 0 });
        // }, this);
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
                    let button = new KeyButton(this, j*135+135/2, i*135+135/2, 135, constants.rowStartNum[i] + j, constants.keyColors[i], constants.textColors[j]);
                    this.add.existing(button);
                }
            }
        }
    }

    shutdown ()
    {
        this.events.emit('sceneShutDown');
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
}
