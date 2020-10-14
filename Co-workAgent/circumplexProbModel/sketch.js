let model;

let neutralSliderDisplay;
let neutralSlider;
let happySliderDisplay;
let happySlider;
let angrySliderDisplay;
let angrySlider;
let sadSliderDisplay;
let sadSlider;
let disgustedSliderDisplay;
let disgustedSlider;
let surprisedSliderDisplay;
let surprisedSlider;
let fearfulSliderDisplay;
let fearfulSlider;


function setup() {
  createCanvas(500,500);
  colorMode(HSB, 100, 100, 100);
  angleMode(DEGREES);
  model = new Circumplex_model();

  neutralSliderDisplay = createDiv();
  neutralSlider = createSlider(0, 100, 0, 1);
  happySliderDisplay = createDiv();
  happySlider = createSlider(0, 100, 0, 1);
  angrySliderDisplay = createDiv();
  angrySlider = createSlider(0, 100, 0, 1);
  sadSliderDisplay = createDiv();
  sadSlider = createSlider(0, 100, 0, 1);
  disgustedSliderDisplay = createDiv();
  disgustedSlider = createSlider(0, 100, 0, 1);
  surprisedSliderDisplay = createDiv();
  surprisedSlider = createSlider(0, 100, 0, 1);
  fearfulSliderDisplay = createDiv();
  fearfulSlider = createSlider(0, 100, 0, 1);
}

function draw() {
  translate(width/2, height/2);
  background(0);

  model.show();

  sliderValue();
}

function sliderValue(){
  neutralSliderDisplay.html("user neutral: " + neutralSlider.value());
  happySliderDisplay.html("user happy: " + happySlider.value());
  angrySliderDisplay.html("user angry: " + angrySlider.value());
  sadSliderDisplay.html("user sad: " + sadSlider.value());
  disgustedSliderDisplay.html("user disgusted: " + disgustedSlider.value());
  surprisedSliderDisplay.html("user surprised: " + surprisedSlider.value());
  fearfulSliderDisplay.html("user fearful: " + fearfulSlider.value());
}

class Circumplex_model{

  constructor(){
    this.radius = width*5/6/2;

    this.neutralPolar = createVector( this.PtoC(0, 0)[0], this.PtoC(0, 0)[1] );
    this.happyPolor = createVector( this.PtoC(this.radius, 330)[0], this.PtoC(this.radius, 330)[1] );
    this.angryPolor = createVector( this.PtoC(this.radius, 250)[0], this.PtoC(this.radius, 250)[1] );
    this.sadPolor = createVector( this.PtoC(this.radius, 150)[0], this.PtoC(this.radius, 150)[1] );
    this.disgustedPolor = createVector( this.PtoC(this.radius, 210)[0], this.PtoC(this.radius, 210)[1] );
    this.surprisedPolor = createVector( this.PtoC(this.radius, 270)[0], this.PtoC(this.radius, 270)[1] );
    this.fearfulPolor = createVector( this.PtoC(this.radius, 235)[0], this.PtoC(this.radius, 235)[1] );

    this.agentEmotionPosition = createVector( this.PtoC(0, 0)[0], this.PtoC(0, 0)[1] );
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

  }

  CtoP(x, y){
    let r = sqrt( pow(x, 2)+pow(y, 2) );
    let phi = degrees(atan2(y, x));

    let coordinate = [r, phi];
    return coordinate;
  }

  PtoC(r, phi){
    let x = r * cos(phi);
    let y = r * sin(phi);

    let coordinate = [x, y];
    return coordinate;
  }

  show(){
    noFill();
    stroke(100, 0, 100);
    strokeWeight(0.5);
    line(-width/2+10, 0, width/2-10, 0);
    line(0, -width/2+10, 0, width/2-10);

    ellipse(0, 0,this.radius*2);

    strokeWeight(4);

    point(this.neutralPolar.x, this.neutralPolar.y);
    point(this.happyPolor.x, this.happyPolor.y);
    point(this.angryPolor.x, this.angryPolor.y);
    point(this.sadPolor.x, this.sadPolor.y);
    point(this.disgustedPolor.x, this.disgustedPolor.y);
    point(this.surprisedPolor.x, this.surprisedPolor.y);
    point(this.fearfulPolor.x, this.fearfulPolor.y);

    this.agentEmotion();
    this.agentMove();
    this.agentFriction();
    this.agentAttracted(this.neutralPolar, 10, 1, neutralSlider.value()/100);
    this.agentAttracted(this.happyPolor, 10, 1, happySlider.value()/100);
    this.agentAttracted(this.angryPolor, 10, 1, angrySlider.value()/100);
    this.agentAttracted(this.sadPolor, 10, 1, sadSlider.value()/100);
    this.agentAttracted(this.disgustedPolor, 10, 1, disgustedSlider.value()/100);
    this.agentAttracted(this.surprisedPolor, 10, 1, surprisedSlider.value()/100);
    this.agentAttracted(this.fearfulPolor, 10, 1, fearfulSlider.value()/100);

    this.agentRangeLimit();
  }

  agentEmotion(){

    stroke(100, 100, 100);
    strokeWeight(14);
    point(this.agentEmotionPosition.x, this.agentEmotionPosition.y);
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
  // Scale with arbitrary damping within 100 pixels
    if (d < arriveDist) {
      let arrivingSpeed = map(d, arriveDist, arriveDist, 0, maxspeed);
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

  agentRangeLimit(){
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
