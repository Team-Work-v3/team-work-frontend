
document.addEventListener('DOMContentLoaded', function() {
    const myForm = document.getElementById("myForm");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const phoneInput = document.getElementById("phone");


  
    function validateField(inputElement) {
      const fieldId = inputElement.id;
      const value = inputElement.value.trim();

      const errorElement = document.getElementById(fieldId + 'Error');
      let isValid = true;

      
      errorElement.innerHTML = '';
      removeClass(inputElement, 'is-invalid');

      
      if (fieldId === 'name') {
        if (value === "") {
          errorElement.innerHTML = "Имя обязательно для заполнения.";
          isValid = false;
        } else if (value.length < 2) {
          errorElement.innerHTML = "Имя должно содержать не менее 2 символов.";
          isValid = false;
        } else if (!/^[а-яА-ЯёЁa-zA-Z\s.-]+$/.test(value)) {
          errorElement.innerHTML = "Имя может содержать только буквы, пробелы, дефисы и точки.";
          isValid = false;
        }
      } else if (fieldId === 'number') {
        if (value === "") {
          errorElement.innerHTML = "Номер обязателен для заполнения.";
          isValid = false;
        } else if (isNaN(value)) {
          errorElement.innerHTML = "Номер должен быть числом.";
          isValid = false;
        } else if (!Number.isInteger(parseFloat(value))) { 
          errorElement.innerHTML = "Номер должен быть целым числом.";
          isValid = false;
        } else if (parseInt(value) <= 0) {
          errorElement.innerHTML = "Номер должен быть положительным числом.";
          isValid = false;
        }
      } else if (fieldId === 'phone') {
        if (value === "") {
          errorElement.innerHTML = "Телефон обязателен для заполнения.";
                    isValid = false;
        } else {
          const phoneRegex = /^\+?\d{10,15}$/;
          if (!phoneRegex.test(value)) {
            errorElement.innerHTML = "Неверный формат телефона. Пример: +79001234567";
            isValid = false;
          }
        }
      }

      
      if (!isValid) {
        addClass(inputElement, 'is-invalid');
      }
      return isValid; 
    }

    
    [nameInput, numberInput, phoneInput].forEach(input => {
      input.addEventListener('focus', function() {
        addClass(input, 'focused');
      });

      input.addEventListener('blur', function() {
        removeClass(input, 'focused');
        validateField(input); 
      });
    });

    myForm.addEventListener('submit', function(event) {
      event.preventDefault(); 

      let formIsValid = true;

      formIsValid = validateField(nameInput) && formIsValid;
      formIsValid = validateField(numberInput) && formIsValid;
      formIsValid = validateField(phoneInput) && formIsValid;

      if (formIsValid) {
        alert("Форма успешно отправлена!");
        
        myForm.reset();
      } else {
        alert("Пожалуйста, исправьте ошибки в форме.");
      }
    });
});