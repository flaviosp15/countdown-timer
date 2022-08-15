/* =========================== VARIABLES =========================== */
let eventDate, eventDay, eventMonth, eventYear, eventDateInMilliseconds, fullStringEventDate;
const boxInput = document.querySelector('.input__box'),
  inputDate = document.querySelector('.input__date'),
  btnUpdate = document.querySelector('.btn__update'),
  validIcon = document.querySelector('.bx-check'),
  invalidIcon = document.querySelector('.bx-x'),
  daysText = document.querySelector('.days__to'),
  timeText = document.querySelector('.time__to'),
  spanDate = document.querySelector('.span__date'),
  today = new Date();

/* =========================== FUNCTIONS =========================== */
const verifyInput = function () {
  const fixDateForAllBrowsers = inputDate.value.replace(/-/g, '/');
  fullStringEventDate = new Date(`${fixDateForAllBrowsers} 00:00:00`);
  eventDateInMilliseconds = fullStringEventDate.getTime();
  const currentDateInMilliseconds = today.getTime(),
    yearAbove1000 = /[^0]+(\d){3}/g,
    splitYear = inputDate.value.match(yearAbove1000, null),
    isDateFilled = yearAbove1000.test(splitYear),
    isInvalidInput = eventDateInMilliseconds < currentDateInMilliseconds && isDateFilled,
    isValidInput = eventDateInMilliseconds > currentDateInMilliseconds && isDateFilled;
  if (isValidInput) validInput();
  else if (isInvalidInput) invalidInput();
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
const formatNumberLessThan10 = number => (number < 10 ? `0${number}` : number);
const expiredTime = function () {
  daysText.textContent = 'Contagem';
  timeText.textContent = 'Finalizada!';
};
const displayFormattedDate = function () {
  eventDay = formatNumberLessThan10(fullStringEventDate.getDate());
  eventMonth = formatNumberLessThan10(fullStringEventDate.getMonth() + 1);
  eventYear = fullStringEventDate.getFullYear();
  spanDate.textContent = `${eventDay}/${eventMonth}/${eventYear}`;
};
const displayCountdown = function (days, hours, minutes, seconds) {
  const formatNumber = /\B(?=(\d{3})+(?!\d))/g,
    numberOfDays = `${days.toString().replace(formatNumber, '.')} dia${days > 1 ? 's' : ''}`,
    remainingTime = `${formatNumberLessThan10(hours)}:${formatNumberLessThan10(minutes)}:${formatNumberLessThan10(seconds)}`;
  daysText.textContent = numberOfDays;
  timeText.textContent = remainingTime;
};

noInput();

/* =========================== LISTENERS =========================== */
inputDate.addEventListener('keyup', function () {
  verifyInput();
});

inputDate.addEventListener('input', function () {
  verifyInput();
});

btnUpdate.addEventListener('click', function (e) {
  e.preventDefault();
  eventDate = eventDateInMilliseconds;
  inputDate.value = '';
  inputDate.blur();
  noInput();
  displayFormattedDate();
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
    isDifferenceLessThan0 = differenceInMilliseconds < 0;
  if (isDifferenceLessThan0) {
    expiredTime();
  } else if (isUndefined) {
    return null;
  } else {
    displayCountdown(daysToEventDate, hoursToEventDate, minutesToEventDate, secondsToEventDate);
  }
}, 1000);
