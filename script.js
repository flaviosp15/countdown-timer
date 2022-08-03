/* =========================== VARIABLES =========================== */
let eventDate, eventDay, eventMonth, eventYear, eventDateInMilliseconds;
const boxInput = document.querySelector('.input__box');
const inputDate = document.querySelector('.input__date');
const btnUpdate = document.querySelector('.btn__update');
const validIcon = document.querySelector('.bx-check');
const invalidIcon = document.querySelector('.bx-x');
const daysText = document.querySelector('.days__to');
const timeText = document.querySelector('.time__to');
const spanDate = document.querySelector('.span__date');
const today = new Date();

/* =========================== FUNCTIONS =========================== */
const noInput = function () {
  invalidIcon.classList.remove('invalid');
  validIcon.classList.remove('valid');
  boxInput.classList.remove('invalid');
  boxInput.classList.remove('valid');
  btnUpdate.disabled = true;
};
const invalidInput = function () {
  invalidIcon.classList.add('invalid');
  validIcon.classList.remove('valid');
  boxInput.classList.add('invalid');
  boxInput.classList.remove('valid');
  btnUpdate.disabled = true;
};
const validInput = function () {
  invalidIcon.classList.remove('invalid');
  validIcon.classList.add('valid');
  boxInput.classList.remove('invalid');
  boxInput.classList.add('valid');
  btnUpdate.disabled = false;
};
const numberBelow10 = function (number) {
  return number < 10 ? `0${number}` : number;
};
const timeExpired = function () {
  daysText.textContent = 'Contagem';
  timeText.textContent = 'Finalizada!';
};
const displayCountdown = function (days, hours, minutes, seconds) {
  daysText.textContent = `${days} dia${days > 1 ? 's' : ''}`;
  timeText.textContent = `${numberBelow10(hours)}:${numberBelow10(minutes)}:${numberBelow10(seconds)}`;
};

noInput();

/* =========================== LISTENERS =========================== */
inputDate.addEventListener('keyup', function () {
  const splitEventDate = this.value.split('-');
  const millisecondsNow = today.getTime();
  eventDay = splitEventDate[2];
  eventMonth = splitEventDate[1];
  eventYear = splitEventDate[0].slice(0, 1) === '0' ? null : splitEventDate[0];
  eventDateInMilliseconds = new Date(`${eventMonth} ${eventDay}, ${eventYear} 00:00:00`).getTime();
  if (eventDateInMilliseconds > millisecondsNow) validInput();
  else if (eventDateInMilliseconds < millisecondsNow) invalidInput();
  else noInput();
});

btnUpdate.addEventListener('click', function (e) {
  e.preventDefault();
  eventDate = eventDateInMilliseconds;
  inputDate.value = '';
  inputDate.blur();
  noInput();
  spanDate.textContent = `${eventDay}/${eventMonth}/${eventYear}`;
});

/* =========================== RUN COUNTDOWN TIMER =========================== */
setInterval(function () {
  const now = new Date().getTime(),
    differenceBeetwenDates = eventDate - now,
    daysToEventDate = Math.floor(differenceBeetwenDates / (1000 * 60 * 60 * 24)),
    hoursToEventDate = Math.floor((differenceBeetwenDates % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutesToEventDate = Math.floor((differenceBeetwenDates % (1000 * 60 * 60)) / (1000 * 60)),
    secondsToEventDate = Math.floor((differenceBeetwenDates % (1000 * 60)) / 1000);

  if (differenceBeetwenDates <= 0) {
    timeExpired();
  } else if (eventDate === undefined) {
    return null;
  } else {
    displayCountdown(daysToEventDate, hoursToEventDate, minutesToEventDate, secondsToEventDate);
  }
}, 1000);
