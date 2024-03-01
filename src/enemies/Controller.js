import { Enemy } from "../key_classes/Enemy.js"

export class Controller extends Enemy
{
    constructor(scene, lane) {
        super(scene, lane, 60, 180);
        this.setTexture('Controller');
        this.setDisplaySize(120,120);
    }
}
