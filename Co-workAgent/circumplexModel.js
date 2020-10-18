class Circumplex_model{

  constructor(){
    this.centerX = myp5.width - c_Mdl_Width/2;
    this.centerY = myp5.height - c_Mdl_Height/2;
    this.radius = c_Mdl_Width*5/6/2;

    this.neutralPolar = myp5.createVector( this.PtoC(0, 0)[0], this.PtoC(0, 0)[1] );
    this.happyPolor = myp5.createVector( this.PtoC(this.radius, 330)[0], this.PtoC(this.radius, 330)[1] );
    this.angryPolor = myp5.createVector( this.PtoC(this.radius, 250)[0], this.PtoC(this.radius, 250)[1] );
    this.sadPolor = myp5.createVector( this.PtoC(this.radius, 150)[0], this.PtoC(this.radius, 150)[1] );
    this.disgustedPolor = myp5.createVector( this.PtoC(this.radius, 210)[0], this.PtoC(this.radius, 210)[1] );
    this.surprisedPolor = myp5.createVector( this.PtoC(this.radius, 270)[0], this.PtoC(this.radius, 270)[1] );
    this.fearfulPolor = myp5.createVector( this.PtoC(this.radius, 235)[0], this.PtoC(this.radius, 235)[1] );

    this.agentEmotionPosition = myp5.createVector( this.PtoC(0, 0)[0], this.PtoC(0, 0)[1] );
    this.velocity = myp5.createVector(0, 0);
    this.acceleration = myp5.createVector(0, 0);

    this.neutralForce = 0;
    this.happyForce = 0;
    this.angryForce = 0;
    this.sadForce = 0;
    this.disgustedForce = 0;
    this.surprisedForce = 0;
    this.fearfulForce = 0;

  }

  CtoP(x, y){
    let r = myp5.sqrt( myp5.pow(x, 2)+myp5.pow(y, 2) );
    let phi = myp5.degrees(myp5.atan2(y, x));

    let coordinate = [r, phi];
    return coordinate;
  }

  PtoC(r, phi){
    let x = r * myp5.cos(phi);
    let y = r * myp5.sin(phi);

    let coordinate = [x, y];
    return coordinate;
  }

  show(){
    myp5.push();
    myp5.translate(this.centerX, this.centerY);

    myp5.noFill();
    myp5.stroke(100, 0, 100);
    myp5.strokeWeight(0.5);
    myp5.line(-c_Mdl_Width/2+10, 0, c_Mdl_Width/2-10, 0);//horizontal line
    myp5.line(0, -c_Mdl_Height/2+10, 0, c_Mdl_Height/2-10);//vertical line

    myp5.ellipse(0, 0,this.radius*2);

    myp5.strokeWeight(3);

    myp5.point(this.neutralPolar.x, this.neutralPolar.y);
    myp5.point(this.happyPolor.x, this.happyPolor.y);
    myp5.point(this.angryPolor.x, this.angryPolor.y);
    myp5.point(this.sadPolor.x, this.sadPolor.y);
    myp5.point(this.disgustedPolor.x, this.disgustedPolor.y);
    myp5.point(this.surprisedPolor.x, this.surprisedPolor.y);
    myp5.point(this.fearfulPolor.x, this.fearfulPolor.y);

    this.agentEmotion();
    this.agentMove();
    this.agentFriction();

    if(neutral != undefined){
      this.agentAttracted(this.neutralPolar, 20, 1, neutral);
      this.agentAttracted(this.happyPolor, 20, 1, happy);
      this.agentAttracted(this.angryPolor, 20, 1, angry);
      this.agentAttracted(this.sadPolor, 20, 1, sad);
      this.agentAttracted(this.disgustedPolor, 20, 1, disgusted);
      this.agentAttracted(this.surprisedPolor, 20, 1, surprised);
      this.agentAttracted(this.fearfulPolor, 20, 1, fearful);
    }

    this.emotionRangeLimit();

    myp5.pop();
  }

  agentEmotion(){
    myp5.stroke(100, 100, 100);
    myp5.strokeWeight(8);
    myp5.point(this.agentEmotionPosition.x, this.agentEmotionPosition.y);
  }

  agentMove(){
      this.velocity.add(this.acceleration);
      this.agentEmotionPosition.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxspeed);
  }

  applyForce(force){
      this.acceleration.add(force);
  }

  agentAttracted(target, arriveDist, maxspeed, maxforce){
    let desired = p5.Vector.sub(target, this.agentEmotionPosition);
    let d = desired.mag();
    // console.log(d);
  // Scale with arbitrary damping within 100 pixels
    if (d < arriveDist) {
      let arrivingSpeed = myp5.map(d, 0, arriveDist, 0, maxspeed);
      desired.setMag(arrivingSpeed);
    } else {
      desired.setMag(maxspeed);
    }

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }

  agentFriction(){
      //friction simuration.
      let friction = this.velocity.copy();
      friction.mult(-0.02);
      this.applyForce(friction);
  }

  emotionRangeLimit(){
    let presentRadius = this.CtoP(
      this.agentEmotionPosition.x,
      this.agentEmotionPosition.y
    );

    if(presentRadius[0] > this.radius){
      presentRadius[0] = this.radius;
      // this.acceleration = this.acceleration * -1;
      this.velocity.x = this.velocity.x * -1;
    }

    // console.log(presentRadius);
  }
}
