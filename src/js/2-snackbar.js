//TODO: Генератор промісів
//? Напиши скрипт, який після сабміту форми створює проміс.  

//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//* Find elements 
const formEl = document.querySelector('form');
const delayInput = document.querySelector('.delay-input');
const stateInputFieldset = document.querySelector('.state-input-fieldset');
const notificatBtn = document.querySelector('.notificate-btn');
const radio = document.querySelectorAll('.radio-input');

//* Add event listener
const onFormSubmit = delay => {
    let promiseStatus;
    radio.forEach((el) => {
        if (el.checked) {
                promiseStatus = el.value;
        }
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (promiseStatus === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else if(promiseStatus === 'rejected') {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });

    return promise;
}

formEl.addEventListener('submit', event => {
    event.preventDefault();
    
    onFormSubmit(delayInput.value)
    .then(message => {
        console.log(message);

        iziToast.show({
            message: message,
            messageColor: 'white',
            messageSize: '30',
            backgroundColor: 'green',
            theme: 'light',
        });
    })
    .catch(message => {
        console.log(message); 

        iziToast.show({
            message: message,
            messageColor: 'white',
            messageSize: '30',
            backgroundColor: 'red',
            theme: 'light',
        });
    })

    delayInput.value = '';
    radio.forEach((el) => {
        el.checked = false;
    });
});
