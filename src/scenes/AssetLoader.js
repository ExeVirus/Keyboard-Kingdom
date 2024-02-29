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

        // Buildings
        this.load.image('Castle', 'assets/buildings/Castle4.png');
        this.load.image('Blacksmith', 'assets/buildings/Blacksmith.png');
        this.load.image('Fire', 'assets/buildings/fire-sm.png');

        // Enemies
        this.load.image('Mouse', 'assets/enemies/Mouse.png');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
