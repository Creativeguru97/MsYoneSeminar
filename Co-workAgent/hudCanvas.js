//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas0;
let hudCanvas;

// let expressions;
let button;
let microphone;
let isListening = false;

let emoSeqGraphTop = 575;
let emoSeqGraphBottom = emoSeqGraphTop + 120;
let textYSpace = 16;


//----- HUD canvas -----
canvas0 = p => { //let canvas0 = function(p){...
  p.setup = () => {
    p.createDiv();
    hudCanvas = p.createCanvas(640, 360);
    hudCanvas.id("hudCanvas");

    p.colorMode(p.HSB, 360, 100, 100, 100);//(Mode, Hue, Saturation, Brightness, Alpha)
  }

  p.draw = () => {
    // p.blendMode(p.ADD);

    p.clear();
    p.emotionalStatesHUD(25, 250);

    p.ellipse(faceCenter[0], faceCenter[1], 20, 20);
  }

  p.emotionalStatesHUD = (x, y) => {
    p.noStroke();
    p.fill(200, 53, 100);
    // p.fill(255);
    p.textFont('Helvetica Neue');
    p.textSize(14);
    if(expressions != undefined){
      p.text("neutral:       "+p.nf(neutral*100, 2, 2)+"%", x, y);
      p.text("happiness: "+p.nf(happy*100, 2, 2)+"%", x, y+textYSpace);
      p.text("anger:        "+p.nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
      p.text("sad:            "+p.nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
      p.text("disgusted: "+p.nf(disgusted*100, 2, 2)+"%", x, y+textYSpace*4);
      p.text("surprised:  "+p.nf(surprised*100, 2, 2)+"%", x, y+textYSpace*5);
      p.text("fear:           "+p.nf(fearful*100, 2, 2)+"%", x, y+textYSpace*6);

    }else{
      p.text("neutral: ", x, y);
      p.text("happiness: ", x, y+textYSpace);
      p.text("anger: ", x, y+textYSpace*2);
      p.text("sad: ", x, y+textYSpace*3);
      p.text("disgusted: ", x, y+textYSpace*4);
      p.text("surprised: ", x, y+textYSpace*5);
      p.text("fear: ", x, y+textYSpace*6);
    }
  }

}

let myp52 = new p5(canvas0);
