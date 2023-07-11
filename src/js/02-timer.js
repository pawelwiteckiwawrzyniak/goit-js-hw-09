import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const timerElement = document.querySelectorAll('.field');
const timerValue = document.querySelectorAll('.field .value');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
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

const options = {
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
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setTime() {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function updateTime() {
  if (ms < 1000) {
    clearInterval(timerId);
    return;
  }
  ms -= 1000;
  setTime();
}

function startCountdown() {
  timerId = setInterval(updateTime, 1000);
  startBtn.setAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');
}

startBtn.setAttribute('disabled', '');
startBtn.addEventListener('click', () => startCountdown());
flatpickr(inputDate, options);
