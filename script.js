/* =========================== VARIABLES =========================== */
let eventDate, eventDateInMilliseconds, fullStringEventDate;
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
const fixDateForAllBrowsers = function (input) {
  let newFormat = [];
  const arrayDate = input.replace(/-/g, '/').split('/');
  const [yyyy, mm, dd] = arrayDate;
  newFormat = [mm, dd, yyyy].join('/');
  return newFormat;
};
const verifyInput = function () {
  fullStringEventDate = new Date(`${fixDateForAllBrowsers(inputDate.value)} 00:00:00`);
  eventDateInMilliseconds = fullStringEventDate.getTime();
  const currentDateInMilliseconds = today.getTime();
  const yearAbove1000 = /[^0]+(\d){3}/g;
  const splitYear = inputDate.value.match(yearAbove1000, null);
  const isDateFilled = yearAbove1000.test(splitYear);
  const isInvalidInput = eventDateInMilliseconds < currentDateInMilliseconds || splitYear === null;
  const isValidInput = eventDateInMilliseconds > currentDateInMilliseconds && isDateFilled;
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
  const eventDay = formatNumberLessThan10(fullStringEventDate.getDate());
  const eventMonth = formatNumberLessThan10(fullStringEventDate.getMonth() + 1);
  const eventYear = fullStringEventDate.getFullYear();
  spanDate.textContent = `${eventDay}/${eventMonth}/${eventYear}`;
};
const displayCountdown = function (days, hours, minutes, seconds) {
  const formatNumber = /\B(?=(\d{3})+(?!\d))/g;
  const numberOfDays = `${days.toString().replace(formatNumber, '.')} dia${days > 1 ? 's' : ''}`;
  const remainingTime = `${formatNumberLessThan10(hours)}:${formatNumberLessThan10(minutes)}:${formatNumberLessThan10(seconds)}`;
  daysText.textContent = numberOfDays;
  timeText.textContent = remainingTime;
};

noInput();

/* =========================== LISTENERS =========================== */
inputDate.addEventListener('keyup', verifyInput);

inputDate.addEventListener('input', verifyInput);

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
  const now = new Date().getTime();
  const differenceInMilliseconds = eventDate - now;
  const daysToEventDate = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hoursToEventDate = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesToEventDate = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const secondsToEventDate = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
  const isUndefined = eventDate === undefined;
  const isDifferenceLessThan0 = differenceInMilliseconds < 0;
  if (isDifferenceLessThan0) {
    expiredTime();
  } else if (isUndefined) {
    return null;
  } else {
    displayCountdown(daysToEventDate, hoursToEventDate, minutesToEventDate, secondsToEventDate);
  }
}, 1000);
