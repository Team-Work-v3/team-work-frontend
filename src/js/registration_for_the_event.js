
alert('kj');
document.addEventListener('DOMContentLoaded', function() {
    const myForm = document.getElementById("myForm");

    
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const agreeCheckbox = document.getElementById("agree");

   


   
    function validateInput(inputElement) {
        const fieldId = inputElement.id;
        const errorElement = document.getElementById(fieldId + 'Error');
        let isValid = true;
        errorElement.innerHTML = '';
        removeClass(inputElement, 'is-invalid');
        inputElement.className.remove("is-invalid");

        
        if (fieldId === 'name' || fieldId === 'surname') {
            const value = inputElement.value.trim();
            if (value === "") {
                errorElement.innerHTML = (fieldId === 'name' ? "Имя" : "Фамилия") + " обязательно для заполнения.";
                isValid = false;
            } else if (value.length > 50) {
                errorElement.innerHTML = (fieldId === 'name' ? "Имя" : "Фамилия") + " не может быть длиннее 50 символов.";
                isValid = false;
            } else if (!/^[а-яА-ЯёЁa-zA-Z\s.-]+$/.test(value)) {
                errorElement.innerHTML = (fieldId === 'name' ? "Имя" : "Фамилия") + " может содержать только буквы, пробелы, дефисы и точки.";
                isValid = false;
            }
        } else if (fieldId === 'email') {
            const value = inputElement.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === "") {
                errorElement.innerHTML = "Почта обязательна для заполнения.";
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorElement.innerHTML = "Неверный формат почты.";
                isValid = false;
            } else if (value.length > 100) {
                errorElement.innerHTML = "Длина почты не может превышать 100 символов.";
                isValid = false;
            }
        } else if (fieldId === 'phone') {
            const value = inputElement.value.trim();
            const phoneRegex = /^\+?\d{10,15}$/;
            if (value === "") {
                errorElement.innerHTML = "Телефон обязателен для заполнения.";
                isValid = false;
            } else if (!phoneRegex.test(value)) {
                errorElement.innerHTML = "Неверный формат телефона (например, +79001234567).";
                isValid = false;
            } else if (value.length > 20) {
                errorElement.innerHTML = "Длина телефона не может превышать 20 символов.";
                isValid = false;
            }
        } else if (fieldId === 'agree') {
            if (!inputElement.checked) {
                errorElement.innerHTML = "Необходимо согласиться на обработку персональных данных.";
                isValid = false;
            }
        }

        
        if (!isValid) {
            addClass(inputElement, 'is-invalid');
        }
        return isValid;
    }


    const inputElements = [nameInput, surnameInput, emailInput, phoneInput];
    inputElements.forEach(input => {
        input.addEventListener('focus', function() {
            addClass(input, 'focused');
        });

        input.addEventListener('blur', function() {
            removeClass(input, 'focused');
            validateInput(input); 
        });
    });

   
    agreeCheckbox.addEventListener('change', function() {
        validateInput(agreeCheckbox);
    });


    myForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        let formIsValid = true;
        formIsValid = validateInput(nameInput) && formIsValid;
        formIsValid = validateInput(surnameInput) && formIsValid;
        formIsValid = validateInput(emailInput) && formIsValid;
        formIsValid = validateInput(phoneInput) && formIsValid;
        formIsValid = validateInput(agreeCheckbox) && formIsValid; 

        if (formIsValid) {
            alert("Форма успешно отправлена!");
            myForm.reset(); 
            inputElements.forEach(input => removeClass(input, 'is-invalid'));
            removeClass(agreeCheckbox, 'is-invalid');
        } else {
            alert("Пожалуйста, исправьте ошибки в форме.");
        }
    });
});
