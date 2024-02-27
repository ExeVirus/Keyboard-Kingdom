// ----------------------------------------------------------------------------
//
// Class: VerticalHealthBar
// Desc: Implements:
//     - fillPercent
// ----------------------------------------------------------------------------

export class VerticalHealthBar extends Phaser.GameObjects.Sprite
{
    constructor(scene, name, x, y, width, maxHeight, fillPercent) {
        super(scene, x, y, 'green');
        if(scene.textures.exists(name)) {
            this.barTexture = scene.textures.get(name);
        } else {
            this.barTexture = scene.textures.addDynamicTexture(name, width, maxHeight);
        }
        this.scene = scene
        this.x = x;
        this.y = y;
        this.width = width;
        this.maxHeight = maxHeight;
        this.setPercent(fillPercent);
        this.setTexture(this.barTexture);
    }

    setPercent(fillPercent)
    {
        this.barTexture.clear()
        fillPercent = Math.max(Math.min(fillPercent, 1),0); //clamp to 0,1
        let color = '#00FF00';
        if(fillPercent < 0.25) {
            color = '#FF0000';
        } else if(fillPercent < 0.6) {
            color = '#FFFF00';
        }
        this.barTexture.fill(color, 1, 0, 0, this.width, this.maxHeight * fillPercent);
    }
}
