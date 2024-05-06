// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const inputPicker = document.querySelector('#datetime-picker');
const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let userSelectedDate;
let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
       if (userSelectedDate < new Date()) {
         startBtn.disabled = true;
         iziToast.error({
             title: "Error",
             message: "Please choose a date in the future",
            });
        } else {
         startBtn.disabled = false;
        }
    },
};

flatpickr(inputPicker, options);

startBtn.addEventListener('click', () => {
    if (!userSelectedDate || userSelectedDate < new Date()) {
        return
    };

    startBtn.disabled = true;
    inputPicker.disabled = true;

    const startTime = new Date();
    const endTime = userSelectedDate.getTime();

    function updateTimer() {
        const currentTime = new Date();
        const timeRemaining = endTime - currentTime.getTime();

        if (timeRemaining <= 0) {
         clearInterval(timerInterval);
         inputPicker.disabled = false;
         timerFields.days.textContent = '00';
         timerFields.hours.textContent = '00';
         timerFields.minutes.textContent = '00';
         timerFields.seconds.textContent = '00';
         return;
        }
        
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);

        timerFields.days.textContent = addLeadingZero(days.toString());
      timerFields.hours.textContent = addLeadingZero(hours.toString());
      timerFields.minutes.textContent = addLeadingZero(minutes.toString());
      timerFields.seconds.textContent = addLeadingZero(seconds.toString());
    }
    
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); 
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}