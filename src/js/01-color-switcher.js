const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let changeColorInterval = null;
stopBtn.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  changeColorInterval = setInterval(() => {
    changeColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(changeColorInterval);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
});
