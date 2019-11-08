#include <M5Stack.h>

const int vol_pin1 = 26;
//const int vol_pin2 = 22;

int vol_value1 = 0;
//int vol_value2 = 0;
int count = 0;
int point = 0;

void setup() {
  M5.begin();
  pinMode(vol_pin1,INPUT);
  //pinMode(vol_pin2,INPUT);
  Serial.begin(115200);
 
  
}

void loop() {

  vol_value1 = analogRead( vol_pin1 );
 // vol_value2 = analogRead( vol_pin2 );

  //analogWrite( led_pin, vol_value/4 );
  //Serial.print(vol_pin);

  Serial.print( vol_value1 );
 // Serial.print( vol_value2 );
  Serial.print("\n");
  if(vol_value1>2000)
  {
    count++;
    if(count>10)
    {
       point++;
       M5.Lcd.clear();
       M5.Lcd.setCursor(0,0);
       M5.Lcd.printf("point:%3d",point);
       count=0;
    }
   
  }
  

 delay( 50 );
}
