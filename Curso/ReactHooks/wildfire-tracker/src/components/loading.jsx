import React from "react";
import Sketch from "react-p5";

function Loading() {
    let bubble;
    let bubble2;
    let bubble3;
    let bubble4;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth,window.innerHeight).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES);
        bubble = new bubbles(40);
        bubble2 = new bubbles(40);
        bubble3 = new bubbles(40);
        bubble4 = new bubbles(40);
    };
 
    const draw = (p5) => {
    /*translate usado para el uso de movimiento rrueda y para el movimiento seno */
    p5.translate(p5.width/2, p5.height/2);
    p5.background(51)
    bubble4.dibujo('rgb(52,168,83)', p5)
    bubble4.movimientoSeno(2.5, p5)
    bubble3.dibujo('rgb(251,188,5)', p5)
    bubble3.movimientoSeno(3, p5)
    bubble2.dibujo('rgb(66,133,244)', p5)
    bubble2.movimientoSeno(3.5, p5)
    bubble.dibujo('rgb(234,67,53)', p5)
    bubble.movimientoSeno(4, p5)
    console.log(bubble)
    
    };
    class bubbles  {
        constructor(radio)
        {
            this.radio = radio;
            this.posy=0;
            this.posx=0;
            this.velocidadX = 1;
            this.velocidadY = 1;
        }
    
        dibujo(color, p5) {
            p5.noStroke()
            p5.fill(color)
            p5.ellipse(this.posx, this.posy, this.radio)
        }
        movimientoSeno(velocidad, p5)
        {
            this.posx = this.posx+(velocidad*this.velocidadX);
            this.posy = Math.floor(100*p5.sin(this.posx));
            if(bubble.posx<-window.innerWidth/2 || bubble.posx > window.innerWidth/2 ){
                this.velocidadX *= -1;
                this.posx=bubble.posx;
                this.posy=bubble.posy;
            }
        }
    }
    return <Sketch setup={setup} draw={draw} />;
}

export default Loading;