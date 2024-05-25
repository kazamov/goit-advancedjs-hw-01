import throttle from 'lodash.throttle';

const LS_FORM_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');

function prepareFormData() {
  return {
    email: emailInput.value,
    message: messageInput.value,
  };
}

function setFormData() {
  const formData = prepareFormData();

  try {
    localStorage.setItem(LS_FORM_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

function getFormData() {
  try {
    const savedFormData = localStorage.getItem(LS_FORM_KEY);
    return savedFormData ? JSON.parse(savedFormData) : null;
  } catch (error) {
    console.error('Error retrieving from localStorage', error);
    return null;
  }
}

function submitFormData(event) {
  event.preventDefault();

  const formData = prepareFormData();

  console.log(formData);

  form.reset();

  localStorage.removeItem(LS_FORM_KEY);
}

const throttledSetFormData = throttle(setFormData, 500, { trailing: true });

form.addEventListener('input', throttledSetFormData);

form.addEventListener('submit', submitFormData);

const savedFormData = getFormData();

if (savedFormData) {
  emailInput.value = savedFormData.email;
  messageInput.value = savedFormData.message;
}
