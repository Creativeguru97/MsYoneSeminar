import processing.sound.*;

SoundFile file;

float volume;

void setup() {
  size(640, 360);
  background(255);
  
  volume = 0.0;
  
  // Load a soundfile from the /data folder of the sketch and play it back
  file = new SoundFile(this, "music1.mp3");
  file.loop();
}

void draw() {
  background(0);
  stroke(255);
  line(width/2, 0, width/2, height);
  
  if(mouseX >= width/2){
    
    if(volume < 1.0){
      volume = volume + 0.005;
    }else if(volume >= 1.0){
      volume = 1.0;
    }
    
    println(volume);
    
  }else if(mouseX < width/2){
    
    if(volume > 0.0){
      volume = volume - 0.005;
    }else if(volume <= 0.0){
      volume = 0.0;
    }
    
    println(volume);
  }
    
  file.amp(volume);
}
