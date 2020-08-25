class Agent{
  constructor(){
    this.index = 0;
    this.frameIncliment = 0;
    this.typingProbability = 0;

    this.noiseOffset = 0.0;
    this.cNoiseOffset;
    this.pNoiseOffset;

    this.samplingTime = 0;

    this.currentFrame = 0;

    this.typing_L0 = false;
    this.typing_L1 = false;
    this.typing_R0 = false;
    this.isTypingSomething = false;

    this.isScrolling = false;

    this.intervalCount = 0;
    this.randomNum = 10;
  }

  interval(freq, min, max){
    if(this.intervalCount == 0){
      this.randomNum = myp5.random(min, max);
    }else{}

    if(this.intervalCount > freq){
      this.intervalCount = 0;
    }else{
      this.intervalCount++;
    }

    // console.log(this.randomNum);
    return myp5.int(this.randomNum);
  }

  existanceStrength(soundFile, index, min, max){
    let volume = myp5.map(
      myp5.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2), 0, 20.0, max, min);
      // console.log(p.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2));
    // console.log(volume);
    if(index == null){
      soundFile.setVolume(volume);
    }else{
      soundFile[index].setVolume(volume);
    }
  }


  thinking(){
    let scrollFreqency = this.interval(40, 40, 200);

    if(myp5.frameCount % scrollFreqency == 0 && this.isScrolling == false){//Every typeFreqency frames this happens
      this.index = 0; //Reset the index
      this.isScrolling = true;

      //Sound effects
      let whichSound = myp5.int(myp5.random(0, 2));
      if(whichSound == 0){
        scrollingSound[0].setVolume(0.2);
        scrollingSound[0].play();
      }else if(whichSound == 1){
        scrollingSound[1].setVolume(0.2);
        scrollingSound[1].play();
      }else if(whichSound == 2){
        scrollingSound[2].setVolume(0.2);
        scrollingSound[2].play();
      }
    }

    //Animate one of them just once at each time
    if(this.isScrolling == true){
      myp5.image(thinking[this.index], 480, 270, 960, 540);

      this.index += this.frameIncliment;
      if(this.index > thinking.length - 2){
        this.index = thinking.length - 1;
        this.isScrolling = false;
        // console.log(this.isScrolling);
      }else{
        this.index++;
      }
      console.log(this.index);

    }else{
      myp5.image(thinking[0], 480, 270, 960, 540);
    }
  }


  typing(frameStep, mode, min, max){
    //This is the default state which no types are happning
    // myp5.image(typing_L0[0], 480, 270, 960, 540);

    //For even randomize the duration of the cycle
    let typeFreqency = this.interval(30, 4, 15);

    if(myp5.frameCount % typeFreqency == 0){//Every typeFreqency frames this happens

      this.noiseOffset = this.noiseOffset + 0.1;
      let n = myp5.noise(this.noiseOffset);

      this.cNoiseOffset = n;
      if(this.samplingTIme == 0){
        this.pNoiseOffset = n;
      }else{}

      //if only current noise value is greater than previous one
      //The typing souund happen
      if(this.cNoiseOffset > this.pNoiseOffset){
        this.index = 0; //Reset the index
        let whichType = myp5.random(0, 10);

        if(whichType < 5){
          this.typing_L0 = true;
          this.typing_L1 = false;
          this.typing_R0 = false;
        }else if(whichType >= 5 && whichType < 9){
          this.typing_L0 = false;
          this.typing_L1 = false;
          this.typing_R0 = true;
        }else if(whichType >= 9){
          this.typing_L0 = false;
          this.typing_L1 = true;
          this.typing_R0 = false;
        }

        let whichSound = myp5.random(0, 100);
        if(whichSound < 90){
          let index = myp5.int(myp5.random(0, keySound.length));
          keySound[index].playMode(mode);
          // this.existanceStrength(keySound, index, min, max);
          keySound[index].setVolume(0.1);
          keySound[index].play();
          // console.log("key is clacked!!!");
        }else if (whichSound >= 90 && whichSound < 95) {
          // this.existanceStrength(spacebarSound, null, min, max);
          spacebarSound.setVolume(0.1);
          spacebarSound.play();
          // console.log("space bar is clacked!!!");
        }else if (whichSound >= 95 && whichSound < 98) {
          // this.existanceStrength(deleteKeySound, null, min, max);
          deleteKeySound.setVolume(0.1);
          deleteKeySound.play();
          // console.log("delete key is clacked!!!");
        }else{
          // this.existanceStrength(enterKeySound, null, min, max);
          enterKeySound.setVolume(0.1);
          enterKeySound.play();
          // console.log("enter key is clacked!!!");
        }
      }
    }

    //Animate one of them just once at each time
    if(this.typing_L0 == true){
      myp5.image(typing_L0[this.index], 480, 270, 960, 540);
      // console.log(this.index);
      if(this.index > typing_L0.length - 2){
        this.index = typing_L0.length - 1;
      }else{
        this.index++;
      }
    }else if(this.typing_L1 == true){
      myp5.image(typing_L1[this.index], 480, 270, 960, 540);
      // console.log(this.index);
      if(this.index > typing_L1.length - 2){
        this.index = typing_L1.length - 1;
      }else{
        this.index++;
      }
    }else if(this.typing_R0 == true){
      myp5.image(typing_R0[this.index], 480, 270, 960, 540);
      // console.log(this.index);
      if(this.index > typing_R0.length - 2){
        this.index = typing_R0.length - 1;
      }else{
        this.index++;
      }
    }

    this.pNoiseOffset = this.cNoiseOffset;
    this.samplingTime++;
  }

}
