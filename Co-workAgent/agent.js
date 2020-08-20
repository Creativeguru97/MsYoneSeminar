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
    this.index += this.frameIncliment;
    if(this.index > thinking.length - 2){
      this.frameIncliment = -1;
    }else if (this.index < 1) {
      this.frameIncliment = 1;
    }

    console.log(this.index);
    // return this.index;
    myp5.image(thinking[this.index], 480, 270, 960, 540);
  }

  typing(frameStep, mode, min, max){
    //This is the default state which no types are happning
    // myp5.image(typing_L0[0], 480, 270, 960, 540);

    if(myp5.frameCount % 8 == 0){//Every 30 frames this happens

      this.noiseOffset = this.noiseOffset + 0.1;
      let n = myp5.noise(this.noiseOffset);

      this.cNoiseOffset = n;
      if(this.samplingTIme == 0){
        this.pNoiseOffset = n;
      }else{}

      if(this.cNoiseOffset > this.pNoiseOffset){
      //In this "if" statement, gonna be random
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

        let prob = myp5.random(0, 100);
        if(prob < 90){
          let index = myp5.int(myp5.random(0, keySound.length));
          keySound[index].playMode(mode);
          // this.existanceStrength(keySound, index, min, max);
          keySound[index].setVolume(0.5);
          keySound[index].play();
          // console.log("key is clacked!!!");
        }else if (prob >= 90 && prob < 95) {
          // this.existanceStrength(spacebarSound, null, min, max);
          spacebarSound.setVolume(0.5);
          spacebarSound.play();
          // console.log("space bar is clacked!!!");
        }else if (prob >= 95 && prob < 98) {
          // this.existanceStrength(deleteKeySound, null, min, max);
          deleteKeySound.setVolume(0.5);
          deleteKeySound.play();
          // console.log("delete key is clacked!!!");
        }else{
          // this.existanceStrength(enterKeySound, null, min, max);
          enterKeySound.setVolume(0.5);
          enterKeySound.play();
          // console.log("enter key is clacked!!!");
        }
      }
    }

    //Animate oen of them just once
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
