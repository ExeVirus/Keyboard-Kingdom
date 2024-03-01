import { Enemy } from "../key_classes/Enemy.js"

export class Mouse extends Enemy
{
    constructor(scene, lane) {
        super(scene, lane, 80, 30);
        this.setTexture('Mouse');
        this.setDisplaySize(120,120);
    }
}
