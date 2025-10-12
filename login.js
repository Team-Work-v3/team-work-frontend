//храним верные логин и пароль в переменных
let correct_login = ''; //backend
let correct_password = ''; //backend

//Привязываем событие ВВОД к полю ЛОГИНА
let login = document.getElementById("login");
login.addEventListener('input', funct_login)

//Привязываем функцию к событию
function funct_login() {
    let value = login.value;
    //проверка: от 5 до 20 символов, только буквы, цифры, подчёркивания
    let login_regex = /^[a-zA-Zа-яА-Я0-9_]{5,20}$/;

    //если длина value() введенного поля меньше 5
    if (value.length < 5) {
        check_login.innerHTML = 'слишком короткий логин';
        check_login.style.color = 'red';
    }
    //если длина больше 20
    else if (value.length > 20) {
        check_login.innerHTML = 'слишком длинный логин';
        check_login.style.color = 'red';
    }
    //если не соответствует шаблону
    // восклицаиетльный знак нужен для проверки что условие не выполняется
    else if (!login_regex.test(value)) {
        check_login.innerHTML = 'логин содержит недопустимые символы';
        check_login.style.color = 'red';
    }
    //если введенное не совпадает
    else {
        check_login.innerHTML = '-';
        check_login.style.color = '';
    }
}

//привязываем событие ВВОДА к полю ПАРОЛЯ
password.addEventListener('input', funct_password)

//функция проверки
function funct_password() {
    let value = password.value;
    //проверка: от 6 до 30 символов, допускаются спецсимволы
    let password_regex = /^[a-zA-Zа-яА-Я0-9!@#\$%\^&\*\(\)_\+\-=]{6,30}$/;

    //если длина value(=содержимого) не меньше 3
    if (value.length < 6) {
        check_password.innerHTML = 'слишком короткий пароль';
        check_password.style.color = 'red';
    }
    //если длина больше 30
    else if (value.length > 30) {
        check_password.innerHTML = 'слишком длинный пароль';
        check_password.style.color = 'red';
    }
    // восклицаиетльный знак нужен для проверки что условие не выполняется
    //если не соответствует шаблону
    else if (!password_regex.test(value)) {
        check_password.innerHTML = 'пароль содержит недопустимые символы';
        check_password.style.color = 'red';
    }
    //предыдущих ошибок не было
    else {
        check_password.innerHTML = '-';
        check_password.style.color = '';
    }
}


