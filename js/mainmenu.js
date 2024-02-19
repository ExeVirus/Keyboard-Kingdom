class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('menu');
        this.keySize = 270;
    }

    preload ()
    {
        //----------------------- Scripts -----------------------
        this.load.scripts('game', [
            'js/kingdomManager.js',
            'js/tile.js',
            'js/enemy.js',
            'js/game.js'
        ]);
        
        //------------------------ Fonts ------------------------
        this.load.addFile(new WebFontFile(this.load, 'Bungee'))

        //------------------------ Music ------------------------
        
        //-------------------- Sound Effects --------------------
        
        //----------------------- Textures ----------------------
        this.loadKeyImages();
        //this.createKeyboardTexture('light', "#010101");

        //------------ Keyboard Sprite Sheets https://www.patreon.com/posts/phaser-dev-log-73259650
    }

    create ()
    {
        // const enter = 
        let centerX = this.scale.parentSize.width / 2 
        let centerY = this.scale.parentSize.height / 2+400
        const start = this.add.text(centerX, centerY, 'Press <ENTER> to play', {
            fontFamily: '"Bungee"',
            fontSize: '80px',
        }).setOrigin(0.5);

        let keyColor = 'blue';
        let textColor = '#F1F1F1';
        this.createKeyboardTextures(keyColor, textColor);
        let keyboardString = 'keyboard_' + keyColor + '_'
        for(let i = 0; i < 14; i++) {
            this.add.sprite(i*this.keySize/2 + this.keySize/4, this.keySize/2, keyboardString + i).setScale(0.5);
        }
        for(let i = 0; i < 14; i++) {
            this.add.sprite(i*this.keySize/2 + this.keySize/4, this.keySize, keyboardString + (i+14)).setScale(0.5);
        }
        for(let i = 0; i < 13; i++) {
            this.add.sprite(i*this.keySize/2 + this.keySize/4, this.keySize*3/2, keyboardString + (i+28)).setScale(0.5);
        }
        for(let i = 0; i < 12; i++) {
            this.add.sprite(i*this.keySize/2 + this.keySize/4, this.keySize*2, keyboardString + (i+41)).setScale(0.5);
        }

        this.input.keyboard.on('keydown-ENTER', function () {
            this.scene.start('Game', { id: 0 });
        }, this);

        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown ()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

    loadKeyImages() {
        this.key_dark = this.load.image('key_dark', 'assets/key_dark.png');
        this.key_blue = this.load.image('key_blue', 'assets/key_blue.png');
        this.key_light = this.load.image('key_light', 'assets/key_light.png');
    }

    createKeyTextures(keyColor) {
        const fontStyle = {fontFamily: '"Arial"', fontSize: '40px', color: keyColor };
        this.keys = [
            this.add.text(0,0,'~', fontStyle),
            this.add.text(0,0,'1', fontStyle),
            this.add.text(0,0,'2', fontStyle),
            this.add.text(0,0,'3', fontStyle),
            this.add.text(0,0,'4', fontStyle),
            this.add.text(0,0,'5', fontStyle),
            this.add.text(0,0,'6', fontStyle),
            this.add.text(0,0,'7', fontStyle),
            this.add.text(0,0,'8', fontStyle),
            this.add.text(0,0,'9', fontStyle),
            this.add.text(0,0,'0', fontStyle),
            this.add.text(0,0,'-', fontStyle),
            this.add.text(0,0,'=', fontStyle),
            this.add.text(0,0,'⌫', fontStyle),

            this.add.text(0,0,'⇥', fontStyle),
            this.add.text(0,0,'Q', fontStyle),
            this.add.text(0,0,'W', fontStyle),
            this.add.text(0,0,'E', fontStyle),
            this.add.text(0,0,'R', fontStyle),
            this.add.text(0,0,'T', fontStyle),
            this.add.text(0,0,'Y', fontStyle),
            this.add.text(0,0,'U', fontStyle),
            this.add.text(0,0,'I', fontStyle),
            this.add.text(0,0,'O', fontStyle),
            this.add.text(0,0,'P', fontStyle),
            this.add.text(0,0,'[', fontStyle),
            this.add.text(0,0,']', fontStyle),
            this.add.text(0,0,'\\', fontStyle),

            this.add.text(0,0,'⇪', fontStyle),
            this.add.text(0,0,'A', fontStyle),
            this.add.text(0,0,'S', fontStyle),
            this.add.text(0,0,'D', fontStyle),
            this.add.text(0,0,'F', fontStyle),
            this.add.text(0,0,'G', fontStyle),
            this.add.text(0,0,'H', fontStyle),
            this.add.text(0,0,'J', fontStyle),
            this.add.text(0,0,'K', fontStyle),
            this.add.text(0,0,'L', fontStyle),
            this.add.text(0,0,';', fontStyle),
            this.add.text(0,0,'\'', fontStyle),
            this.add.text(0,0,'↵', fontStyle),

            this.add.text(0,0,'⇧', fontStyle),
            this.add.text(0,0,'Z', fontStyle),
            this.add.text(0,0,'X', fontStyle),
            this.add.text(0,0,'C', fontStyle),
            this.add.text(0,0,'V', fontStyle),
            this.add.text(0,0,'B', fontStyle),
            this.add.text(0,0,'N', fontStyle),
            this.add.text(0,0,'M', fontStyle),
            this.add.text(0,0,',', fontStyle),
            this.add.text(0,0,'.', fontStyle),
            this.add.text(0,0,'/', fontStyle),
            this.add.text(0,0,'⇧', fontStyle),
        ];
    }

    destroyKeyTextures() {
        for (let i = 0; i < this.keys.length; i++) {
            this.keys[i].destroy();
        }
    }

    createKeyboardTextures (keyboard_color, keyColor)
    {
        this.createKeyTextures(keyColor);
        let size = this.keySize

        for (let i = 0; i < this.keys.length; i++) {
            const keyboard = this.textures.addDynamicTexture('keyboard_' + keyboard_color + '_' + i, size, size);
            keyboard.stamp('key_' + keyboard_color, null, size/2, size/2);
            keyboard.draw(this.keys[i], 50, 30);
        }

        this.destroyKeyTextures();
    }
}