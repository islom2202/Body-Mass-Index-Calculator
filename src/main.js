/*Radios and input Containers selectors*/
const metricRadio = document.querySelector('#metric-radio'),
      imperialRadio = document.querySelector('#imperial-radio');
let metricContainer = document.querySelector("#metricContainer"),
  imperialContainer = document.querySelector("#imperialContainer")

metricRadio.onchange = () =>{
  metricContainer.style.display = 'flex';
  imperialContainer.style.display = 'none';
}
imperialRadio.onchange = () => {
  metricContainer.style.display = "none"
  imperialContainer.style.display = "block";
}
/*result bar*/
let resultBar = document.querySelector(".result");
const BMI = document.querySelector(".BMI"),
      displayBMI = document.querySelector(".displayBMI"),
      healthState = document.querySelector(".health-state");
/*Metric inputs and results*/
const heightInputCm = document.querySelector(".height-input-cm"),
      weightInputKg = document.querySelector(".weight-input-kg");

function displayResult(){
    const weight = Number(weightInputKg.value)
    const height = Number(heightInputCm.value)
    const calculation = weight/ ((height / 100) * (height / 100))
    const result = calculation.toFixed(1);
    let state = "";
  function defineWeightRange(height){
      const minBMI = 18.5; 
      const maxBMI = 24.9 
      let minWeight = minBMI * Math.pow(height/100, 2);
      let maxWeight = maxBMI * Math.pow(height / 100, 2);
      return {
        minWeight: Math.floor(minWeight.toFixed(2)*10)/10,
        maxWeight: Math.floor(maxWeight.toFixed(2)*10)/10
      }
    }
  if (weight && height) {
       displayBMI.style.display = "block"
       BMI.style = "font-size:40px"
       BMI.innerHTML = result;
       if(result <= 18.4) state = "Underweight";
       if(result >= 18.5 && result <= 24.9) state = "Healthy";
       if(result >= 25 && result < 29.9) state = "Overweight";
       if (result >= 30 ) state = "Obese";
       healthState.innerHTML = `Your BMI suggests that you're a ${state}. Your ideal weight is approximately between ${
         defineWeightRange(height).minWeight
       }-${defineWeightRange(height).maxWeight} `
     }
}
heightInputCm.onkeyup = () => {
 displayResult()
}
weightInputKg.onkeyup = () => {
  displayResult()
}
/*Imperial inputs*/
const heightInputFt = document.querySelector(".height-input-ft"),
      heightInputIn = document.querySelector(".height-input-in");
const weightInputSt = document.querySelector(".weight-input-st"),
  weightInputIbs = document.querySelector(".weight-input-ibs") 

function displayImperialresult(){
  const heightFt = Number(heightInputFt.value),
        heightIn = Number(heightInputIn.value);
  const weightSt = Number(weightInputSt.value),
        weightIbs = Number(weightInputIbs.value);
  const height = (heightFt*12) + (heightIn),
        weight = (weightSt*14) + (weightIbs);
  const calculation = (weight / (height * height))*703;
  const result = calculation.toFixed(1) 
  let state = "";
  if (result <= 18.4) state = "Underweight"
  if (result >= 18.5 && result <= 24.9) state = "Healthy"
  if (result >= 25 && result <= 29.9) state = "Overweight"
  if (result >= 30) state = "Obese";
    displayBMI.style.display = "block"
    BMI.innerHTML = result;
    BMI.style = "font-size: 40px"
    function defineWeightRange(height){
      const minBMI = 18.5
      const maxBMI = 24.9
      let minWeight = minBMI * Math.pow(height / 100, 2)
      let maxWeight = maxBMI * Math.pow(height / 100, 2)
      let minWeightst = minWeight.toFixed(1)
      let maxWeightst = maxWeight.toFixed(1)
      return {
        minBMIst: Math.floor(minWeightst), 
        minBMIibs: Math.ceil((minWeight % 1) * 14 ), 
        maxBMIst: Math.floor(maxWeightst),
        maxBMIibs: Math.ceil((maxWeight % 1) * 14),
      }
    }
    healthState.innerHTML = `Your BMI suggests that you're a ${state}. Your ideal weight is approximately between ${
      defineWeightRange(height).minBMIst
    }st ${defineWeightRange(height).minBMIibs+1}ibs - ${
      defineWeightRange(height).maxBMIst
    }st ${defineWeightRange(height).maxBMIibs}ibs`
}

heightInputFt.onkeyup = () =>{
 if (weightInputSt.value &&  weightInputIbs.value || weightInputSt.value) displayImperialresult()
}
heightInputIn.onkeyup = () =>{
  if ((weightInputSt.value && weightInputIbs.value) || weightInputSt.value)
    displayImperialresult()
}
weightInputSt.onkeyup = () => {
  if (heightInputFt.value && heightInputIn.value || heightInputFt.value)
  displayImperialresult()
}
weightInputIbs.onkeyup = () =>{
  if ((heightInputFt.value && heightInputIn.value) || heightInputFt.value)
  displayImperialresult()
}



