let depressive;
let instantGratification = 10;
let pRange0;
let pRange1;
let pRange2;
let pRange3;

let probabilities = [];


function setup() {
  createCanvas(400,400);
  colorMode(HSB, 100, 100, 100);
}

function draw() {
  background(0);

  depressive = int(map(mouseX, 0, 400, 0, 100));
  if(depressive > 100){
    depressive = 100;
  }

  let mappedDepressive = int(map(depressive, 0, 100, 0, 70 - instantGratification));
  pRange0 = 70 - instantGratification - mappedDepressive;

  mappedDepressive = int(map(depressive, 0, 100, 0, 100 - instantGratification*1.5));
  pRange1 = 100 - instantGratification * 1.5 - mappedDepressive;

  mappedDepressive = int(map(depressive, 0, 100, 0, 100 - pRange1));
  pRange2 = pRange1 + instantGratification;
  pRange3 = 100;

  probabilities[0] = pRange0;
  probabilities[1] = pRange1 - pRange0;
  probabilities[2] = pRange2 - pRange1;
  probabilities[3] = pRange3 - pRange2;
  probabilities[4] = 100 - pRange3;

  console.log(probabilities);
  console.log("-------------------")
  // console.log("pRange0: "+str(pRange0));
  // console.log("pRange1: "+str(pRange1));
  // console.log("pRange2: "+str(pRange2));

  // console.log(probabilities);




  fill(0, 50, 100);
  rect(
    width/2-20,
    0,
    40,
    height * probabilities[0]/100
  );

  fill(20, 50, 100);
  rect(
    width/2-20,
    height * probabilities[0]/100,
    40,
    height * probabilities[1]/100
  );

  fill(40, 50, 100);
  rect(
    width/2-20,
    height * (probabilities[0] + probabilities[1]) /100,
    40,
    height * probabilities[2]/100
  );

  fill(60, 50, 100);
  rect(
    width/2-20,
    height * (probabilities[0] + probabilities[1] + probabilities[2]) /100,
    40,
    height * probabilities[3]/100
  );

  fill(80, 50, 100);
  rect(
    width/2-20,
    height * (probabilities[0] + probabilities[1] + probabilities[2] + probabilities[3]) /100,
    40,
    height * probabilities[4]/100
  );

}
