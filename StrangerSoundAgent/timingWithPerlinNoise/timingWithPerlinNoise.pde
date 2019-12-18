float noiseOffset = 0.0;
float cNoiseOffset;
float pNoiseOffset;

int samplingTime = 0;
int count = 0;


int currentFrame = 0;
int frameStep = 10;

void setup(){
  size(640, 480);
}

void draw(){
  background(100);
  comparisonToPrevious();
  
}

void comparisonToPrevious(){
  if(currentFrame % frameStep == 0){
  
    noiseOffset = noiseOffset + 0.05;
    
    float n = noise(noiseOffset) * width;
    
    cNoiseOffset = n;
    if(samplingTime == 0){
      pNoiseOffset = n;
    }else{}
    
    if(cNoiseOffset > pNoiseOffset){
      println("Clicked"+count+"!!!");
      println("---------");
      stroke(255);
      fill(255);
      ellipse(width/2, height/2, 50, 50);
      
      count++;
    }else{}
    
    pNoiseOffset = cNoiseOffset;
    samplingTime++;
  }
  currentFrame++;//For comparisonToPrevious()
}

void actualWordsBasedVersion(){}
