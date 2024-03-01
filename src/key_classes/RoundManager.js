import { constants } from './constants.js';
import { AllEnemies } from '../enemies/AllEnemies.js';
import { KingdomManager } from './KingdomManager.js';

// ----------------------------------------------------------------------------
//
// Class: RoundManager
// Desc: Implements:
//     - tracking current round
//     - tracking current spot within the round
//     - creating enemies at the right time within the round
//     - displaying the current round time, time remaining, when enemies will drop, etc.
//     - all implemented with bitmap textures
// ----------------------------------------------------------------------------

export class RoundManager extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height) {
        super(scene, x+width/2, y+height/2, '');
        this.width = width;
        this.height = height;
        this.currentRoundNum = 1;
        this.currentRound = constants.Rounds[this.currentRoundNum-1];
        this.roundStart = this.scene.sys.game.getTime();
        this.enemyNum = 0;
        this.nextEnemySpawn = this.getEnemySpawnTime();
        this.buildTexture();
        this.setTexture(this.constructor.name);
        this.scene.add.existing(this);
        this.RoundText = this.scene.add.bitmapText(this.x-width/2, this.y-height/2-36, 'sono', this.getRoundText()).setScale(0.5);
        this.RoundText.setTint(0x66FF99);
    }

    buildTexture()
    {
        if(this.scene.textures.exists(this.constructor.name)) {
            this.dynamicTexture = this.scene.textures.get(this.constructor.name);
        } else {
            this.dynamicTexture = this.scene.textures.addDynamicTexture(this.constructor.name, this.width, this.height);
        }
        this.rebuildTexture();
    }

    rebuildTexture()
    {
        this.dynamicTexture.clear();
        //add the enemy spawn spots
        
        for(let i = 0; i < this.currentRound.enemies.length;i++) {
            let xpos = this.currentRound.enemies[i].timePoint / this.currentRound.totalTime;
            this.dynamicTexture.fill(0xDD0000, 1, (this.width * xpos)-3, 0, 6, 24); //enemy spawn spots
        }

        this.updateRoundPosition()
    }

    updateRoundPosition()
    {
        this.dynamicTexture.fill(0x333333, 1, 0, 12, this.width, this.height-24); //back
        this.dynamicTexture.fill(0xE8F556, 1, this.width * this.getCurrentPoint(), 12, 6, this.height-24) // pointer
    }

    getCurrentPoint()
    {
        return (this.scene.sys.game.getTime() - this.roundStart) / this.currentRound.totalTime;
    }

    getRoundText() { return 'Current Round: ' + this.currentRoundNum.toString(); }

    getEnemy()
    {
        return this.currentRound.enemies[this.enemyNum]
    }

    getEnemySpawnTime()
    {
        if(this.currentRound.enemies.length > this.enemyNum) {
            return this.roundStart + this.getEnemy().timePoint;
        } else {
            return this.roundStart + this.currentRound.totalTime + 1000;// won't ever hit this
        }
    }

    spawnEnemies()
    {
        for(let i = 0; i < this.getEnemy().howMany;i++) {
            let lane = Math.floor(Math.random() * 4) + 1;
            let enemy = new AllEnemies[this.getEnemy().enemy](this.scene, lane);
            if('kingdomManager' in this.scene) {
                this.scene.kingdomManager.addEnemy(enemy);
            }
            this.scene.physics.add.collider(enemy, this.scene.keyButtons, (enemy, keyButton) => {
                keyButton.onCollide(enemy);
            })
        }
        this.enemyNum++;
    }

    update(time, delta) 
    {
        while(time >= this.nextEnemySpawn) {
            this.spawnEnemies();
            this.nextEnemySpawn = this.getEnemySpawnTime();
        }
        if(time >= this.roundStart + this.currentRound.totalTime) {
            this.roundStart = time;
            this.currentRoundNum = Math.min(this.currentRoundNum + 1, 5); // only 5 rounds, last one repeats
            this.RoundText.text = this.getRoundText();
            this.currentRound = constants.Rounds[this.currentRoundNum-1];
            this.enemyNum = 0;
            this.nextEnemySpawn = this.getEnemySpawnTime();
            this.rebuildTexture();
        }

        this.updateRoundPosition();
    }
}
