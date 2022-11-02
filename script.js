const changeDateForm = document.querySelector(`.user-changedate-form`);
const dateDisplay = document.querySelector(`.output-display-date`);

const eventDate = document.querySelector(`.event-date`);
const eventDay = document.querySelector(`.event-day`);
const eventMessage = document.querySelector(`.event-message`);

const changeBtn = document.querySelector(`.change-btn`);
const submitBtn = document.querySelector(`.submit`);
const timeFormatBtn = document.querySelector(`.time-format-btn`);

const dateTimeContainer = document.querySelector(`.date-time-container`);
const months = document.querySelector(`.remaining-months`);
const weeks = document.querySelector(`.remaining-weeks`);
const days = document.querySelector(`.remaining-days`);
const hours = document.querySelector(`.remaining-hours`);
const mins = document.querySelector(`.remaining-mins`);
const seconds = document.querySelector(`.remaining-seconds`);

const dateFromUser = document.querySelector(`.date-from-user`);
const motivationFromUser = document.querySelector(`.motivation-from-user`);
const userEventDayName = document.querySelector(`.eventday-name-from-user`);

let state = 0;
let active = false;
let deadlineDate = new Date(`2022-12-25`);
let secondsInterval;

changeBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  changeDateForm.classList.remove(`hidden`);
  dateDisplay.classList.add(`hidden`);
});

// The submit button
submitBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  let userDate, userMotivation, eventDayName;
  const userEventMessage = eventMessage.textContent;
  const userEventDay = eventDay.textContent;

  userDate = dateFromUser.value;
  userMotivation = motivationFromUser.value;
  eventDayName = userEventDayName.value;

  // If date is empty alert
  if (!userDate) {
    alert(`Use correct Date format`);
  }

  // If date is less then current alert date passed
  if (!(new Date(userDate) >= new Date())) {
    alert(`The day has already passed, please select another date`);
  }

  // Update global deadline Date and event date to user interface
  deadlineDate = new Date(userDate);
  eventDate.textContent = new Intl.DateTimeFormat(localStorage.locale, {
    day: `numeric`,
    month: `short`,
    year: `numeric`,
  }).format(deadlineDate);

  // If inputs are empty then retain original messages otherwise update
  eventMessage.textContent =
    dateFromUser.value === `` ? userEventMessage : userMotivation;
  eventDay.textContent =
    userEventDayName.value === `` ? userEventDay : eventDayName;

  // Reset inputs back to empty
  dateFromUser.value = ``;
  motivationFromUser.value = ``;
  userEventDayName.value = ``;

  changeDateForm.classList.add(`hidden`);
  dateDisplay.classList.remove(`hidden`);
});

timeFormatBtn.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (active) clearInterval(secondsInterval);
  state += 1;
  if (state === 3) state = 0;

  let html,
    remainMonths,
    remainWeeks,
    remainDays,
    remainHours,
    remainMins,
    remainSec;

  const interval = function () {
    const time = deadlineDate - new Date();

    // MONTHS WEEKS DAYS HOURS MINS SECS
    if (state === 0) {
      dateTimeContainer.innerHTML = ``;
      remainMonths = time / (1000 * 60 * 60 * 24 * 30);
      remainWeeks = ((remainMonths - Math.trunc(remainMonths)) * 30) / 7;
      remainDays = (remainWeeks - Math.trunc(remainWeeks)) * 7;
      remainHours = (remainDays - Math.trunc(remainDays)) * 24;
      remainMins = (remainHours - Math.trunc(remainHours)) * 60;
      remainSec = (remainMins - Math.trunc(remainMins)) * 60;

      // prettier-ignore
      html = `
    <button class="time-date remaining-months">${String(Math.trunc(remainMonths)).padStart(2, `0`)}</button>m
    <button class="time-date remaining-weeks">${String(Math.trunc(remainWeeks)).padStart(2, `0`)}</button>w
    <button class="time-date remaining-days">${String(Math.trunc(remainDays)).padStart(2, `0`)}</button>d
    <button class="time-date remaining-hours">${String(Math.trunc(remainHours)).padStart(2, `0`)}</button>h
    <button class="time-date remaining-mins">${String(Math.trunc(remainMins)).padStart(2, `0`)}</button>m
    <button class="time-date remaining-seconds">${String(Math.trunc(remainSec)).padStart(2, `0`)}</button>s
        `;
      dateTimeContainer.insertAdjacentHTML(`afterbegin`, html);
      return (active = true);
    }

    // WEEKS DAYS HOURS MINS SECS
    if (state === 1) {
      dateTimeContainer.innerHTML = ``;
      remainWeeks = time / (1000 * 60 * 60 * 24 * 7);
      remainDays = (remainWeeks - Math.trunc(remainWeeks)) * 7;
      remainHours = (remainDays - Math.trunc(remainDays)) * 24;
      remainMins = (remainHours - Math.trunc(remainHours)) * 60;
      remainSec = (remainMins - Math.trunc(remainMins)) * 60;

      // prettier-ignore
      html = `
    <button class="time-date remaining-weeks">${String(Math.trunc(remainWeeks)).padStart(2, `0`)}</button>w
    <button class="time-date remaining-days">${String(Math.trunc(remainDays)).padStart(2, `0`)}</button>d
    <button class="time-date remaining-hours">${String(Math.trunc(remainHours)).padStart(2, `0`)}</button>h
    <button class="time-date remaining-mins">${String(Math.trunc(remainMins)).padStart(2, `0`)}</button>m
    <button class="time-date remaining-seconds">${String(Math.trunc(remainSec)).padStart(2, `0`)}</button>s
        `;
      dateTimeContainer.insertAdjacentHTML(`afterbegin`, html);
      return (active = true);
    }

    // DAYS HOURS MINS SECS
    if (state === 2) {
      dateTimeContainer.innerHTML = ``;
      remainDays = time / (1000 * 60 * 60 * 24);
      remainHours = (remainDays - Math.trunc(remainDays)) * 24;
      remainMins = (remainHours - Math.trunc(remainHours)) * 60;
      remainSec = (remainMins - Math.trunc(remainMins)) * 60;

      // prettier-ignore
      html = `
          <button class="time-date remaining-days">${String(Math.trunc(remainDays)).padStart(2, `0`)}</button>d
          <button class="time-date remaining-hours">${String(Math.trunc(remainHours)).padStart(2, `0`)}</button>h
          <button class="time-date remaining-mins">${String(Math.trunc(remainMins)).padStart(2, `0`)}</button>m
          <button class="time-date remaining-seconds">${String(Math.trunc(remainSec)).padStart(2, `0`)}</button>s
              `;
      dateTimeContainer.insertAdjacentHTML(`afterbegin`, html);
      return (active = true);
    }
  };

  // calling the functin to prevent delays
  interval();

  // calling functino in intervals
  secondsInterval = setInterval(() => {
    interval();
  }, 1000);
});

// Calculating and displaying the Time remaining
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

const timeElapse = setInterval(() => {
  timeEvaluation(new Date(), deadlineDate);
  if (deadlineDate === new Date()) clearTimeout(timeElapse);
}, 1000);
