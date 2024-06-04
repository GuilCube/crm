import { showAlert } from "./lib.js";

function saveCredentials(user,role) {
    localStorage.setItem('user', user);
    localStorage.setItem('role', role);
}

export function AuthPage() {
    
    $(document).ready(function () {
        // Create the main container
        const $main = $('main');
        const $authContainer = $('<div>').addClass('auth-container');
        const $authModal = $('<div>').addClass('auth-modal');
        const $authHeader = $('<span>').addClass('auth-header').text('Авторизація');
        const $authForm = $('<form>').addClass('auth-form');
        const $loginInput = $('<input>')
            .attr({
                type: 'text',
                id: 'login',
                name: 'login',
                placeholder: 'Логін'
            })
            .addClass('auth-input');

        // Create the password input element
        const $passInput = $('<input>')
            .attr({
                type: 'text',
                id: 'pass',
                name: 'pass',
                placeholder: 'Пароль'
            })
            .addClass('auth-input');

        // Append login and password inputs to the form element
        $authForm.append($loginInput, $passInput);

        // Create the login button element
        const $loginButtonElement = $('<a>').addClass('login')
        const $loginButton = $('<button>').addClass('btn auth rt').text('Увійти');
        $loginButtonElement.append($loginButton);

        // Append header, form, and button to the modal element
        $authModal.append($authHeader, $authForm, $loginButtonElement);

        // Append the modal to the container element
        $authContainer.append($authModal);

        // Append the container element to the document body
        $main.append($authContainer);

        $loginButton.click(function (e) {
            e.preventDefault();
            const dataGET = { 
                login:$loginInput.val(), 
                password: $passInput.val()
            }
            console.log(dataGET);
            console.log(JSON.stringify(dataGET)); 
            $.ajax({
                type: 'POST',
                url: 'authControl.php', 
                data: JSON.stringify(dataGET),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success:function(response) {
                    if (response.status === 'success') {
                        if (response.role === 'manager') {
                            saveCredentials(response.user,response.role)
                            window.location.href = '/lead';
                        } else if (response.role === 'depotworker') {
                            saveCredentials(response.user,response.role)
                            window.location.href = '/orderDepot';
                        }
                    } else {
                        showAlert('Неправильний логін або пароль',2000,'red')
                    }
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    showAlert("Не вказаний логін або пароль",2000,'red')
                }
            });
        });
    });
}
