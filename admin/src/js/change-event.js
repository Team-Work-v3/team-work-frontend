// Получаем ID события из URL
function getEventIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // например "3"
}

// Асинхронно достаём данные события по ID из API
// Эта функция заменяет вашу getEventData(id)
async function fetchEventData(id) {
    const apiUrl = `http://localhost:3000/api/getEvent/${id}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных с API:", error);
        alert("Не удалось загрузить данные мероприятия с API.");
        return null;
    }
}


// Подставляем данные в форму (функция остается почти без изменений)
function populateForm(event) {
    if (!event) return;

    const setInputValue = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (el.tagName === "SELECT") {
            const optionExists = Array.from(el.options).some(opt => opt.value === value);
            if (optionExists) el.value = value;
        } else {
            el.value = value ?? "";
        }
    };

    setInputValue("name-event", event.name);
    setInputValue("location-event", event.location);
    setInputValue("description-event", event.description);
    setInputValue("date-event", event.date); // Ваша заглушка использует формат YYYY-MM-DD, который подходит для input type="date"
    setInputValue("time-event", event.time);
    setInputValue("price-event", event.price);
    setInputValue("event-category", event.category);
    setInputValue("seats-event", event.seats);
    setInputValue("organizers-event", event.organizers);
    setInputValue("program-event", event.program);
    setInputValue("fullDescription-event", event.fullDescription);
}


// Используем async/await для корректной работы с асинхронной fetchEventData
document.addEventListener("DOMContentLoaded", async () => {
    // addTestData(); // Заглушка больше не нужна
    const id = getEventIdFromURL();
    
    if (!id) {
        console.warn("ID события не найден в URL.");
        return;
    }

    // Ожидаем получение данных с API
    const eventData = await fetchEventData(id); 

    if (!eventData) {
        // Ошибка уже была обработана и выведено alert внутри fetchEventData
        return;
    }
    
    populateForm(eventData);
});
