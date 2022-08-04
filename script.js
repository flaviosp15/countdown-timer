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
const verifyValidInput = function () {
  const splitEventDate = inputDate.value.split('-');
  const currentDateInMilliseconds = today.getTime();
  eventDay = splitEventDate[2];
  eventMonth = splitEventDate[1];
  eventYear = splitEventDate[0].slice(0, 1) === '0' ? null : splitEventDate[0];
  eventDateInMilliseconds = new Date(`${eventMonth} ${eventDay}, ${eventYear} 00:00:00`).getTime();
  if (eventDateInMilliseconds > currentDateInMilliseconds) validInput();
  else if (eventDateInMilliseconds < currentDateInMilliseconds) invalidInput();
  else noInput();
};
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
const formatNumberLessThan10 = function (number) {
  return number < 10 ? `0${number}` : number;
};
const expiredTime = function () {
  daysText.textContent = 'Contagem';
  timeText.textContent = 'Finalizada!';
};
const displayCountdown = function (days, hours, minutes, seconds) {
  const formatNumber = /\B(?=(\d{3})+(?!\d))/g;
  daysText.textContent = `${days.toString().replace(formatNumber, '.')} dia${days > 1 ? 's' : ''}`;
  timeText.textContent = `${formatNumberLessThan10(hours)}:${formatNumberLessThan10(minutes)}:${formatNumberLessThan10(seconds)}`;
};

noInput();

/* =========================== LISTENERS =========================== */
inputDate.addEventListener('keyup', function () {
  verifyValidInput();
});

inputDate.addEventListener('select', function () {
  verifyValidInput();
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
    differenceInMilliseconds = eventDate - now,
    daysToEventDate = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)),
    hoursToEventDate = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutesToEventDate = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)),
    secondsToEventDate = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000),
    isUndefined = eventDate === undefined,
    areMillisecondsBelow0 = differenceInMilliseconds < 0;

  if (areMillisecondsBelow0) {
    expiredTime();
  } else if (isUndefined) {
    return null;
  } else {
    displayCountdown(daysToEventDate, hoursToEventDate, minutesToEventDate, secondsToEventDate);
  }
}, 1000);
