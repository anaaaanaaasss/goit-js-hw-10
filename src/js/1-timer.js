const refs = {
    startBtn: document.querySelector('[data-start]'),
    dateInput: document.querySelector('#datetime-picker'),
  };
  
  let userSelectedDate = null;
  refs.startBtn.disabled = true;
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const now = new Date();
  
      if (selectedDate <= now) {
        iziToast.error({
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
        refs.startBtn.disabled = true;
      } else {
        userSelectedDate = selectedDate;
        refs.startBtn.disabled = false;
      }
    },
  };
  
flatpickr(refs.dateInput, options);
  
let timerId = null;

refs.startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  refs.startBtn.disabled = true;
  refs.dateInput.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer(0);
      refs.dateInput.disabled = false;
      return;
    }

    updateTimer(diff);
  }, 1000);
});