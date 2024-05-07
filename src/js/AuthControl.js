import { LeadPage } from "./LeadPage.js";

const authContainer = document.createElement('div');
authContainer.classList.add('auth-container');

// Create the modal element
const authModal = document.createElement('div');
authModal.classList.add('auth-modal');

// Create the header span element
const authHeader = document.createElement('span');
authHeader.classList.add('auth-header');
authHeader.textContent = 'Авторизація';

// Create the form element
const authForm = document.createElement('form');
authForm.classList.add('auth-form');

// Create the login input element
const loginInput = document.createElement('input');
loginInput.setAttribute('type', 'text');
loginInput.setAttribute('id', 'login');
loginInput.setAttribute('name', 'login');
loginInput.classList.add('auth-input');
loginInput.setAttribute('placeholder', 'Логін');

// Create the password input element
const passInput = document.createElement('input');
passInput.setAttribute('type', 'text');
passInput.setAttribute('id', 'pass');
passInput.setAttribute('name', 'pass');
passInput.classList.add('auth-input');
passInput.setAttribute('placeholder', 'Пароль');

// Append login and password inputs to the form element
authForm.appendChild(loginInput);
authForm.appendChild(passInput);

// Create the login button element
const loginButton = document.createElement('button');
loginButton.classList.add('btn', 'login');
loginButton.textContent = 'Увійти';

// Append header, form, and button to the modal element
authModal.appendChild(authHeader);
authModal.appendChild(authForm);
authModal.appendChild(loginButton);

// Append the modal to the container element
authContainer.appendChild(authModal);

// Append the container element to the document body
document.body.appendChild(authContainer);

loginButton.addEventListener('click',()=>{
    document.body.removeChild(authContainer)
LeadPage()
})