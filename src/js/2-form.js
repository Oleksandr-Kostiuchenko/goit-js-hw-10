//TODO: Форма
//?  У JS напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

//* Find elements
const feedbackForm = document.querySelector('.feedback-form');

//* Create Obj
let formData = {
    email: "", 
    message: "",
}

//* Fill form
const fillForm = () => {
    try{
        const formDataLS = JSON.parse(localStorage.getItem('feedback-form-state'));
        
        if(formDataLS === null){
            return;
        }
        
        formData = formDataLS;
        for(let key in formDataLS){
            feedbackForm.elements[key].value = formDataLS[key];
        }
    } catch (err){
        console.log(err);
    }
}
fillForm();

//* Add event listeners and function for saving data in LS
const onFormInput = event => {
    const {target: elInput} = event;

    const inputName = elInput.name;
    const inputValue = elInput.value;

    formData[inputName] = inputValue;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

feedbackForm.addEventListener('input', onFormInput)

//* Add event listeners and function for submiting form
const onFormSubmit = event => {
    event.preventDefault();

    const email = event.target.elements.email.value.trim();
    const message = event.target.elements.message.value.trim();
        
    if (email === '' || message === '') {
        alert('Fill please all fields');
        return;
    }else {
        localStorage.removeItem('feedback-form-state');
        console.log(formData);

        formData = {
            email: "", 
            message: "",
        }

        feedbackForm.reset();
    }

};

feedbackForm.addEventListener('submit', onFormSubmit);