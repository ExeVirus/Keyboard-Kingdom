class Main extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'Main' });
    }

    init (data)
    {
        this.imageID = data.id;
        this.imageFile = data.image;
    }

    preload ()
    {
        this.load.setBaseURL('/');
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
        this.load.image('key', 'keyboard.png');
    }

    create ()
    {
        let centerX = this.scale.parentSize.width / 2 
        let centerY = this.scale.parentSize.height / 2

        const particles = this.add.particles(centerX, centerY+100, 'key', {
            speed: 500,
            scale: { start: 0.7, end: 0.2 }
        });

        const logo = this.add.text(centerX, centerY-100, 'Keyboard Kingdom!', {
            fontFamily: '"Bungee"',
            fontSize: '80px',
        }).setOrigin(0.5);
    }
}