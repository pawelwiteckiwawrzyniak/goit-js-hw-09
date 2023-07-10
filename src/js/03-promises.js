import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = {
        position: position,
        delay: delay,
      };
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

function start(event) {
  event.preventDefault();

  const delayFirst = document.querySelector('[name=delay]').value;
  const delayStep = document.querySelector('[name=step]').value;
  const amount = document.querySelector('[name=amount]').value;

  for (let i = 0; i < amount; i + 1) {
    createPromise(i + 1, delayFirst + delayStep * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

const btn = document.querySelector('button');
btn.addEventListener('click', start);
