import { MainMenu } from './scenes/MainMenu';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 980,
    parent: 'game-container',
    scene: [ MainMenu ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: true
    },
    backgroundColor: 0x000000, // Black background color
    physics: {
        default: 'arcade'
    }
};

export default new Phaser.Game(config);
