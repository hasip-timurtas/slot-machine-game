import * as TWEEN from '@tweenjs/tween.js';

export class Reel {
    public container!: PIXI.Sprite;
    public reelIdx: number = 0;
    private val!: number;
    private oldVal!: number;
    private readonly reelTextures: string[] = ['A', 'J', 'K', 'Q', 'P','T'];
    private readonly units: PIXI.Sprite[] = [];
    private readonly scale: number = 0.5;
    private readonly reelRadius: number = 225;
    private readonly reelCenter: PIXI.Point = new PIXI.Point(0, 0);

    constructor() {
        this.init();
        this.arrangeUnits(0);
        this.value = this.getRandVal();
        this.changeFront();
    }

    public get width(): number {
        return this.units[2].width * this.scale;
    }

    public set value(v: number) {
        this.val = v;
    }

    public changeValue(v: number): void {
        this.oldVal = this.val;
        this.value = v;
        this.changeFrontWithSpin();
    }

    private getRandVal(): number {
        const rand: number[] = [0, 1, 2];

        return rand[Math.floor(Math.random() * rand.length)];
    }

    private init(): void {
        this.container = new PIXI.Sprite();
        this.reelTextures.forEach((img: string) => {
            const unit: PIXI.Sprite = new  PIXI.Sprite()
            unit.texture =  PIXI.Texture.from(`assets/${img}.png`);
            unit.pivot.set(unit.width * 0.5, unit.height * 0.5);
            this.units.push(unit);
            this.container.addChild(unit);
        });
        this.container.scale.set(this.scale);
        this.container.anchor.set(0.5, 0.5);
    }

    private arrangeUnits(spinnedDegree: number): void {
        const unitsNumber: number = this.units.length;
        const radianShare: number = (360 * (Math.PI / 180)) / unitsNumber;
        const spinnedRad: number = spinnedDegree * (Math.PI / 180);

        this.units.forEach((unit: PIXI.Sprite, idx: number) => {
            const rad: number = radianShare * idx + spinnedRad;
            const positionX: number = this.reelCenter.x + this.reelRadius * Math.sin(rad);
            const positionY: number = this.reelCenter.y + this.reelRadius * Math.cos(rad);
            unit.position.set(0, positionY);
            unit.visible = (positionX >= 0);
        });
    }

    private changeFront(): void {
        const degPerUnits: number[] = [90, -30, -150];
        this.arrangeUnits(degPerUnits[this.val]);
    }

    private changeFrontWithSpin(): void {
        const degPerUnits: number[] = [90, -30, -150];
        const unitsNumber: number = this.units.length;
        const defaultSpinDeg: number = -10 * 360;
        const targetSpinDeg: number = defaultSpinDeg + degPerUnits[this.val];
        const startDeg: number = degPerUnits[this.oldVal];
        const spinMotion: TWEEN.Tween = new TWEEN.Tween({theta: startDeg})
            .to({theta: targetSpinDeg}, 3000)
            .easing(TWEEN.Easing.Exponential.InOut)
            .delay(this.reelIdx * 200)
            .onUpdate((param: {theta: number}) => {
                this.arrangeUnits(param.theta);
            })
            .start();
    }
}
