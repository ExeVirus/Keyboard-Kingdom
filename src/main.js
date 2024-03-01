import { AssetLoader } from './scenes/AssetLoader';
import { MainMenu } from './scenes/MainMenu';
import { Game } from './scenes/Game';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    scene: [ AssetLoader, MainMenu, Game ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: true
    },
    backgroundColor: 0x000000, // Black background color
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0,y:0}
        }
    }
};

export default new Phaser.Game(config);
