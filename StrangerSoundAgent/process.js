//------- Condortable lovely p5 world -------//
//-------------------------------------------//

let canvas1;
let gridCanvas;


//---User's emos relevant---
let userEmosStore;
let userHappyStore = [];
let userHappySum = 0;
let userNeutralLevel;
let rayaState;
let userState;

//---Raya relevant---

let generateStateTime = 0;
let generateTimeStore = 0;

let delayEffect;


let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

let walkSound = [];
let coughSound = [];
let flipPageSound = [];
let buyDrink = [];
let laughingSound = [];
let surpriseSound = [];
let breathSound;
let sitOnChairSound;
let putACupSound;
let putABookSound;

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
let displacementLog = [];
let facePosSampleTime = 0;
let displacementSum = 0;
let displacementAvg = 0;


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
    raya.typeKeyboard(8, "sustain");//(frameStep, playMode)
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


    //Sound expressions
    soundDirection(soundFile, index, audibleDist, ampMax){
      //This takes a lot of resouces I guess, may be I use int here.
      let panning = p.map(this.position.x, 0, p.width,-1.0, 1.0);
      let distUser = p5.Vector.sub(this.position, user.position);
      // let volume = p.map(distUser.mag(), audibleDist, 40, 0, ampMax);
      let volume = p.map(distUser.mag(), audibleDist, 40, 0.3, ampMax);
      if(index == 'null'){
        soundFile.pan(panning);
        soundFile.setVolume(volume);
      }else{
        soundFile[index].pan(panning);
        soundFile[index].setVolume(volume);
      }
    }

    typeKeyboard(frameStep, mode){
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
            keySound[index].setVolume(0.5);
            keySound[index].play();
            console.log("key is clacked!!!");
          }else if (prob >= 90 && prob < 95) {
            spacebarSound.setVolume(0.5);
            spacebarSound.play();
            console.log("space bar is clacked!!!");
          }else if (prob >= 95 && prob < 98) {
            deleteKeySound.setVolume(0.5);
            deleteKeySound.play();
            console.log("delete key is clacked!!!");
          }else{
            enterKeySound.setVolume(0.5);
            enterKeySound.play();
            console.log("enter key is clacked!!!");
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
        this.soundDirection(coughSound, index, p.width/2, 0.8);
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

        if(this.emosLog.length > 300){ //1000: which means 200 seconds
          this.emosLog.pop();
        }


        //Copy all of the emosLog
        for(let i = 0; i < this.emosLog.length; i++){
            // console.log(this.emosLog[i][j]);
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


    emotionalSequence(emotion, hueVal){
      p.strokeWeight(2);

        let convolutedEmotion = this.convolutedHappy;
        let emotionalSequencePoint = this.happySequencePoint;

        for(let i = 0; i < convolutedEmotion.length/10; i++){
          emotionalSequencePoint[i] = convolutedEmotion[i*10];
        }


        for(let i = 0; i < emotionalSequencePoint.length; i++){
          if(i < emotionalSequencePoint.length-1){
            let sYvalue = p.map(emotionalSequencePoint[i], 0, 1, 0, 170);
            let eYvalue = p.map(emotionalSequencePoint[i+1], 0, 1, 0, 170);
            let saturation = p.map(45+(i*6), 45, 550, 100, 0);
            p.stroke(hueVal, saturation, 100);
            p.line(45+(6*i), this.graphBottom-sYvalue, 45+(6*(i+1)), this.graphBottom-eYvalue);
            // p.point(45+(i*6), sYvalue); //Pointy version :)
          }
        }

        p.stroke(255);
        p.strokeWeight(2);
        p.line(45, this.graphTop, 45, this.graphBottom+15);
        p.line(30, this.graphBottom, 645, this.graphBottom);
    }

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
          p.displacementAvgCopy = displacementAvg;
          // console.log("displacement average: "+displacementAvg);
          // console.log(displacementLog);


          displacementSum = 0;
          checkDisplacementTimeStore = checkDisplacementTime;
          pFaceCenter = cFaceCenter;
          facePosSampleTime++;
        }
      }
    }//function facePosDisplacement() end

  }//class InternalModel end

}

let myp52 = new p5(canvas1, 'gridCanvas');
