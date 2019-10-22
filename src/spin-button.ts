
// we create an object as a button inherited from PIXI.Graphics
export class SpinButton extends PIXI.Graphics {
    private readonly baseSprite: PIXI.Graphics;

    constructor() {
        super();
        this.baseSprite = new PIXI.Graphics();
        this.baseSprite.clear();
        this.baseSprite.beginFill(0x111111, 0.6);
        this.baseSprite.arc(50, 40, 50, 0, Math.PI); // Half Circle: cx, cy, radius, startAngle, endAngle
        this.addChild(this.baseSprite);
        const text = new PIXI.Text('SPIN!', {
            fontFamily: 'Comic Sam',
            fill: 0xFFFFFF,
            fontSize: 20
        });
        text.anchor.set(0.5, 0.5);
        text.position.set(50, 60);
        this.addChild(text);
    }
}
