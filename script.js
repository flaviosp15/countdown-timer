let eventDate, eventDay, eventMonth, eventYear;
const boxInput = document.querySelector('.input__box');
const inputDate = document.querySelector('.input__date');
const btnUpdate = document.querySelector('.btn__update');
const validIcon = document.querySelector('.bx-check');
const invalidIcon = document.querySelector('.bx-x');
const daysText = document.querySelector('.days__to');
const timeText = document.querySelector('.time__to');
const eventDateText = document.querySelector('.event__date');
const today = new Date();
const months = {
  01: 'Jan',
  02: 'Feb',
  03: 'Mar',
  04: 'Apr',
  05: 'May',
  06: 'Jun',
  07: 'Jul',
  08: 'Aug',
  09: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};
const noInput = function () {
  if (inputDate.value === '') {
    invalidIcon.classList.remove('invalid');
    validIcon.classList.remove('valid');
    boxInput.classList.remove('invalid');
    boxInput.classList.remove('valid');
    btnUpdate.disabled = true;
  }
};
const invalidInput = function (milliseconds) {
  if (milliseconds < today.getTime()) {
    invalidIcon.classList.add('invalid');
    validIcon.classList.remove('valid');
    boxInput.classList.add('invalid');
    boxInput.classList.remove('valid');
    btnUpdate.disabled = true;
  }
};
const validInput = function (milliseconds) {
  if (milliseconds > today.getTime()) {
    invalidIcon.classList.remove('invalid');
    validIcon.classList.add('valid');
    boxInput.classList.remove('invalid');
    boxInput.classList.add('valid');
    btnUpdate.disabled = false;
  }
};

noInput();

inputDate.addEventListener('keyup', function () {
  const splitEventDate = inputDate.value.split('-');
  eventDay = splitEventDate[2];
  eventMonth = months[Number(splitEventDate[1])];
  eventYear = splitEventDate[0].slice(0, 2) === '00' ? null : splitEventDate[0];
  const eventDateToMilisseconds = new Date(
    `${eventMonth} ${eventDay}, ${eventYear} 00:00:00`
  ).getTime();
  noInput();
  validInput(eventDateToMilisseconds);
  invalidInput(eventDateToMilisseconds);
});

btnUpdate.addEventListener('click', function (e) {
  e.preventDefault();
  eventDate = new Date(
    `${eventMonth} ${eventDay}, ${eventYear} 00:00:00`
  ).getTime();
  eventDateText.textContent = inputDate.value;
  inputDate.value = '';
  noInput();
});

setInterval(function () {
  let now = new Date().getTime();
  let differenceBeetwenDates = eventDate - now;
  let daysToEventDate = Math.floor(
    differenceBeetwenDates / (1000 * 60 * 60 * 24)
  );
  let hoursToEventDate = Math.floor(
    (differenceBeetwenDates % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesToEventDate = Math.floor(
    (differenceBeetwenDates % (1000 * 60 * 60)) / (1000 * 60)
  );
  let secondsToEventDate = Math.floor(
    (differenceBeetwenDates % (1000 * 60)) / 1000
  );

  if (differenceBeetwenDates === 0) {
    return; /* TODO */
  } else if (eventDate === undefined) {
    return null;
  } else {
    timeText.textContent = `${
      hoursToEventDate < 10 ? `0${hoursToEventDate}` : hoursToEventDate
    }:${
      minutesToEventDate < 10 ? `0${minutesToEventDate}` : minutesToEventDate
    }:${
      secondsToEventDate < 10 ? `0${secondsToEventDate}` : secondsToEventDate
    }`;
    daysText.textContent = `${daysToEventDate} day${
      daysToEventDate > 1 ? 's' : ''
    }`;
  }
}, 1000);
