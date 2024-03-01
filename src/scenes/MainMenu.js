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
        this.add.image(1920/2,80,'logo').setScale(0.6);
        this.test = this.add.bitmapText(0, 0, 'sono', this.testNum).setScale(0.5);

        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 14; j++) {
                if (j < constants.rowLengths[i]) {
                    let button = new KeyButton(this, j*135+135/2, i*135+135/2+220, 135, constants.rowStartNum[i] + j, constants.keyColors[i], constants.textColors[j]);
                    this.add.existing(button);
                }
            }
        }
        const music = this.sound.add('MainMenuMusic');
        music.play();
        music.loop = true;
    }

    update(time, delta)
    {
        this.testNum = 1000 / delta;
        this.test.text = this.testNum.toFixed(1);
    }

    shutdown ()
    {
        this.input.keyboard.shutdown();
    }
}
