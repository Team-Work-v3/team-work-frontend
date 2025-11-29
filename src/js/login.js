//храним верные логин и пароль в переменных
let correct_login = ''; //backend
let correct_password = ''; //backend

//Привязываем события ФОКУСА и ПОТЕРИ ФОКУСА к полю ЛОГИНА
login.addEventListener('focus', clear_login_message);
login.addEventListener('blur', validate_login);

//функция очистки сообщения при фокусе
function clear_login_message() {
    check_login.innerHTML = '';
}

//функция проверки логина при потере фокуса
function validate_login() {
    let value = login.value;
    let login_regex = /^[\wа-яА-Я]{2,50}$/;

    //если длина value() введенного поля меньше 2
    if (value.length < 2) {
        check_login.innerHTML = 'Слишком короткий логин';
        check_login.style.color = 'red';
    }
    //если длина больше 50
    else if (value.length > 50) {
        check_login.innerHTML = 'Слишком длинный логин';
        check_login.style.color = 'red';
    }
    //если соответствует шаблону
    else if (login_regex.test(value)) {
        check_login.innerHTML = '';
        check_login.style.color = '';
    }
    //если не соответствует шаблону  
    else {
        check_login.innerHTML = 'Используй только буквы, цифры и _';
        check_login.style.color = 'red';
    }
}

//Привязываем события ФОКУСА и ПОТЕРИ ФОКУСА к полю ПАРОЛЯ
password.addEventListener('focus', clear_password_message);
password.addEventListener('blur', validate_password);

//функция очистки сообщения при фокусе
function clear_password_message() {
    check_password.innerHTML = '';
}

//функция проверки пароля при потере фокуса
function validate_password() {
    let value = password.value;
    let password_regex = /^[a-zA-Zа-яА-Я0-9!@#\$%\^&\*\(\)_\+\-=]{6,30}$/;

    //если длина value(=содержимого) не меньше 3
    if (value.length < 6) {
        check_password.innerHTML = 'Слишком короткий пароль';
        check_password.style.color = 'red';
    }
    //если длина больше 30
    else if (value.length > 30) {
        check_password.innerHTML = 'Слишком длинный пароль';
        check_password.style.color = 'red';
    }
    //если соответствует шаблону
    else if (password_regex.test(value)) {
        check_password.innerHTML = '';
        check_password.style.color = '';
    }
    //если не соответствует шаблону
    else {
        check_password.innerHTML = 'Используй допустимые символы';
        check_password.style.color = 'red';
    }
}