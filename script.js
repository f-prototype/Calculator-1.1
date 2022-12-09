import {Timer,stopTimer,clearValueTimer} from "./timer.js"

const operations = ["+", "-", "*", ":", "%",];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
let currentNum = "";
let prevNum = "";
let selectedOperation = "";
let total = "";
const lastMath = document.querySelector(".last-Math");
const allMath = document.querySelector(".all-Math");
const buttons = document.querySelectorAll('.calculator-button');
const theme = document.querySelector('.nav-theme');
const calculator = document.querySelector(".calculator");
const navButton = document.querySelectorAll(".nav-button");
const navCalculator = document.querySelector(".nav-calculator");
const green = document.querySelectorAll(".green");
const black =document.querySelectorAll(".black");
const calculatorBtn = document.querySelectorAll(".calculator-button");
const navTimer = document.querySelector(".nav-timer");
const buttonStr = document.querySelectorAll(".buttonStr");
const timerNavigation = document.querySelector(".timerNavigation");
const resultTimer = document.querySelector(".resultTimer");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const clearTimer = document.querySelector(".clearTimer");
const image = document.querySelectorAll(".image");
const hiddenButtom = document.querySelector(".null");


hiddenButtom.hidden = true;

                      // ВЫДЕЛЕНИЕ КНОПОК ПРИ ТЕМНОЙ ТЕМЕ
for (let i=0; i < green.length; i++) {
  green[i].classList.add("whiteDark");
}

                      // ПЕРЕКЛЮЧЕНИЕ НА СТРАНИЦУ КАЛЬКУЛЯТОРА
navCalculator.onclick = function() {
  if (navTimer.classList.contains("active")) {
    navTimer.classList.remove("active");
    navCalculator.classList.add("active");
  } else {
    navCalculator.classList.add("active");
  }

  allMath.classList.remove("hidden");
  lastMath.classList.remove("hidden");
  timerNavigation.classList.add("hidden");
  resultTimer.classList.add("hidden");

  for (let i = 0; i < buttonStr.length; i++) {
    buttonStr[i].classList.remove("hidden");
  }


  stopTimer();

}

                      // ПЕРЕКЛЮЧЕНИЕ НА СТРАНИЦУ ТАЙМЕРА
navTimer.onclick = function() {
  if (navCalculator.classList.contains("active")) {
    navCalculator.classList.remove("active");
    navTimer.classList.add("active");
  } else {
    navTimer.classList.add("active");
  }

  allMath.classList.add("hidden");
  lastMath.classList.add("hidden");
  timerNavigation.classList.remove("hidden");
  resultTimer.classList.remove("hidden");

  for (let i = 0; i < buttonStr.length; i++) {
    buttonStr[i].classList.add("hidden");
  }

  start.onclick = function() {
    Timer();
    start.setAttribute('disabled', true);
    start.classList.add("hidden");
    stop.classList.remove("hidden");
    
  }

  stop.onclick = function() {
    stopTimer();
    start.removeAttribute('disabled');
    stop.classList.add("hidden");
    start.classList.remove("hidden");
  }

  clearTimer.onclick = function() {
    stopTimer();
    start.removeAttribute('disabled');
    stop.classList.add("hidden");
    start.classList.remove("hidden");
    clearValueTimer();
  }
}

                      // СМЕНА ТЕМЫ
theme.onclick = function(){
  if(theme.classList.contains("Dark-theme")){
    theme.classList.remove('Dark-theme');
    theme.innerHTML = `<img src="img/dark (1).png" alt="light">`;
    calculator.classList.remove("Dark-calculator");
    navButton[0].classList.remove("Dark-nav");
    navButton[1].classList.remove("Dark-nav");
    navButton[2].classList.remove("Dark-nav");
    lastMath.classList.remove("lastDark");
    black[0].classList.remove('greyDark');
    black[1].classList.remove('greyDark');
    for (let i = 0; i < calculatorBtn.length; i++){
      calculatorBtn[i].classList.remove("numDark");
    }
    start.classList.remove("DarkStartStopClear");
    stop.classList.remove("DarkStartStopClear");
    clearTimer.classList.remove("DarkStartStopClear");

    for ( let i = 0; i < image.length; i++) {
      image[i].classList.remove("reversColor");
      image[i].classList.remove("DarkImage");
    }
    resultTimer.classList.remove("numDark");
    hiddenButtom.classList.remove("darkNull");
  } else {
    theme.classList.add("Dark-theme");
    calculator.classList.add("Dark-calculator");
    navButton[0].classList.add("Dark-nav");
    navButton[1].classList.add("Dark-nav");
    // navButton[2].classList.add("Dark-nav");
    theme.innerHTML = `<div class="reversColor">
    <img src="img/light (2).png" alt="light">
    </div>`;
    lastMath.classList.add("lastDark");
    black[0].classList.add('greyDark');
    black[1].classList.add('greyDark');

    for (let i = 0; i < calculatorBtn.length; i++){
      calculatorBtn[i].classList.add("numDark");
    }

    start.classList.add("DarkStartStopClear");
    stop.classList.add("DarkStartStopClear");
    clearTimer.classList.add("DarkStartStopClear");

    for ( let i = 0; i < image.length; i++) {
      image[i].classList.add("reversColor");
      image[i].classList.add("DarkImage");
    }
    resultTimer.classList.add("numDark");
    hiddenButtom.classList.add("darkNull");
  }
}

                      // СОБЫТИЯ НЕЧИСЛОВЫХ КНОПОК
buttons[0].onclick = function() {
    clear();
    allMath.innerHTML = "";
    lastMath.innerHTML = "";
}

buttons[1].onclick = function() {
    deleteValue();
    allMath.innerHTML = currentNum;
}

buttons[3].onclick = function() {
    pressed(':');
}
buttons[7].onclick = function() {
    pressed('*');
}
buttons[11].onclick = function() {
    pressed('-');
}

                      // СОБЫТИЯ ЧИСЛОВЫХ КНОПОК
for (let i = 2; i < buttons.length; i++) {
        if(i == 3 || i == 7 || i == 11) {
            continue;
        }
    buttons[i].onclick = function() {
        pressed(buttons[i].innerHTML);
    }
}

                      // ФУНКЦИЯ НАЖАТИЯ
let pressed = (value) => {
    if (value === "=" || value === "Enter") {
        calculate();
        lastMath.innerHTML = total;
    }
    else if (value === "%") percentage();
    else if (value === "c") clear();
    else if (operations.includes(value)) applyOperation(value);
    else if (numbers.includes(value)) appendNumber(value);
}

                      // ОТРИСОВКА ВВЕДЕНЫХ ЧИСЕЛ
const appendNumber = (value) => {
    allMath.innerHTML =  allMath.innerHTML + value;
    currentNum = currentNum + value;
    
}
                      // ПОДГОТОВКА ОПЕРАЦИИ
const applyOperation = (value) => {
    calculate();
    prevNum = currentNum;
    currentNum = "";
    selectedOperation = value;
    allMath.innerHTML = allMath.innerHTML + value;
  }

                      // ОБРАБОТКА ВЫЧИСЛЕНИЯ
  const calculate = () => {
    if (selectedOperation === "*") multiply();
    else if (selectedOperation === ":") divide();
    else if (selectedOperation === "%") percentage();
    else if (selectedOperation === "-") subtract();
    else if (selectedOperation === "+") sum();
    prevNum = "";
    selectedOperation = "";
  }

                      // ФУНКЦИИ ВЫЧИСЛЕНИЙ
  const multiply = () => {
    currentNum = prevNum * currentNum;
    total = currentNum;
  }
  const divide = () => {
    currentNum = prevNum / currentNum;
    total = currentNum;
  }
  const percentage = () => {
    currentNum = currentNum / 100;
    total = currentNum;
    lastMath.innerHTML = total;
  }
  const subtract = () => {
    currentNum = prevNum - currentNum;
    total = currentNum;
  }
  const sum = () => {
    currentNum = +prevNum + +currentNum;
    total = currentNum;
  }
  const clear = () => {
   currentNum = ""
   prevNum = ""
   selectedOperation = ""
   currentNum = ""
  }
  const deleteValue = () => {
    if(currentNum.length !== 0 && currentNum !== '0') { 
      currentNum = currentNum.slice(0, -1);
      allMath.innerHTML = currentNum;

    }
  }   

  



  

   