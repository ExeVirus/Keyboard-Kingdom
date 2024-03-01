import { Enemy } from "../key_classes/Enemy.js"

export class Joystick extends Enemy
{
    constructor(scene, lane) {
        super(scene, lane, 120, 60);
        this.setTexture('Joystick');
        this.setDisplaySize(120,120);
    }
}
