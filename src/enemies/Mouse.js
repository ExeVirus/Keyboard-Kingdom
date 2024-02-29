import { Enemy } from "../key_classes/Enemy.js"

export class Mouse extends Enemy
{
    constructor(scene, lane) {
        super(scene, lane, 30, 10);
        this.setTexture('Mouse');
    }
}
