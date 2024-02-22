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

        //------------------------ Music ------------------------
        
        //-------------------- Sound Effects --------------------
        
        //----------------------- Textures ----------------------
        this.load.image('key_dark', 'assets/key_dark.png');
        this.load.image('key_blue', 'assets/key_blue.png');
        this.load.image('key_light', 'assets/key_light.png');
    }

    create ()
    {
        this.scene.start('MainMenu');
    }
}
