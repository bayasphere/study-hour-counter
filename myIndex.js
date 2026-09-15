const setupPage = document.getElementById("setup-page");
const homePage = document.getElementById("home-page");

let countHour = 0;

const hourStud = document.getElementById("hours");

const goalHour = document.getElementById("goal");

let count = 0;

const countEl = document.getElementById("count-el");

const countDwonEL = document.getElementById("count-down");

let time = 0;

let intervall = null;
// PROGRESS PANELS

const setupProgressPanel =
  document.getElementById("setup-progress-panel");

const homeProgressPanel =
  document.getElementById("home-progress-panel");


// PROGRESS INFORMATION

const setupStudiedHours =
  document.getElementById("setup-hour-studied");

const homeStudiedHours =
  document.getElementById("home-hour-studied");

const setupProgressList =
  document.getElementById("setup-progress-list");

const homeProgressList =
  document.getElementById("home-progress-list");


let studyProgress = [];

let starThour;
let starTmin;


// --------------------------------
// CHOOSE HOURS
// --------------------------------

function incrementHour() {
  countHour++;

  hourStud.textContent = countHour;
}


function decrementHour() {
  if (countHour > 0) {
    countHour--;

    hourStud.textContent = countHour;
  }
}


// --------------------------------
// START STUDY SESSION
// --------------------------------

function startBtn() {

  if (countHour === 0) {

    alert("CHOOSE AN HOUR TO START STUDYING !");

    return;
  }


  // Record starting time

  const starTnow = new Date();

  starThour = starTnow.getHours();
  starTmin = starTnow.getMinutes();


  // Reset counter for this session

  count = 0;

  countEl.textContent = count;


  // Set goal

  goalHour.textContent = `${count}/${countHour} goal`;


  // Set countdown

  time = countHour * 3600;


  // Stop previous timer if one exists

  if (intervall) {
    clearInterval(intervall);
  }


  // Hide setup page

  setupPage.classList.add("fade-out");


  setTimeout(function () {

    setupPage.style.display = "none";

    homePage.style.display = "block";

    setupPage.classList.remove("fade-out");

    homePage.classList.add("fade-in");

  }, 500);


  // Start timer

  intervall = setInterval(countDownTimer, 1000);
}


// --------------------------------
// PAD TIME
// --------------------------------

function padStart(value) {

  return String(value).padStart(2, "0");

}


// --------------------------------
// SAVE PROGRESS
// --------------------------------

function saveProgress() {

  const now = new Date();

  let hour = now.getHours();

  const min = now.getMinutes();


  if (hour < starThour) {

    hour = hour + 24;

  }


  const starTtime =
    starThour * 3600 +
    starTmin * 60;


  const nowTime =
    hour * 3600 +
    min * 60;


  const studyTime =
    nowTime - starTtime;


  const totalHour =
    Math.floor(studyTime / 3600);


  const minuteTime =
    studyTime % 3600;


  const totalMin =
    Math.floor(minuteTime / 60);


  const timeClicked =
    `${padStart(totalHour)}h ${padStart(totalMin)}min`;


  // Save session

  studyProgress.push({

    time: timeClicked,

    minutes: studyTime / 60

  });


  let totalMinutes = 0;


  // Clear both lists

  setupProgressList.innerHTML = "";

  homeProgressList.innerHTML = "";


  // Rebuild both progress lists

  studyProgress.forEach(function (item, index) {

    totalMinutes += item.minutes;


    const setupProgressItem =
      document.createElement("div");

    setupProgressItem.classList.add("progress-item");

    setupProgressItem.textContent =
      `Session ${index + 1} — ${item.time}`;


    const homeProgressItem =
      document.createElement("div");

    homeProgressItem.classList.add("progress-item");

    homeProgressItem.textContent =
      `Session ${index + 1} — ${item.time}`;


    setupProgressList.appendChild(
      setupProgressItem
    );


    homeProgressList.appendChild(
      homeProgressItem
    );

  });


  // Calculate today's total

  const totaleHour =
    Math.floor(totalMinutes / 60);


  const totaleMin =
    Math.floor(totalMinutes % 60);


  const totalText =
    `Studied ${totaleHour}h ${totaleMin}min`;


  // Update both panels

  setupStudiedHours.textContent =
    totalText;

  homeStudiedHours.textContent =
    totalText;


  // Return to goal-selection page

  homePage.classList.add("fade-out");


  setTimeout(function () {

    homePage.style.display = "none";

    setupPage.style.display = "flex";

    homePage.classList.remove("fade-out");

    setupPage.classList.add("fade-in");

  }, 500);
}


// --------------------------------
// INCREMENT COMPLETED HOURS
// --------------------------------

function increment() {

  count += 1;

  countEl.textContent = count;

  goalHour.textContent =
    `${count}/${countHour} goal`;


  if (count == countHour) {

    alert("goal achieved !!");

  }
}


// --------------------------------
// FINISHED BUTTON
// --------------------------------

function stopStudy() {

  clearInterval(intervall);

  intervall = null;

  saveProgress();
}


// --------------------------------
// COUNTDOWN
// --------------------------------

function countDownTimer() {

  const hour =
    Math.floor(time / 3600);


  const minutTime =
    time % 3600;


  const minutes =
    Math.floor(minutTime / 60);


  const seconds =
    minutTime % 60;


  countDwonEL.textContent =
    `${padStart(hour)}:${padStart(minutes)}:${padStart(seconds)}`;


  time--;


  // One hour has passed

  if (time > 0 && time % 3600 === 0) {

    increment();


    if (count === 1) {

      alert(
        "⏰ " +
        count +
        " hour has passed!"
      );

    } else {

      alert(
        "⏰ " +
        count +
        " hours have passed!"
      );

    }
  }


  // Session finished

  if (time === 0) {

    clearInterval(intervall);

    intervall = null;

    alert(
      "YOUR STUDY SESSION IS COMPLETE !"
    );

    saveProgress();

  }
}


// --------------------------------
// PROGRESS BUTTON
// --------------------------------

function progress(page) {

  if (page === "setup") {

    setupProgressPanel.classList.toggle("show");

    // Make sure home panel is closed

    homeProgressPanel.classList.remove("show");

  }


  if (page === "home") {

    homeProgressPanel.classList.toggle("show");

    // Make sure setup panel is closed

    setupProgressPanel.classList.remove("show");

  }
}