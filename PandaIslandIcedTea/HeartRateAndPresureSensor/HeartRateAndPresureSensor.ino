#include <M5Stack.h>
#define MyRED 0xe8e4
#define MyGREEN 0x2589
#define MyBLUE 0x51d

const int vol_pin1 = 26;
const int vol_pin2 = 22;

int vol_value1 = 0;
//int vol_value2 = 0;
int count = 0;
int point = 0;

//---Heart rate relevant stuff---
unsigned char counter;
unsigned long temp[21]; // 割り込みの発生した時間（鼓動）
unsigned long sub;
bool data_effect = true;
unsigned int heart_rate = 0;//the measurement result of heart rate
unsigned int prev_heart_rate = 0;
 
const int max_heartpluse_duty = 2000;//you can change it follow your system's request.
                        //2000 meams 2 seconds. System return error 
                        //if the duty overtrip 2 second.
 

void setup() {
  M5.begin();
  pinMode(vol_pin1,INPUT);
  //pinMode(vol_pin2,INPUT);
  Serial.begin(115200);

  //---Heart rate relevant stuff---
  Serial.println("Please ready your chest belt.");
  delay(5000);
  initTemp();
  Serial.println("Heart rate test begin.");
  attachInterrupt(pin, interrupt, RISING);
  LCD_Clear();
  M5.Lcd.printf("Measurements in heart rate...");

  //---Heart rate relevant stuff---
  
}

void loop() {

  vol_value1 = analogRead( vol_pin1 );
 // vol_value2 = analogRead( vol_pin2 );

  //analogWrite( led_pin, vol_value/4 );
  //Serial.print(vol_pin);

  Serial.print( vol_value1 );
 // Serial.print( vol_value2 );
  Serial.print("\n");
  if(vol_value1>2000){
    count++;
    if(count>10){
       point++;
       M5.Lcd.clear();
       M5.Lcd.setCursor(0,0);
       M5.Lcd.printf("point:%3d",point);
       count=0;
    }
  }
 delay( 50 );

   if (heart_rate != prev_heart_rate) {
    prev_heart_rate = heart_rate;
    LCD_Clear();
    M5.Lcd.printf("Heart Rate:%3d", heart_rate);
 
    if (heart_rate > 80) {
      M5.Lcd.fillCircle(160, 120, 80, MyRED);    
    } else if (heart_rate > 75) {
      M5.Lcd.fillCircle(160, 120, 80, MyGREEN);
    } else {
      M5.Lcd.fillCircle(160, 120, 80, MyBLUE);    
    }
  }
  M5.update();
}

void LCD_Clear() {
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setTextSize(2);
}

/*Function: calculate the heart rate*/
void sum()
{
 if(data_effect) {
    heart_rate = 1200000/(temp[20] - temp[0]); //60*20*1000/20_total_time 
    // Serial.print("Heart_rate_is:\t");
    // Serial.println(heart_rate);
  }
  data_effect = 1;//sign bit
}
 
// 割り込み時に実行する関数
void interrupt() {
  temp[counter]=millis();
   Serial.print("Heart_beat_time:\t");
   Serial.println(temp[counter]);
 
  if (counter == 0) {
    sub = temp[counter]-temp[20];
  } else {
    sub = temp[counter]-temp[counter-1];
  }
  Serial.print("Heart_beat_duration_time:\t");
  Serial.println(sub);
  
  if (sub > max_heartpluse_duty) { //set 2 seconds as max heart pluse duty
    data_effect = 0; //sign bit
    counter = 0;
    // Serial.println("Heart rate measure error,test will restart!" );
    initTemp();
  }
 
  if (data_effect) {
    if (counter == 20) {
      counter = 0;
      sum();
    } else {
      counter++;
    }
  } else {
    counter = 0;
    data_effect = 1;
  }
}
 
// tempの初期化
void initTemp() {
  Serial.println("Initializing....");
  for(int i = 0; i < 20; i++) {
    temp[i] = 0;
    Serial.println(temp[i]);
  }
  temp[20] = millis();
}
