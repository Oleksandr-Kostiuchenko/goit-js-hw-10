//TODO: Таймер зворотного відліку
//? Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах, інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демовідео роботи таймера.

//* Import libraries
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//* Find elements
const dateInput = document.querySelector('.date-input');
const startBtn = document.querySelector('.start-btn');

const clockValue = document.querySelectorAll('.value');
const daysValue = document.querySelector('.days');
const hoursValue = document.querySelector('.hours');
const minutesValue = document.querySelector('.minutes');
const secondsValue = document.querySelector('.seconds');

//* Initilizate library
let UserSelectedDeadline;

const DI = flatpickr(".date-input", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] - new Date() <= 0) {
            iziToast.show({
                message: 'Please choose a date in the future',
                messageColor: 'white',
                messageSize: '30',
                backgroundColor: 'red',
                theme: 'light',
            });
            
            dateInput.classList.add('error');
            startBtn.setAttribute("disabled", "");
            startBtn.classList.add('disabled');
        } else {
            startBtn.removeAttribute("disabled", "");
            startBtn.classList.remove('disabled');
            dateInput.classList.remove('error');

            UserSelectedDeadline = selectedDates[0];
        }
    },
});

//* Add event listener
const timer = {
    interval: null,

    start() {
            startBtn.setAttribute("disabled", "");
            startBtn.classList.add('disabled');
            dateInput.setAttribute("disabled", "");

            this.interval = setInterval(() => {
            const diff = UserSelectedDeadline - Date.now();
                
            if(diff <= 0){
                timer.stop();

                startBtn.removeAttribute("disabled", "");
                startBtn.classList.remove('disabled');
                dateInput.removeAttribute("disabled", "");
                dateInput.classList.remove('error');

                iziToast.show({
                    message: 'Time is out!🎉',
                    messageColor: 'white',
                    messageSize: '30',
                    backgroundColor: 'green',
                    theme: 'light',
                });
                return;
            }

            const timeComponents =  this.convertMs(diff);

            daysValue.textContent = this.padFunc(Math.floor(timeComponents.days));
            hoursValue.textContent = this.padFunc(Math.floor(timeComponents.hours));
            minutesValue.textContent = this.padFunc(Math.floor(timeComponents.minutes));
            secondsValue.textContent = this.padFunc(Math.floor(timeComponents.seconds));
        }, 1000)
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
},

    padFunc(num){
        return String(num).padStart(2, 0);
    },

    stop(){
        clearInterval(this.interval);

        clockValue.forEach((el) => { el.value = '00' });
    }
}

startBtn.addEventListener('click', () => {
    timer.start();
})