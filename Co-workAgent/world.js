class World{
  constructor(){

  }

  ambience(){
    ambientSound.setVolume(0.02);
    ambientSound.loop();
  }

  fallingLeaves(){

  }

  chairCreaking(){
    chairCreakingSound.setVolume(0.2);
    chairCreakingSound.play();
  }

  putPhoneOnTableSound(){
    putPhoneSound.setVolume(0.1);
    putPhoneSound.play();
  }

  carHorn(){

  }

}
