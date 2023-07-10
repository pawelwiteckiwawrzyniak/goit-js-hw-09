import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let inputDate = document.querySelector('#datetime-picker');
let startBtn = document.querySelector('[data-start]');
let timer = document.querySelector('.timer');
let timerElement = document.querySelectorAll('.field');
let timerValue = document.querySelectorAll('.field .value');
let daysValue = document.querySelector('[data-days]');
let hoursValue = document.querySelector('[data-hours]');
let minutesValue = document.querySelector('[data-minutes]');
let secondsValue = document.querySelector('[data-seconds]');
let ms;
let timerId;

inputDate.style.margin = '20px 0 0 20px';
timer.style.display = 'flex';
timer.style.margin = '20px 20px';
timerElement.forEach(e => {
  e.style.display = 'flex';
  e.style.flexDirection = 'column';
  e.style.marginRight = '20px';
  e.style.textAlign = 'center';
  e.style.textTransform = 'uppercase';
  e.style.width = '70px';
});
timerValue.forEach(e => {
  e.style.fontSize = '30px';
});

let options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ms = selectedDates[0].getTime() - options.defaultDate.getTime();

    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    setTime();
    startBtn.removeAttribute('disabled');
  },
};

function convertMs(ms) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let days = Math.floor(ms / day);
  let hours = Math.floor((ms % day) / hour);
  let minutes = Math.floor(((ms % day) % hour) / minute);
  let seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

function setTime() {
  let { days, hours, minutes, seconds } = convertMs(ms);
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
};

function updateTime() {
  if (ms < 1000) {
    clearInterval(timerId);
    return;
  }
  ms -= 1000;
  setTime();
};

function startCountdown() {
  timerId = setInterval(updateTime, 1000);
  startBtn.setAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');
};

startBtn.setAttribute('disabled', '');
startBtn.addEventListener('click', () => startCountdown());
let flatpickr = flatpickr(inputDate, options);
