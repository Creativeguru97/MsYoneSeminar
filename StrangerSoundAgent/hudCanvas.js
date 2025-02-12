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


//----- HUD canvas -----
canvas0 = p => { //let canvas0 = function(p){...
  p.setup = () => {
    p.createDiv();
    hudCanvas = p.createCanvas(1280, 720);
    hudCanvas.id("hudCanvas");

    microphone = new p5.AudioIn(p.print("Unknown error occured"));
    // microphone.start();
    button = p.createButton("microphone ON");
    button.id("button");
    button.mousePressed(p.togglePlaying);

    p.colorMode(p.HSB, 360, 100, 100, 100);//(Mode, Hue, Saturation, Brightness, Alpha)
  }

  p.togglePlaying = () => {
    if(isListening == false){
      microphone.start();
      button.html("microphone OFF");
      isListening = true;
    }else if(isListening == true){
      microphone.stop();
      button.html("microphone ON");
      isListening = false;
    }
  }

  p.draw = () => {
    // p.blendMode(p.ADD);

    p.clear();
    p.emotionalStatesHUD(25, 530, 50);
    p.micHUD(30, 60);
    p.posDisplacementHUD(25, 450);
  }

  p.emotionalStatesHUD = (x, y, hueVal) => {
    p.noStroke();
    p.fill(200, 53, 100);
    // p.fill(255);
    p.textFont('Helvetica Neue');
    p.textSize(14);
    if(expressions != undefined){
      p.text("User current happy level: "+p.nf(happy*100, 2, 2)+"%", x, y);
      p.text("Average : "+p.nf(myp52.emotionAvg*100, 2, 2)+"%", x, y+16);
      // p.text("Average : "+myp52.emotionAvg, x, y+16);
    }else{
      p.text("User current happy level: ", x, y);
      p.text("Average : ", x, y+16);
    }

    // Display stored and convolutioned by function visually
    for(let i = 0; i < myp52.convolutedEmotionCopy.length/10; i++){
      myp52.emotionalSequencePointCopy[i] = myp52.convolutedEmotionCopy[i*10];
    }

    for(let i = 0; i < myp52.emotionalSequencePointCopy.length; i++){
      if(i < myp52.emotionalSequencePointCopy.length-1){
        let sYvalue = p.map(myp52.emotionalSequencePointCopy[i], 0, 1, 0, 100);
        let eYvalue = p.map(myp52.emotionalSequencePointCopy[i+1], 0, 1, 0, 100);

        let saturation = p.map(30+(i*12), 30, 390, 100, 0);
        p.stroke(hueVal, saturation, 100);
        // p.stroke(255, 255, 100);
        if(sYvalue == 0){
          p.strokeWeight(2);
        }else{
          p.strokeWeight(4);
        }
        p.point(30+(i*12), emoSeqGraphBottom-sYvalue);//Pointy version :)
        p.strokeWeight(2);
        p.line(30+(i*12), emoSeqGraphBottom-sYvalue, 30+((i+1)*12), emoSeqGraphBottom-eYvalue);

      }
    }

    p.stroke(200, 53, 100);
    p.strokeWeight(2);
    p.line(30, emoSeqGraphTop, 30, emoSeqGraphBottom);
    p.line(30, emoSeqGraphBottom, 390, emoSeqGraphBottom);

  }

  p.micHUD = (x, y) => {
    let audioLevel = p.constrain(microphone.getLevel()*600, 0, 300);
    // p.print(audioLevel);

    p.fill(200, 53, 100, 55);
    p.strokeWeight(2);
    p.stroke(200, 53, 100, 75);

    if(isListening == false){
      p.rect(x, y, 5, 30);
      p.rect(x, y+35, 5, 30);
    }else if (isListening == true) {
      p.rect(x, y, (5+audioLevel+p.random(0, 10)), 30);
      p.rect(x, y+35, (5+audioLevel+p.random(0, 10)), 30);
    }
  }


  p.posDisplacementHUD = (x, y) => {
    p.noStroke();
    p.fill(200, 53, 100);
    p.textFont('Helvetica Neue');
    p.textSize(14);
    if(myp52.currentDisplacement != undefined){
      p.text("User current arousal level: "+p.nf(myp52.currentDisplacement, 2, 2), x, y);
      p.text("Average : "+p.nf(myp52.displacementAvgCopy, 2, 2), x, y+16);
    }else{
      p.text("User current arousal level: ", x, y);
      p.text("Average : ", x, y+16);
    }
  }

}

let myp5 = new p5(canvas0, 'hudCanvas');
