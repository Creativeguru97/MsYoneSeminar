

let canvas;

canvas = p => {


  p.setup = () => {
    p.createCanvas(960, 540);
  }

  p.draw = () => {
    p.background(100);
  }


}//Canvas end



let myp5 = new p5(canvas, 'canvas');
