function NameValidate(element) {
    const value = element.value;

    const errorText = document.getElementById("nameError");

    let all_errors = '';

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {

        const valid_min = value.length < 5;
        const valid_max = value.length > 100;
        const valid_symbols = /[<>&]/.test(value);

        if (valid_min) {
            all_errors += 'Длина строки должна быть не меньше 5 символов<br>';
        }
        if (valid_max) {
            all_errors += 'Длина строки должна быть не больше 100 символов<br>';
        }

        if (valid_symbols) {
            all_errors += 'Вы можете ввести в поле символы русского, английского алфавита, цифры, спец. символы: @ . , : _ ';
        }

        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }

    }

}

function DescriptionValidate(element) {
    const value = element.value;

    const errorText = document.getElementById("descriptionError");

    let all_errors = '';

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {

        const valid_min = value.length < 50;
        const valid_max = value.length > 350;

        if (valid_min) {
            all_errors += 'Длина строки должна быть не меньше 50 символов<br>';
        }
        if (valid_max) {
            all_errors += 'Длина строки должна быть не больше 350 символов<br>';
        }

        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }

    }
}

function DateValidate(element) {
    const value = element.value;

    const errorText = document.getElementById("dateError");

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {
        errorText.style.display = "none";

    }
}

function TimeValidate(element) {
    const value = element.value;

    const errorText = document.getElementById("timeError");

    let all_errors = '';

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {
        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }

    }
}

function LocationValidate(element) {
    const value = element.value;

    const errorText = document.getElementById("locationError");

    let all_errors = '';

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {
        const valid_min = value.length < 3;
        const valid_max = value.length > 100;
        if (valid_min) {
            all_errors += 'Длина строки должна быть не меньше 2 символов<br>';
        }
        if (valid_max) {
            all_errors += 'Длина строки должна быть не больше 100 символов<br>';
        }

        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }
        // ГЕОКОДИНГ
    }
}

// function PriceValidate(element) {
//     // 1. Используем parseFloat для работы с десятичными числами
//     let value = parseFloat(element.value); 
//     const maxValue = 100000;
//     const errorText = document.getElementById("priceError");

//     if (!isNaN(value)) {
//         if (value > maxValue) {
//             value = maxValue;
//         }
        
//         // 2. Округляем и форматируем значение до двух знаков после запятой
//         // Преобразуем обратно в строку для отображения в input
//         element.value = value.toFixed(2); 
//     }

//     const valid_empty = element.value.length === 0;
//     if (valid_empty) {
//         errorText.textContent = 'заполните поле';
//         errorText.style.display = "block";
//     } else {
//         errorText.style.display = "none";
//     }

//     // валидация валют
// }

  // Актуальные курсы валют на 7 декабря 2025 г СДЕЛАНО С ПОМОЩЬЮ НЕЙРОНКИ.
    const EXCHANGE_RATES = {
        'RUB_USD': 1 / 76.88,
        'RUB_EUR': 1 / 89.45,
        'USD_RUB': 76.88,
        'USD_EUR': 0.86,
        'EUR_RUB': 89.45,
        'EUR_USD': 1.16,
    };

    // Глобальная переменная для хранения исходного значения и валюты
    // Это нужно, чтобы знать, от чего отталкиваться при конвертации
    let storedValue = {
        amount: 0,
        currency: 'RUB'
    };

    // Функция конвертации
    function convertAmount(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return amount;
        }
        const rateKey = `${fromCurrency}_${toCurrency}`;
        const rate = EXCHANGE_RATES[rateKey];
        if (rate) {
            return amount * rate;
        }
        return amount; // Если курс не найден, возвращаем как есть
    }

    // Обработчик смены валюты в выпадающем списке
    function CurrencyChangeHandler() {
        const currencySelect = document.getElementById("currency-select");
        const newCurrency = currencySelect.value;
        
        // Конвертируем сохраненное (исходное) значение в новую валюту
        const newValue = convertAmount(storedValue.amount, storedValue.currency, newCurrency);
        
        const priceInput = document.getElementById("price-event");
        // Обновляем поле ввода новым значением
        priceInput.value = newValue.toFixed(2); 

        // Обновляем сохраненное значение
        storedValue.amount = newValue;
        storedValue.currency = newCurrency;
        
        // Запускаем валидацию для нового значения
        PriceValidate(priceInput);
    }

    // Ваша функция валидации, доработанная
    function PriceValidate(element) {
        let value = parseFloat(element.value); 
        const errorText = document.getElementById("priceError");
        const currencySelect = document.getElementById("currency-select");
        const selectedCurrency = currencySelect.value;

        // 1. Проверка на пустое поле
        const valid_empty = element.value.trim() === '';
        if (valid_empty) {
            errorText.textContent = 'заполните поле';
            errorText.style.display = "block";
            storedValue.amount = 0; // Сбрасываем сохраненное значение
            return; 
        } else {
            errorText.style.display = "none";
        }
        
        if (isNaN(value)) {
            errorText.textContent = 'Некорректное число';
            errorText.style.display = "block";
            return;
        }

        // Обновляем сохраненное значение, когда пользователь вводит цифры
        storedValue.amount = value;
        storedValue.currency = selectedCurrency;

        // 2. Валидация лимитов 
        let currentMaxValue;
        if (selectedCurrency === 'USD') {
            currentMaxValue = 10000; 
        } else if (selectedCurrency === 'EUR') {
            currentMaxValue = 9000;
        } else { // RUB
            currentMaxValue = 1000000;
        }

        if (value > currentMaxValue) {
            element.value = currentMaxValue; 
            storedValue.amount = currentMaxValue; // Обновляем сохраненное значение
            errorText.textContent = `Максимальная цена в ${selectedCurrency}: ${currentMaxValue.toLocaleString()}`;
            errorText.style.display = "block"; 
        } else {
            errorText.style.display = "none"; 
        }
    }

    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', (event) => {
        const priceInput = document.getElementById("price-event");
        // Устанавливаем начальное значение в storedValue при загрузке
        storedValue.amount = parseFloat(priceInput.value) || 0;
        storedValue.currency = document.getElementById("currency-select").value;
    });


function CategoryValidate(element) {
    const errorText = document.getElementById("selectError");

        if (element.value === "") {
            errorText.textContent = 'заполните поле';
            errorText.style.display = "block";
        } else {
            errorText.style.display = "none";
        };
}


function SeatsValidate(element) {
    const errorText = document.getElementById("seatsError");

        if (element.value === "") {
            errorText.textContent = 'заполните поле';
            errorText.style.display = "block";
        } else {
            errorText.style.display = "none";
        };
}

function ImagesValidate(element) {
    const maxSize = 5 * 1024 * 1024;
    const files = element.files;
    const errorText = document.getElementById("imagesError");

if (!files || files.length === 0) {
        errorText.textContent = 'Пожалуйста, выберите хотя бы одно изображение.';
        errorText.style.display = "block";
        return;
    } 
    else if (files.length > 10) {
        errorText.textContent = 'Максимальное количество файлов: 10.';
        errorText.style.display = "block";
        return;
    } 
    else {
        errorText.style.display = "none";  
    }


    Array.from(files).forEach(file => {
        if (!file) {
            errorText.style.display = "block";
            return;
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

        console.log(file.type)

        if (!allowedTypes.includes(file.type)) {
            errorText.textContent = 'Неподдерживаемый формат. Используйте JPEG, PNG или WebP';
            errorText.style.display = "block";
            return;
        }

        if (file.size > maxSize) {
            errorText.textContent = 'Файл слишком большой. Максимальный размер: 5MB';
            errorText.style.display = "block";
            return;
        }

        const img = new Image();

        img.onload = () => {
            if (img.width < 800 || img.height < 600) {
                errorText.textContent = 'Изображение слишком маленькое. Минимальный размер: 800×600px';
                errorText.style.display = "block";
                return;
            }

            errorText.style.display = "none";
        }
        img.onerror = () => {
            errorText.textContent = 'Некорректное соотношение сторон. Рекомендуется 4:3 или 16:9' // возможно некорректно
            errorText.style.display = "block";
            return;
        }
        img.src = URL.createObjectURL(file);
    });
}

// 05.12.2025

function organizersValidate(element) {
    const value = element.value;

    const errorText = document.getElementById("organizersError");

    let all_errors = '';

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {

        const valid_min = value.length < 5;
        const valid_max = value.length > 100;
        const valid_symbols = /[<>&]/.test(value);

        if (valid_min) {
            all_errors += 'Длина строки должна быть не меньше 5 символов<br>';
        }
        if (valid_max) {
            all_errors += 'Длина строки должна быть не больше 100 символов<br>';
        }

        if (valid_symbols) {
            all_errors += 'Вы можете ввести в поле символы русского, английского алфавита, цифры, спец. символы: @ . , : _ ';
        }

        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }

    }
}

function programValidate(element) {
   const value = element.value;

    const errorText = document.getElementById("programError");

    let all_errors = '';

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {

        const valid_min = value.length < 5;
        const valid_max = value.length > 100;
        const valid_symbols = /[<>&]/.test(value);

        if (valid_min) {
            all_errors += 'Длина строки должна быть не меньше 5 символов<br>';
        }
        if (valid_max) {
            all_errors += 'Длина строки должна быть не больше 100 символов<br>';
        }

        if (valid_symbols) {
            all_errors += 'Вы можете ввести в поле символы русского, английского алфавита, цифры, спец. символы: @ . , : _ ';
        }

        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }

    }
}

function fullDescriptionValidate(element) {
   const value = element.value;

    const errorText = document.getElementById("fullDescriptionError");

    let all_errors = '';
    
    // КОД ДЛЯ АВТОМАТИЧЕСКОГО ОБРЕЗАНИЯ
    const maxLength = 600;
    if (value.length > maxLength) {
        const trimmedValue = value.substring(0, maxLength);
        element.value = trimmedValue;
        value = trimmedValue; 
    }
    // ---

    const valid_empty = value.length == 0;
    if (valid_empty) {
        errorText.textContent = 'заполните поле';
        errorText.style.display = "block";
    }
    else {

        const valid_min = value.length < 50;
        const valid_max = value.length > 600; 

        if (valid_min) {
            all_errors += 'Длина строки должна быть не меньше 50 символов<br>';
        }
        if (valid_max) {
            all_errors += 'Длина строки должна быть не больше 600 символов<br>';
        }
        if (all_errors) {
            errorText.innerHTML = all_errors;
            errorText.style.display = "block";
        }
        else {
            errorText.style.display = "none";
        }

    }
}

