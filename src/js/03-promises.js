import Notiflix from 'notiflix';

const delayFirst = document.querySelector('[name=delay]');
const delayStep = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const btn = document.querySelector('button');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
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
  return promise;
}

function start(event) {
  event.preventDefault();

  for (let i = 0; i < amount.value; i + 1) {
    createPromise(i + 1, delayFirst.value + delayStep.value * i)
      .then(result => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(result => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

btn.addEventListener('click', start);
