import Notiflix from 'notiflix';

const form = document.querySelector('form');

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

function startCreating(event) {
  event.preventDefault();

  const delayFirst = Number(form.delay.value);
  const delayStep = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 0; i < amount; i++) {
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
btn.addEventListener('click', startCreating);
