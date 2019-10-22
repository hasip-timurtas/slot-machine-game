import * as TWEEN from '@tweenjs/tween.js';

export class Reel {
    public container!: PIXI.Sprite;
    public reelIdx: number = 0;
    private val: number;
    private oldVal!: number;
    private readonly reelTextures: string[] = ['A', 'J', 'K', 'Q', 'P','T'];
    private readonly cards: PIXI.Sprite[] = [];
    private readonly scale: number = 0.5;
    private readonly reelRadius: number = 190;
    private readonly reelCenter: PIXI.Point = new PIXI.Point(0, 0);

    constructor() {
        this.init();
        this.arrangeCards(0);
        this.value = this.getRandVal();
        this.changeFront();
    }

    public set value(v: number) {
        this.val = v;
    }

    public get width(): number {
        return this.cards[2].width * this.scale;
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
        // Create card sprites 
        this.container = new PIXI.Sprite();
        this.reelTextures.forEach((img: string) => {
            const card: PIXI.Sprite = new  PIXI.Sprite()
            card.texture =  PIXI.Texture.from(`assets/${img}.png`);
            card.pivot.set(card.width * 0.5, card.height * 0.5);
            card.height = 180
            this.cards.push(card);
            this.container.addChild(card);
        });
        this.container.scale.set(this.scale);
        this.container.anchor.set(0.5, 0.5);
    }

    private arrangeCards(spinnedDegree: number): void {
        const unitsNumber: number = this.cards.length;
        const radianShare: number = (360 * (Math.PI / 180)) / unitsNumber;
        const spinnedRad: number = spinnedDegree * (Math.PI / 180);

        // arrange each card position
        this.cards.forEach((unit: PIXI.Sprite, index: number) => {
            const rad: number = radianShare * index + spinnedRad;
            const positionX: number = this.reelCenter.x + this.reelRadius * Math.sin(rad);
            const positionY: number = this.reelCenter.y + this.reelRadius * Math.cos(rad);
            unit.position.set(0, positionY);
            unit.visible = (positionX >= 0);
        });
    }

    private changeFront(): void {
        const degPerUnits: number[] = [90, -30, -150];
        this.arrangeCards(degPerUnits[this.val]);
    }

    private changeFrontWithSpin(): void {
        const degPerUnits: number[] = [90, -30, -150];
        const defaultSpinDeg: number = -10 * 360;
        const targetSpinDeg: number = defaultSpinDeg + degPerUnits[this.val];
        const startDeg: number = degPerUnits[this.oldVal];
        const spinMotion: TWEEN.Tween = new TWEEN.Tween({theta: startDeg})
            .to({theta: targetSpinDeg}, 3000)
            .delay(this.reelIdx * 200)
            .onUpdate((param: {theta: number}) => {
                this.arrangeCards(param.theta);
            })
            .start();
    }
}
