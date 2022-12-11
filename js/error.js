/* eslint-disable no-unused-vars */

const errorElement = document.querySelector('#errordiv');
const errorTextElement = errorElement.querySelector('#err_msg');
const dismissBtn = errorElement.querySelector('.err_modal_dismiss');

dismissBtn.addEventListener('click',  () => {
  errorElement.classList.add('hidden');
});

const showError = (message) => {
  errorTextElement.textContent = message;
  errorElement.classList.remove('hidden');
};

export {
  showError
};

