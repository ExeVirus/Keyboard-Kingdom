import { Scene } from 'phaser';
import { WebFontFile } from '../extensions/webFont.js';

export class AssetLoader extends Scene
{
    constructor ()
    {
        super('AssetLoader');
    }

    preload ()
    {
        //------------------------ Fonts ------------------------
        this.load.addFile(new WebFontFile(this.load, 'Bungee'))
        this.load.bitmapFont('sono', 'assets/sono.png', 'assets/sono.xml');

        //------------------------ Music ------------------------
        this.load.audio('GameMusic', 'assets/music.mp3');
        this.load.audio('MainMenuMusic', 'assets/music.mp3');
        
        //-------------------- Sound Effects --------------------
        
        //----------------------- Textures ----------------------
        this.load.image('key_dark', 'assets/key_dark.png');
        this.load.image('key_light', 'assets/key_light.png');
        this.load.image('key_red', 'assets/key_red.png');
        this.load.image('key_blue', 'assets/key_blue.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('kBack', 'assets/kmanager/kBack.png');
        this.load.image('kInset', 'assets/kmanager/kInset.png');
        this.load.image('meterBack', 'assets/kmanager/meterBack.png');
        this.load.image('meterYellow', 'assets/kmanager/meterYellow.png');
        this.load.image('White', 'assets/White.png');
        this.load.image('Laser', 'assets/Laser.png');

        // Buildings
        this.load.image('Castle', 'assets/buildings/Castle4.png');
        this.load.image('Blacksmith', 'assets/buildings/Blacksmith.png');
        this.load.image('Fire', 'assets/buildings/fire-sm.png');

        // Enemies
        this.load.image('Mouse', 'assets/enemies/Mouse.png');
        this.load.image('Microphone', 'assets/enemies/Microphone.png');
        this.load.image('Joystick', 'assets/enemies/Joystick.png');
        this.load.image('Controller', 'assets/enemies/Controller.png');
        this.load.image('Speaker', 'assets/enemies/Speaker.png');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
