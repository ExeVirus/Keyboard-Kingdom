// ----------------------------------------------------------------------------
// Class: Laser
// Desc: kills itself after a timeToLive
// ----------------------------------------------------------------------------

export class Laser extends Phaser.GameObjects.Sprite
{
    constructor(scene, kingdomManager, x, y, timeToLive) {
        super(scene, x, y, 'Laser');
        scene.add.existing(this);
        this.creationTime = scene.sys.game.getTime();
        this.timeToLive = timeToLive;
        this.kingdomManager = kingdomManager;
    }

    update(time, delta)
    {
        if(this.creationTime + this.timeToLive <= time) {
            console.log("die");
            this.kingdomManager.laser = null;
            this.destroy();
        }
    }
}
