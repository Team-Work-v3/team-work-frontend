function NameValidate(element) {
    const value = element.value;
    const valid = value.length < 5 || value.length > 100 || /[<>&]/.test(value);

    const errorText = document.getElementById("nameError");

    if (valid) {
        errorText.style.display = "block";
        return;
    }

    errorText.style.display = "none";
}

function DescriptionValidate(element) {
    const value = element.value;
    const valid = value.length < 50 || value.length > 5000;

    const errorText = document.getElementById("descriptionError");

    if (valid) {
        errorText.style.display = "block";
        return;
    }

    errorText.style.display = "none";

    // обрезание лишнего, 
    // html теги: br, strong, em, ul, ol, li
}

function DateValidate(element) {
    // не раньше текущей даты и начало и окончание,  
}

function TimeValidate(element) {
    // формат НН:ММ, хз надо ли, тк норм инпут
}

function LocationValidate(element) {
    const value = element.value;
    const valid = value.length < 2 || value.length > 100;
    
    const errorText = document.getElementById("locationError");
    
    if (valid) {
        errorText.style.display = "block";
        return;
    }
    
    errorText.style.display = "none";
    
    // проверка мероприятий в том же месте
    // проверка через гео
}

function PriceValidate(element) {
    let value = element.value.trim();
    const valid = value === "" || Number(value) < 0 || Number(value) > 100000;

    const errorText = document.getElementById("priceError");

    if (valid) {
        errorText.style.display = "block";
        return;
    }

    errorText.style.display = "none";
    element.value = Number(value).toFixed(2);

    // валидация валют
}

function SeatsValidate(element) {
    const value = element.value;
    const valid = value === "" || Number(value) <= 0 || Number(value) > 10000;

    const errorText = document.getElementById("seatsError");

    if (valid) {
        errorText.style.display = "block";
        return;
    }

    errorText.style.display = "none";
}

function ImagesValidate(element) {
    const maxSize = 5 * 1024 * 1024;
    const files = element.files;
    const errorText = document.getElementById("imagesError");

    if (!files || files.length === 0 || files.length > 10) {
        errorText.style.display = "block";
        return;
    }

    Array.from(files).forEach(file => {
        if (!file) {
            errorText.style.display = "block";
            return;
        }

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

        console.log(file.type)

        if (!allowedTypes.includes(file.type)) {
            errorText.style.display = "block";
            return;
        }

        if (file.size > maxSize) {
            errorText.style.display = "block";
            return;
        }

        const img = new Image();

        img.onload = () => {
            if (img.width < 800 || img.height < 600) {
                errorText.style.display = "block";
                return;
            }

            errorText.style.display = "none";
        }
        img.onerror = () => {
            errorText.style.display = "block";
            return;
        }
        img.src = URL.createObjectURL(file);
    });
}