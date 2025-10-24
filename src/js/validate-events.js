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
}

function DateValidate(element) {

}

function TimeValidate(element) {

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