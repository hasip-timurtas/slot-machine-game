import { Reel } from './Reel';

export class ReelsContainer {
    public container!: PIXI.Container;
    private readonly reels: Reel[] = [];

    public spin(values: number[]): void {
        values.forEach((v: number, idx: number) => {
            this.reels[idx].changeValue(v);
        });
    }

    public createContainer(): void {
        this.container = new PIXI.Container();
        let reelX: number = 0;
        for (let i: number = 0; i < 5; i++) {  
            const reel: Reel = new Reel();
            this.reels.push(reel);
            this.container.addChild(reel.container);
            reel.container.anchor.set(0.5, 0.5);
            reel.container.position.set(reelX, 0);
            reel.reelIdx = i;
            reelX += reel.width;
        }
    }
}
