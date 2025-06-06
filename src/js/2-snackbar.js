import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(message => {
      iziToast.success({
        title: '✅',
        message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: '❌',
        message,
        position: 'topRight',
      });
    });
});
