const submit = document.querySelector(`.submit`);
const dateInput = document.querySelector(`.date-input`);
const motivationMessage = document.querySelector(`.motivation-message`);
const displaMessage = document.querySelector(`.dispaly-message`);
const changeDate = document.querySelector(`.change-date`);
const dateModification = document.querySelector(`.date-modification`);
const changeBtn = document.querySelector(`.change-date-data`);
const finalDay = document.querySelector(`.final-day`);
const specialDayName = document.querySelector(`.event-day`);
const motivationDisplayed = document.querySelector(`.message`);
const timeRemainingFormat = document.querySelector(`.change-date-format`);
const remainingTimeContainer = document.querySelector(`.time-remaining`);

const months = document.querySelector(`.months`);
const weeks = document.querySelector(`.weeks`);
const days = document.querySelector(`.days`);
const hours = document.querySelector(`.hours`);
const mins = document.querySelector(`.mins`);
const seconds = document.querySelector(`.seconds`);

let inputdate, motivation, diplayedmessge;

changeBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  changeDate.classList.remove(`hidden`);
  dateModification.classList.add(`hidden`);
});

submit.addEventListener(`click`, function (e) {
  e.preventDefault();

  inputdate = dateInput.value;
  motivation = motivationMessage.value;
  diplayedmessge = displaMessage.value;

  if (!inputdate) {
    alert(`Use correct Date format`);
  }
  if (!(new Date(inputdate) >= new Date())) {
    alert(`The day has already passed, please select another date`);
  }

  deadlineDate = new Date(inputdate);
  finalDay.textContent = new Intl.DateTimeFormat(localStorage.locale, {
    day: `numeric`,
    month: `short`,
    year: `numeric`,
  }).format(deadlineDate);

  motivationDisplayed.textContent = motivation;
  specialDayName.textContent = diplayedmessge;

  dateInput.value = ``;
  motivationMessage.value = ``;
  displaMessage.value = ``;

  changeDate.classList.add(`hidden`);
  dateModification.classList.remove(`hidden`);
});

let state = 0;
let activeTimeInterval = false;
timeRemainingFormat.addEventListener(`click`, function (e) {
  e.preventDefault();

  let html,
    remainMonths,
    remainWeeks,
    remainDays,
    remainHours,
    remainMins,
    remainSec;

  const secondsInterval = setInterval(() => {
    const time = deadlineDate - new Date();

    // MONTHS WEEKS DAYS HOURS MINS SECS
    if (state === 0) {
      remainingTimeContainer.innerHTML = ``;
      remainMonths = time / (1000 * 60 * 60 * 24 * 30);
      remainWeeks = ((remainMonths - Math.trunc(remainMonths)) * 30) / 7;
      remainDays = (remainWeeks - Math.trunc(remainWeeks)) * 7;
      remainHours = (remainDays - Math.trunc(remainDays)) * 24;
      remainMins = (remainHours - Math.trunc(remainHours)) * 60;
      remainSec = (remainMins - Math.trunc(remainMins)) * 60;

      // prettier-ignore
      html = `
    <button class="remining-time months">${String(Math.trunc(remainMonths)).padStart(2, `0`)}</button>m
    <button class="remining-time weeks">${String(Math.trunc(remainWeeks)).padStart(2, `0`)}</button>w
    <button class="remining-time days">${String(Math.trunc(remainDays)).padStart(2, `0`)}</button>d
    <button class="remining-time hours">${String(Math.trunc(remainHours)).padStart(2, `0`)}</button>h
    <button class="remining-time mins">${String(Math.trunc(remainMins)).padStart(2, `0`)}</button>m
    <button class="remining-time seconds">${String(Math.trunc(remainSec)).padStart(2, `0`)}</button>s
        `;
      remainingTimeContainer.insertAdjacentHTML(`afterbegin`, html);
      activeTimeInterval = true;
    }

    // WEEKS DAYS HOURS MINS SECS
    if (state === 1) {
      remainingTimeContainer.innerHTML = ``;
      remainWeeks = time / (1000 * 60 * 60 * 24 * 7);
      remainDays = (remainWeeks - Math.trunc(remainWeeks)) * 7;
      remainHours = (remainDays - Math.trunc(remainDays)) * 24;
      remainMins = (remainHours - Math.trunc(remainHours)) * 60;
      remainSec = (remainMins - Math.trunc(remainMins)) * 60;

      // prettier-ignore
      html = `
    <button class="remining-time weeks">${String(Math.trunc(remainWeeks)).padStart(2, `0`)}</button>w
    <button class="remining-time days">${String(Math.trunc(remainDays)).padStart(2, `0`)}</button>d
    <button class="remining-time hours">${String(Math.trunc(remainHours)).padStart(2, `0`)}</button>h
    <button class="remining-time mins">${String(Math.trunc(remainMins)).padStart(2, `0`)}</button>m
    <button class="remining-time seconds">${String(Math.trunc(remainSec)).padStart(2, `0`)}</button>s
        `;
      remainingTimeContainer.insertAdjacentHTML(`afterbegin`, html);
      activeTimeInterval = true;
    }
    // DAYS HOURS MINS SECS
    if (state === 2) {
      remainingTimeContainer.innerHTML = ``;
      remainDays = time / (1000 * 60 * 60 * 24);
      remainHours = (remainDays - Math.trunc(remainDays)) * 24;
      remainMins = (remainHours - Math.trunc(remainHours)) * 60;
      remainSec = (remainMins - Math.trunc(remainMins)) * 60;

      // prettier-ignore
      html = `
          <button class="remining-time days">${String(Math.trunc(remainDays)).padStart(2, `0`)}</button>d
          <button class="remining-time hours">${String(Math.trunc(remainHours)).padStart(2, `0`)}</button>h
          <button class="remining-time mins">${String(Math.trunc(remainMins)).padStart(2, `0`)}</button>m
          <button class="remining-time seconds">${String(Math.trunc(remainSec)).padStart(2, `0`)}</button>s
              `;
      remainingTimeContainer.insertAdjacentHTML(`afterbegin`, html);
      activeTimeInterval = true;
    }
  }, 1000);
  state += 1;
  if (state === 3) state = 0;
  if (activeTimeInterval) clearInterval(secondsInterval);
});

const timeEvaluation = function (date1, date2) {
  const time = date2 - date1;
  const remainMonths = time / (1000 * 60 * 60 * 24 * 30);
  const remainWeeks = ((remainMonths - Math.trunc(remainMonths)) * 30) / 7;
  const remainDays = (remainWeeks - Math.trunc(remainWeeks)) * 7;
  const remainHours = (remainDays - Math.trunc(remainDays)) * 24;
  const remainMins = (remainHours - Math.trunc(remainHours)) * 60;
  const remainSec = (remainMins - Math.trunc(remainMins)) * 60;

  months.textContent = `${Math.trunc(remainMonths)}`.padStart(2, 0);
  weeks.textContent = `${Math.trunc(remainWeeks)}`.padStart(2, 0);
  days.textContent = `${Math.trunc(remainDays)}`.padStart(2, 0);
  hours.textContent = `${Math.trunc(remainHours)}`.padStart(2, 0);
  mins.textContent = `${Math.trunc(remainMins)}`.padStart(2, 0);
  seconds.textContent = `${Math.trunc(remainSec)}`.padStart(2, 0);
};

let deadlineDate = new Date(`2022-12-25`);

const timeElapse = setInterval(() => {
  timeEvaluation(new Date(), deadlineDate);
  if (deadlineDate === new Date()) clearTimeout(timeElapse);
}, 1000);
