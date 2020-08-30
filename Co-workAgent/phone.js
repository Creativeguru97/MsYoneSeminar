class Phone{
  constructor(){
    //This gonna be indicies of images in the 2D array "notification" to display
    this.i = 0;
    this.j = 0;

    this.isGotNotification = false;

    //everytime they get notification, number of unread messages increase.
    //Let's store those amount and reflect to notification screen.
    this.UnreadMessagesNum = 0;
  }


  display(){
    if(isTexting == true){
      if(previousAction == "typing" && agent.textingFrame < 90){
        myp5.image(pullediPhone[agent.textingFrame], 480, 270, 960, 540);
      }else{
        myp5.image(textingIPhone, 480, 270, 960, 540);
      }
    }else{
      myp5.image(defaultIPhone, 480, 270, 960, 540);
    }
  }


  notification(possibilityRange, border, mode, min, max){
    let num = myp5.random(0, possibilityRange);
    if(num > border){
      //Animation relevant
      if(this.UnreadMessagesNum < 4){
        this.i = this.UnreadMessagesNum;
      }else{
        this.i = 3;
      }
      this.j = 0;
      this.isGotNotification = true;

      //Sound relevant
      // this.existanceStrength(notificationSound, null, min, max);
      notificationSound.setVolume(0.2);
      notificationSound.play();
      console.log("");
      console.log("----- Got notification!!! -----");
      console.log("");
      // GotNotified = true;
    }

    if(this.isGotNotification == true && isTexting == false){
      // myp5.image(notification[this.index], 480, 270, 960, 540);
      myp5.image(notification[this.i][this.j], 480, 270, 960, 540);
      // console.log(this.index);
      if(this.j > notification[this.i].length - 2){
        this.j = notification[this.i].length - 1;
        this.isGotNotification = false;

        //Even unread mesaages are more than 4, the notification screen
        //doesn't look different.
        this.UnreadMessagesNum++;

      }else{
        this.j++;
      }
    }
  }


}
