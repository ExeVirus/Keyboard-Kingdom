class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('menu');
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
        this.load.image('keyboard', 'keyboard.png');
    }

    create ()
    {
        let centerX = this.scale.parentSize.width / 2 
        let centerY = this.scale.parentSize.height / 2
        const start = this.add.text(centerX, centerY, 'Press <ENTER> to play', {
            fontFamily: '"Bungee"',
            fontSize: '80px',
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-ENTER', function () {
            this.scene.start('Main', { id: 0 });
        }, this);

        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown ()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
}