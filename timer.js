let timerId;
let data = new Date(2022, 0, 1, 0, 0, 0, 0);
  
  function Timer(){
    if (!timerId) {
      timerId = setInterval(update, 1000);
    }
    update();
  }

  function update(){
    let resultTimer = document.querySelector(".resultTimer");
    data.setSeconds(data.getSeconds() + 1);
    

    let hour = data.getHours();
    if(hour < 10){
      hour = "0" + hour;
    }
    resultTimer.children[0].innerHTML = hour;

    let minutes = data.getMinutes();
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    resultTimer.children[1].innerHTML = minutes;

    let seconds = data.getSeconds();
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    resultTimer.children[2].innerHTML = seconds;
  }

  function stopTimer() {
    clearInterval(timerId);
      timerId = null;
  }

  function clearValueTimer() {
    let resultTimer = document.querySelector(".resultTimer");
    resultTimer.children[0].innerHTML = "00";
    data.setHours(0);
    resultTimer.children[1].innerHTML = "00";
    data.setMinutes(0);
    resultTimer.children[2].innerHTML = "00";
    data.setSeconds(0);
   }

   export {Timer,stopTimer,clearValueTimer};