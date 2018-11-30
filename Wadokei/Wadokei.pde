PImage Wadokei;
PImage HandsStopper;
float x;
float y;

void setup(){
  frameRate(30);
  size(500,500);
  x=250;
  y=250;
  Wadokei=loadImage("Wadokei.png");
  HandsStopper=loadImage("HandsStopper.png");
  imageMode(CENTER);
}

void draw(){
  translate(x,y);
  image(Wadokei,0,0,400,400);
  
  strokeWeight(2);
  stroke(132,162,212);
  float theta = TWO_PI*second()/60.0;
  PVector endPoint = convertAndTranslate(theta,135);
  line(0,0,endPoint.x,endPoint.y);
 
  strokeWeight(4);
  stroke(34,58,112);
  theta = TWO_PI*minute()/60.0;
  endPoint = convertAndTranslate(theta,127);
  line(0,0,endPoint.x,endPoint.y);
  
  strokeWeight(7);
  stroke(109,60,50);
  theta = TWO_PI*((hour()%12+minute()/60.0)/12.0);
  //I don't wanna the hour hand suddenly jump between each number on clock, so make it smooth out.
  endPoint = convertAndTranslate(theta,90);
  line(0,0,endPoint.x,endPoint.y);
  
  image(HandsStopper,0,0,50,50);
}

//Convert from polar coordinate to cartesian coordinates!!!!!!!
//Still not perfectly sure how it works.
//r=radius
//theta: as describe in draw, theta get moving around 360 degrees.
PVector convertAndTranslate(float theta, float r){
  
  //Rotate -90 degrees fuckin everything.
  theta -= HALF_PI;
  
  //Which is (x,y) cartesian coordinates.
  return new PVector(r*cos(theta), r*sin(theta));
}
