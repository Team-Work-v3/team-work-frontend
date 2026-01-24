// ======= Локальная заглушка для тестирования =======
function addTestData() {
    if (!localStorage.getItem("JSON")) {
        const jsonData = {
            "event": {
                "1": {
                    "id": 1,
                    "name": "Фильм 1",
                    "location": "Минск ул. Романовская Слобода 28",
                    "active": true,
                    "description": "Краткое описание фильма 1",
                    "date": "2025-12-05",
                    "time": "10:00",
                    "price": 300,
                    "category": "option 1",
                    "seats": 100,
                    "organizers": "Команда 1",
                    "program": "Программа фильма 1",
                    "fullDescription": "Полное описание фильма 1",
                    "images": ["src/img/event1.jpg"]
                },
                "2": {
                    "id": 2,
                    "name": "Фильм 2",
                    "location": "Минск ул. Притыцкого 23",
                    "active": true,
                    "description": "Краткое описание фильма 2",
                    "date": "2025-12-06",
                    "time": "12:00",
                    "price": 400,
                    "category": "option 2",
                    "seats": 150,
                    "organizers": "Команда 2",
                    "program": "Программа фильма 2",
                    "fullDescription": "Полное описание фильма 2",
                    "images": ["src/img/event2.jpg"]
                },
                "3": {
                    "id": 3,
                    "name": "Фильм 3",
                    "location": "Минск пр. Независимости 13",
                    "active": false,
                    "description": "Краткое описание фильма 3",
                    "date": "2025-12-07",
                    "time": "15:30",
                    "price": 500,
                    "category": "option 3",
                    "seats": 120,
                    "organizers": "Команда 3",
                    "program": "Программа фильма 3",
                    "fullDescription": "Полное описание фильма 3",
                    "images": []
                }

            }
        };
        localStorage.setItem("JSON", JSON.stringify(jsonData));
    }
}

// Получаем ID события из URL
function getEventIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // например "3"
}

// Достаём данные события по ID
function getEventData(id) {
    const data = JSON.parse(localStorage.getItem("JSON"));
    return data?.event[id];
}

// Подставляем данные в форму
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
    setInputValue("date-event", event.date);
    setInputValue("time-event", event.time);
    setInputValue("price-event", event.price);
    setInputValue("event-category", event.category);
    setInputValue("seats-event", event.seats);
    setInputValue("organizers-event", event.organizers);
    setInputValue("program-event", event.program);
    setInputValue("fullDescription-event", event.fullDescription);
}


// ======== Основная функция ========
document.addEventListener("DOMContentLoaded", () => {
    addTestData();
    const id = getEventIdFromURL();
    const eventData = getEventData(id);
    if (!eventData) {
        alert("Событие с таким ID не найдено в localStorage.");
        return;
    }
    populateForm(eventData);
});
