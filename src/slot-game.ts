import { SpinButton } from './spin-button';
import { ReelsContainer } from './reels-container';

export class SlotGame {
    public mainContainer: PIXI.Container;

    constructor() {
        this.mainContainer = new PIXI.Container();
    }

    public StartGame(): void {
        const reelsContainer:ReelsContainer = new ReelsContainer();
        reelsContainer.createContainer()
        
        this.mainContainer.addChild(reelsContainer.container);
        reelsContainer.container.position.set(120, 180);

        const spinButton:SpinButton = new SpinButton();
        // locate the spin button.
        this.mainContainer.addChild(spinButton);
        spinButton.position.set(265, 280); 
        // pointertap instead of click: for mobile and desktop
        spinButton.on('pointertap', () => { 
            spinButton.interactive = false; // deactivate spin button
            reelsContainer.spin(this.generateSpinVal());
            window.setTimeout(() => { spinButton.interactive = true; }, 4000); // activate spin button after 4 seconds
        });
        spinButton.interactive = true;
        spinButton.buttonMode = true;
    }

    private generateSpinVal(): number[] {
        // generate array of 5 numbers eq: [0, 2, 0, 1, 1]
        const newVal: number[] = [];
        for (let i: number = 0; i < 5; i++) {
            var rnd = Math.floor(Math.random() * 3);  // random number between  0 - 3
            newVal.push(rnd);
        }

        return newVal;
    }
}
