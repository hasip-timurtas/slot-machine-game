import * as PIXI from "pixi.js";
import TWEEN from '@tweenjs/tween.js';
window.PIXI = PIXI; // for pixi-layer to detect PIXI
import { SlotGame } from './slot-game';

export class App 
{
    private game:PIXI.Application;
    private divContainer:HTMLElement;
    private defaultWidth:number;
    private defaultHeight:number;

    constructor(){
        this.defaultWidth  = 600
        this.defaultHeight = 400
        window.onload = () => {
            this.createrenderer();
        };
    }

    private createrenderer(): void 
    {   
        this.divContainer = document.getElementById("container");

        this.game = new PIXI.Application({ transparent: true });

        this.loadImages()
        this.divContainer.appendChild(this.game.view);
        window.onresize = this.resize;
        this.resize();
        this.animate();
    }

    private loadImages = () =>{
        const imangeNames: string[] = ["A", "J", "K", "P", "Q", "T"];

        imangeNames.forEach(img=>{
            this.game.loader.add(`assets/${img}.png`)
        })

        this.game.loader.load(()=>{
            this.showSlot()
        })
        
    }


    private showSlot = ()=>{
        const game: SlotGame = new SlotGame();
        game.StartGame()
        this.game.stage.addChild(game.mainContainer);
    }

    private resize = () =>{
        const ratio = Math.min(window.innerWidth / this.defaultWidth , window.innerHeight / this.defaultHeight);
        const newWidth = Math.ceil(this.defaultWidth * ratio);
        const newHeight = Math.ceil(this.defaultHeight * ratio);
        this.game.renderer.resize(newWidth, newHeight);
        this.divContainer.style.width = `${newWidth}px`;
        this.divContainer.style.height = `${newHeight}px`;
        this.game.stage.scale.set(ratio, ratio);
    }

    private animate = (): void => {
        requestAnimationFrame(this.animate)
        TWEEN.update(); //Updates tweens
        this.game.renderer.render(this.game.stage);
    }
}

(function() {
    const game: App = new App();
})();
