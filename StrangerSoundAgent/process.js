//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas1;
let gridCanvas;


//---User's emos relevant---
let userEmosStore;
let userHappyStore = [];
let userHappySum = 0;
let userNeutralLevel;
let userState;

//---Raya relevant---
let rayaState;
let probabilityOfActions;
let generateStateTime = 0;
let generateTimeStore = 0;

let delayEffect;

//For typeKeyboard()
let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

//For texting()
let iKeySound;
let iEnterKeySound = [];
let iDeleteKeySound = [];

let DoingNothing = false;
let TypingKeyboard = false;
let Texting = false;

// let walkSound = [];
// let coughSound = [];
// let flipPageSound = [];
// let laughingSound = [];
// let surpriseSound = [];
// let breathSound;
// let sitOnChairSound;
// let putACupSound;
// let putABookSound;

let pMicrophoneGetLevel;
let cMicrophoneGetLevel;

//For function typeKeyboard() in Agent class
let noiseOffset = 0.0;
let cNoiseOffset;
let pNoiseOffset;
let samplingTime = 0;
let count = 0;
let currentFrame = 0;


//For event programing


//p5.serialport relevant
let serial;
let outData = 0; // for data output
let portName = '/dev/tty.usbmodem14401';  // fill in your serial port name here

let pFaceCenter;
let cFaceCenter;
let facePosSampleTime = 0;


//----- Grid canvas -----
canvas1 = p => {
  p.convolutedEmotionCopy = [];
  p.emotionalSequencePointCopy = [];
  p.emotionAvg;

  p.displacementAvgCopy;
  p.currentDisplacement;

  p.preload = () => {

    //For function typeKeyboard() in Agent class
    for(let i=0; i < 4; i++){
      keySound[i] = p.loadSound("/soundEffects/typing/key"+i+".mp3");
    }
    enterKeySound = p.loadSound("/soundEffects/typing/enter.mp3");
    spacebarSound = p.loadSound("/soundEffects/typing/spacebar.mp3");
    deleteKeySound = p.loadSound("/soundEffects/typing/delete.mp3");

    iKeySound = p.loadSound("/soundEffects/texting/iKey0.mp3");
    for(let i=0; i < 3; i++){
      iEnterKeySound[i] = p.loadSound("/soundEffects/texting/iEnter"+i+".mp3");
    }
    for(let i=0; i < 5; i++){
      iDeleteKeySound[i] = p.loadSound("/soundEffects/texting/iDelete"+i+".mp3");
    }


    // for(let i=0; i < 20; i++){
    //   // walkSound[i] = p.loadSound("/soundEffects/walkSoundSmall/walk"+i+".mp3");
    //   walkSound[i] = p.loadSound("/soundEffects/walkSound/walk"+i+".mp3");
    // }
    // for(let i=0; i < 4; i++){
    //   coughSound[i] = p.loadSound("/soundEffects/coughSound/cough"+i+".mp3");
    // }
    // for(let i=0; i < 5; i++){
    //   flipPageSound[i] = p.loadSound("/soundEffects/flipPage/flip"+i+".mp3");
    // }
    // for(let i=0; i < 4; i++){
    //   laughingSound[i] = p.loadSound("/soundEffects/laughingSound/laugh"+i+".mp3");
    // }
    // for(let i=0; i < 4; i++){
    //   surpriseSound[i] = p.loadSound("/soundEffects/surprise/surprise"+i+".wav");
    // }
    //
    // breathSound = p.loadSound("/soundEffects/breath.mp3");
    // sitOnChairSound = p.loadSound("/soundEffects/sitOnChair.mp3");
    // putACupSound = p.loadSound("/soundEffects/putACupOfTea.mp3");
    // putABookSound = p.loadSound("/soundEffects/putABook.mp3");
  }

  p.setup = () => {
    p.createDiv();
    // gridCanvas = p.createCanvas(1280, 405);
    // gridCanvas.id("gridCanvas");
    p.noCanvas();
    raya = new Agent(p.random(80, p.width-80), p.random(70, p.height-40));
    rayaState = new InternalModel();
    userState = new InternalModel();

    p.colorMode(p.HSB, 360, 100, 100, 100);//(Mode, Hue, Saturation, Brightness, Alpha)


    userEmosStore = setInterval(() => {

      userHappyStore.push(happy);

      if(userHappyStore.length > 5){
        userHappyStore.splice(0, 1);//Erase index 0
      }

      for(let i=0; i<userHappyStore.length; i++){
        if(userHappyStore[i] != undefined){
          userHappySum += userHappyStore[i];
        }
      }

      userHappyLevel = userHappySum/userHappyStore.length;

      userHappySum = 0;

      generateStateTime++;
      if(generateStateTime > 10){
        generateStateTime = 0;
      }
      // console.log(generateStateTime);

    }, 200);


    setInterval(() => {
      probabilityOfActions = p.random(0, 10);
      console.log("New actions begin!!!");

      //Next task: Conditional statement to select boolean state.
    }, 12000);

    //p5.serialport relevant
    serial = new p5.SerialPort();

    serial.on('list', p.printList);  // set a callback function for the serialport list event
    serial.on('connected', p.serverConnected); // callback for connecting to the server
    serial.on('open', p.portOpen);        // callback for the port opening
    serial.on('data', p.serialEvent);     // callback for when new data arrives
    serial.on('error', p.serialError);    // callback for errors
    serial.on('close', p.portClose);      // callback for the port closing

    serial.list();                      // list the serial ports
    serial.open(portName);              // open a serial port
  }


//----- This is the place all interactions happen -----//
//-----------------------------------------------------//
  p.draw = () => {
    p.clear();

    userState.generateState();
    userState.facePosDisplacement();
    // userState.emotionalSequence("happy", 50);

    if(expressions != undefined){
      if(p.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2) < 10.0){
        if(probabilityOfActions < 7){

        }else if(probabilityOfActions >= 7 && probabilityOfActions < 9){
          raya.typeKeyboard(8, "sustain", 0, 0.5);//(frameStep, playMode, min, max)
        }else{
          raya.texting(8, "sustain", 0, 0.5);//(frameStep, playMode, min, max)
        }
      }
    }


  }

  //-----------------------------------------------------//
  //----- This is the place all interactions happen -----//


  class Agent{
    constructor(x, y){
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.maxforce = 0.025;
    }

    existanceStrength(soundFile, index, min, max){
      let volume = p.map(
        p.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2), 0, 10.0, max, min);
        console.log(p.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2));
      // console.log(volume);
      if(index == null){
        soundFile.setVolume(volume);
      }else{
        soundFile[index].setVolume(volume);
      }
    }

    typeKeyboard(frameStep, mode, min, max){
        if(currentFrame % frameStep == 0){

          noiseOffset = noiseOffset + 0.1;
          let n = p.noise(noiseOffset);

          cNoiseOffset = n;
          if(samplingTime == 0){
            pNoiseOffset = n;
          }else{}

          if(cNoiseOffset > pNoiseOffset){
            count++;
            let prob = p.random(0, 100);
            if(prob < 90){
              let index = p.int(p.random(0, keySound.length));
              keySound[index].playMode(mode);
              this.existanceStrength(keySound, index, min, max);
              keySound[index].play();
              // console.log("key is clacked!!!");
            }else if (prob >= 90 && prob < 95) {
              this.existanceStrength(spacebarSound, null, min, max);
              spacebarSound.play();
              // console.log("space bar is clacked!!!");
            }else if (prob >= 95 && prob < 98) {
              this.existanceStrength(deleteKeySound, null, min, max);
              deleteKeySound.play();
              // console.log("delete key is clacked!!!");
            }else{
              this.existanceStrength(enterKeySound, null, min, max);
              enterKeySound.play();
              // console.log("enter key is clacked!!!");
            }
          }else{}

          pNoiseOffset = cNoiseOffset;
          samplingTime++;

          if(count > 100){
            count = 0;
          }
        }
        currentFrame++;
    }


    texting(frameStep, mode, min, max){
        if(currentFrame % frameStep == 0){

          noiseOffset = noiseOffset + 0.1;
          let n = p.noise(noiseOffset);

          cNoiseOffset = n;
          if(samplingTime == 0){
            pNoiseOffset = n;
          }else{}

          if(cNoiseOffset > pNoiseOffset){
            count++;
            let prob = p.random(0, 100);
            if(prob < 90){
              this.existanceStrength(iKeySound, null, min, max);
              iKeySound.play();

            }else if (prob >= 90 && prob < 97) {
              let index = p.int(p.random(0, iEnterKeySound.length));
              iEnterKeySound[0].playMode(mode);
              this.existanceStrength(iEnterKeySound, 0, min, max);
              iEnterKeySound[0].play();
            }else if (prob >= 97 && prob < 100) {
              let index = p.int(p.random(0, iDeleteKeySound.length));
              iDeleteKeySound[0].playMode(mode);
              this.existanceStrength(iDeleteKeySound, 0, min, max);
              iDeleteKeySound[0].play();
              console.log("delete key is tapped!!!");
            }
          }else{}

          pNoiseOffset = cNoiseOffset;
          samplingTime++;

          if(count > 100){
            count = 0;
          }
        }
        currentFrame++;
    }

    cough(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, coughSound.length));
        coughSound[index].playMode(mode);
        // this.soundDirection(coughSound, index, p.width/2, 0.04);
        coughSound[index].setVolume(0.5);
        coughSound[index].play();
      }
    }

    readBook(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, flipPageSound.length));
        flipPageSound[index].playMode(mode);
        if(distUser.mag() <= 70){
          // flipPageSound[index].setVolume(0.05);
          flipPageSound[index].setVolume(0.5);
        }else{
          // this.soundDirection(flipPageSound, index, p.width/2, 0.05);
          this.soundDirection(flipPageSound, index, p.width/2, 1.5);
        }
        flipPageSound[index].play();
      }
    }

    sitDown(mode){
      sitOnChairSound.playMode(mode);
      // sitOnChairSound.setVolume(0.01);
      sitOnChairSound.setVolume(0.5);
      sitOnChairSound.play();
    }

    putCupAndBookOnTable(countFrame, num1, num2, mode){
      if(countFrame == num1){
        putACupSound.playMode(mode);
        // putACupSound.setVolume(0.05);
        putACupSound.setVolume(1.0);
        putACupSound.play();
      }else if(countFrame == num2){
        putABookSound.playMode(mode);
        // putABookSound.setVolume(0.05);
        putABookSound.setVolume(1.0);
        putABookSound.play();
      }
    }

    laugh(possibilityRange, border, mode){
      let num = p.random(0, possibilityRange);
      if(num > border){
        let index = p.int(p.random(0, laughingSound.length));
        laughingSound[index].playMode(mode);
        // this.soundDirection(laughingSound, index, p.width/2, 0.04);
        this.soundDirection(laughingSound, index, p.width/2, 0.5);
        laughingSound[index].play();
      }
    }

    surprise(mode){
      let index = p.int(p.random(0, surpriseSound.length));
      surpriseSound[index].playMode(mode);
      // this.soundDirection(coughSound, index, p.width/2, 0.04);
      this.soundDirection(surpriseSound, index, p.width/2, 0.8);
      surpriseSound[index].play();
    }

  }
  //----- Raya class end -----


  class InternalModel{

    constructor(){
      this.happy;
      this.convolutedHappy = [];
      this.convolutedHappySum = 0;
      this.happyAvg = 1.0;

      this.newLog = [];
      this.currentEmos = 0;
      // this.currentEmos = [0, 0];
      this.emosLog = [];
      for(let i = 0; i < 300; i++){
        this.emosLog.unshift(this.currentEmos);
      }

      this.samplingTime = 0;

      this.happySequencePoint = [];

      this.graphTop = 60;
      this.graphBottom = this.graphTop + 200;

      this.displacementAvg = 0;
      this.displacementSum = 0;
      this.displacementLog = [];
    }

    convolution(a, n, x){
      return a * Math.pow(n, x);
    }

    sigmoid(x){
      return 1 / (1 + Math.exp(-x));
    }


    generateState(){
      if(generateStateTime != generateTimeStore){
        this.happy = userHappyLevel;

        if(isNaN(this.happy) == false){
          if(this.samplingTime < 1){
            this.emosLog.unshift(this.happy); //Create 2d array
          }else{
            this.emosLog.unshift(this.currentEmos);
          }

          this.samplingTime++;
        }else{}

        if(this.emosLog.length > 300){ //Store past 1 minute emotion
          this.emosLog.pop();
        }


        //Copy all of the emosLog
        for(let i = 0; i < this.emosLog.length; i++){
          let value = this.convolution(this.emosLog[i], 0.99, i);
            this.convolutedHappy[i] = value;

          if(this.convolutedHappy.length > this.emosLog.length){
            this.convolutedHappy.pop();
          }
        }

        for(let i=0; i<this.convolutedHappy.length; i++){
          this.convolutedHappySum += this.convolutedHappy[i];
        }

        this.happyAvg = this.convolutedHappySum/this.convolutedHappy.length;
        p.emotionAvg = this.happyAvg;

        this.currentEmos = this.happy + this.happyAvg;

        if(this.currentEmos > 1.0){
          this.currentEmos = 1.0;
        }else{}

        this.convolutedHappySum = 0;

        //To give this value to hudCanvas
        p.convolutedEmotionCopy = this.convolutedHappy;
        p.emotionalSequencePointCopy = this.happySequencePoint;

      }

      generateTimeStore = generateStateTime;
    }


    // emotionalSequence(emotion, hueVal){
    //   p.strokeWeight(2);
    //
    //     let convolutedEmotion = this.convolutedHappy;
    //     let emotionalSequencePoint = this.happySequencePoint;
    //
    //     for(let i = 0; i < convolutedEmotion.length/10; i++){
    //       emotionalSequencePoint[i] = convolutedEmotion[i*10];
    //     }
    //
    //
    //     for(let i = 0; i < emotionalSequencePoint.length; i++){
    //       if(i < emotionalSequencePoint.length-1){
    //         let sYvalue = p.map(emotionalSequencePoint[i], 0, 1, 0, 170);
    //         let eYvalue = p.map(emotionalSequencePoint[i+1], 0, 1, 0, 170);
    //         let saturation = p.map(45+(i*6), 45, 550, 100, 0);
    //         p.stroke(hueVal, saturation, 100);
    //         p.line(45+(6*i), this.graphBottom-sYvalue, 45+(6*(i+1)), this.graphBottom-eYvalue);
    //         // p.point(45+(i*6), sYvalue); //Pointy version :)
    //       }
    //     }
    //
    //     p.stroke(255);
    //     p.strokeWeight(2);
    //     p.line(45, this.graphTop, 45, this.graphBottom+15);
    //     p.line(30, this.graphBottom, 645, this.graphBottom);
    // }

    facePosDisplacement(){
      if(isNaN(faceCenter[0]) == false && isNaN(faceCenter[1]) == false){
        p.ellipse(faceCenter[0], faceCenter[1], 30, 30);

        //Check face positions displacement every 0.2 sec.
        if(checkDisplacementTime != checkDisplacementTimeStore){

          cFaceCenter = faceCenter;
          if(facePosSampleTime == 0){
            pFaceCenter = faceCenter;
          }else{}

          //Calculate x and y displacement indivisually
          let xDisplacement = Math.abs(cFaceCenter[0] - pFaceCenter[0])
          let yDisplacement = Math.abs(cFaceCenter[1] - pFaceCenter[1])

          let displacement = xDisplacement + yDisplacement;
            p.currentDisplacement = displacement;

          //Store all past 1 minutes displacement
          this.displacementLog.unshift(displacement);
          if(this.displacementLog.length > 300){
            this.displacementLog.pop();
          }
          // console.log(displacementLog);

          for (let i = 0; i < this.displacementLog.length; i++) {
            this.displacementSum += this.displacementLog[i];
          }
          this.displacementAvg = this.displacementSum / this.displacementLog.length;
          p.displacementAvgCopy = this.displacementAvg;
          // console.log("displacement average: "+displacementAvg);
          // console.log(displacementLog);


          this.displacementSum = 0;
          checkDisplacementTimeStore = checkDisplacementTime;
          pFaceCenter = cFaceCenter;
          facePosSampleTime++;
        }
      }
    }//function facePosDisplacement() end

  }//class InternalModel end

}

let myp52 = new p5(canvas1, 'gridCanvas');
