import { Enemy } from "../key_classes/Enemy.js"

export class Microphone extends Enemy
{
    constructor(scene, lane) {
        super(scene, lane, 50, 120);
        this.setTexture('Microphone');
        this.setDisplaySize(120,120);
    }
}
