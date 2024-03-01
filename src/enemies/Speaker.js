import { Enemy } from "../key_classes/Enemy.js"

export class Speaker extends Enemy
{
    constructor(scene, lane) {
        super(scene, lane, 20, 720);
        this.setTexture('Speaker');
        this.setDisplaySize(120,120);
    }
}
