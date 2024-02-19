class Game extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'Game' });
    }

    init (data)
    {
        this.imageID = data.id;
        this.imageFile = data.image;
    }

    preload () {}

    create ()
    {
        let centerX = this.scale.parentSize.width / 2 
        let centerY = this.scale.parentSize.height / 2

        const particles = this.add.particles(centerX, centerY+100, 'keyboard', {
            speed: 500,
            scale: { start: 0.7, end: 0.2 }
        });

        const logo = this.add.text(centerX, centerY-100, 'Keyboard Kingdom!', {
            fontFamily: '"Bungee"',
            fontSize: '80px',
        }).setOrigin(0.5);
    }
}