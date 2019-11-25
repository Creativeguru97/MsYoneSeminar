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

let pFaceCenter;
let cFaceCenter;
let displacementLog = [];
let facePosSampleTime = 0;
let displacementSum = 0;
let displacementAvg = 0;



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
    // p.emotionalSequence(50);
    p.micHUD(30, 60);
    p.facePosDisplacementHUD();
  }

  p.emotionalStatesHUD = (x, y, hueVal) => {
    // p.fill(255, 127);
    // p.rect(x-10, y-30, 155, 185, 8);

    p.noStroke();
    p.fill(200, 53, 100);
    // p.fill(255);
    p.textFont('Helvetica Neue');
    p.textSize(14);
    if(expressions != undefined){
      p.text("User current joy level: "+p.nf(happy*100, 2, 2)+"%", x, y);
      p.text("Average : "+p.nf(myp52.emotionAvg*100, 2, 2)+"%", x, y+16);
      // p.text("Average : "+myp52.emotionAvg, x, y+16);
    }else{
      p.text("User current joy level: ", x, y);
      p.text("Average : ", x, y+16);
    }


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

  p.facePosDisplacementHUD = () =>{
    if(isNaN(faceCenter[0]) == false && isNaN(faceCenter[1]) == false){
      p.ellipse(faceCenter[0], faceCenter[1], 30, 30);

      //Check face positions displacement every 0.2 sec.
      if(checkDisplacementTime != checkDisplacementTimeStore){

        cFaceCenter = faceCenter;
        if(facePosSampleTime == 0){
          pFaceCenter = faceCenter;
        }else{}

        let displacement = Math.abs(cFaceCenter[0] - pFaceCenter[0]);

        //Store all past 3 minutes displacement
        displacementLog.unshift(displacement);
        if(displacementLog.length > 300){
          displacementLog.pop();
        }
        // console.log(displacementLog);

        for (let i = 0; i < displacementLog.length; i++) {
          displacementSum += displacementLog[i];
        }
        displacementAvg = displacementSum / displacementLog.length;
        console.log(displacementAvg);


        displacementSum = 0;
        checkDisplacementTimeStore = checkDisplacementTime;
        pFaceCenter = cFaceCenter;
        facePosSampleTime++;
      }
    }
  }


}

let myp5 = new p5(canvas0, 'hudCanvas');
