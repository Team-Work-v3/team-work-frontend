// // ======= Локальная заглушка для тестирования =======
// function addTestData() {
//     if (!localStorage.getItem("JSON")) {
//         const jsonData = {
//             "event": {
//                 "1": {
//                     "id": 1,
//                     "name": "Фильм 1",
//                     "location": "Минск ул. Романовская Слобода 28",
//                     "active": true,
//                     "description": "Краткое описание фильма 1",
//                     "date": "2025-12-05",
//                     "time": "10:00",
//                     "price": 300,
//                     "category": "option 1",
//                     "seats": 100,
//                     "organizers": "Команда 1",
//                     "program": "Программа фильма 1",
//                     "fullDescription": "Полное описание фильма 1",
//                     "images": ["src/img/event1.jpg"]
//                 },
//                 "2": {
//                     "id": 2,
//                     "name": "Фильм 2",
//                     "location": "Минск ул. Притыцкого 23",
//                     "active": true,
//                     "description": "Краткое описание фильма 2",
//                     "date": "2025-12-06",
//                     "time": "12:00",
//                     "price": 400,
//                     "category": "option 2",
//                     "seats": 150,
//                     "organizers": "Команда 2",
//                     "program": "Программа фильма 2",
//                     "fullDescription": "Полное описание фильма 2",
//                     "images": ["src/img/event2.jpg"]
//                 },
//                 "3": {
//                     "id": 3,
//                     "name": "Фильм 3",
//                     "location": "Минск пр. Независимости 13",
//                     "active": false,
//                     "description": "Краткое описание фильма 3",
//                     "date": "2025-12-07",
//                     "time": "15:30",
//                     "price": 500,
//                     "category": "option 3",
//                     "seats": 120,
//                     "organizers": "Команда 3",
//                     "program": "Программа фильма 3",
//                     "fullDescription": "Полное описание фильма 3",
//                     "images": []
//                 }

//             }
//         };
//         localStorage.setItem("JSON", JSON.stringify(jsonData));
//     }
// }

// // Получаем ID события из URL
// function getEventIdFromURL() {
//     const params = new URLSearchParams(window.location.search);
//     return params.get("id"); // например "3"
// }

// // Достаём данные события по ID
// function getEventData(id) {
//     const data = JSON.parse(localStorage.getItem("JSON"));
//     return data?.event[id];
// }

// // Подставляем данные в форму
// function populateForm(event) {
//     if (!event) return;

//     const setInputValue = (id, value) => {
//         const el = document.getElementById(id);
//         if (!el) return;

//         if (el.tagName === "SELECT") {
//             const optionExists = Array.from(el.options).some(opt => opt.value === value);
//             if (optionExists) el.value = value;
//         } else {
//             el.value = value ?? "";
//         }
//     };

//     setInputValue("name-event", event.name);
//     setInputValue("location-event", event.location);
//     setInputValue("description-event", event.description);
//     setInputValue("date-event", event.date);
//     setInputValue("time-event", event.time);
//     setInputValue("price-event", event.price);
//     setInputValue("event-category", event.category);
//     setInputValue("seats-event", event.seats);
//     setInputValue("organizers-event", event.organizers);
//     setInputValue("program-event", event.program);
//     setInputValue("fullDescription-event", event.fullDescription);
// }


// // ======== Основная функция ========
// document.addEventListener("DOMContentLoaded", () => {
//     addTestData();
//     const id = getEventIdFromURL();
//     const eventData = getEventData(id);
//     if (!eventData) {
//         alert("Событие с таким ID не найдено в localStorage.");
//         return;
//     }
//     populateForm(eventData);
// });

// Получаем ID события из URL

// Асинхронно достаём данные события по ID из API
// Эта функция заменяет вашу getEventData(id)
// async function fetchEventData(id) {
//     const apiUrl = `http://62.109.16.129:5000//api/getEvent/`;

//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Ошибка при получении данных с API:", error);
//         alert("Не удалось загрузить данные мероприятия с API.");
//         return null;
//     }
// }


// ======= Функция получения данных из API =======
async function fetchEventData(id) {
    try {
        // Запрашиваем все события (как в вашем примере)
        const info ={
            'id':id
        };
        let inf = JSON.stringify(info);
        console.log(inf);
        const response = await fetch(`http://62.109.16.129:5000/api/getEvent`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: inf
        });
        const data = await response.json();
        
        console.log(data);//!!!!!!!!!!!!!!!!!!!!!!!!!
        // Ищем нужное событие в массиве data.events по ID
        // Приводим к строке для надежности сравнения
        const event = data.events.find(item => String(item.id) === String(id));
        
        return event;
    } catch (error) {
        console.error("Ошибка при получении данных с API:", error);
        return null;
    }
}

function populateForm(event) {
    if (!event) return;

    const setInputValue = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;

        // Если значение undefined/null — ставим пустую строку
        let safeValue = value ?? "";

        // Если это дата, берем только часть YYYY-MM-DD (на случай ISO формата)
        if (el.type === "date" && typeof safeValue === "string") {
            safeValue = safeValue.split("T")[0];
        }

        if (el.tagName === "SELECT") {
            // Для селекта проверяем соответствие значения
            const optionExists = Array.from(el.options).some(opt => opt.value == safeValue);
            if (optionExists) {
                el.value = safeValue;
            }
        } else {
            el.value = safeValue;
        }
    };

    // Сопоставляем ID из HTML с ключами из вашего объекта API
    setInputValue("name_event", event.name_event);
    setInputValue("location_event", event.location_event);
    setInputValue("description_event", event.description_event);
    setInputValue("date_event", event.date_event);
    setInputValue("time_event", event.time_event);
    setInputValue("price_event", event.price_event); 
    setInputValue("event_category", event.event_category);
    setInputValue("seats_event", event.seats_event);
    setInputValue("organizers_event", event.organizers_event);
    setInputValue("program_event", event.program_event);
    setInputValue("fullDescription_event", event.fullDescription_event);
}



// ======= Подставляем данные в форму (без изменений) ======
// function populateForm(event) {
//     if (!event) return;

//     const setInputValue = (id, value) => {
//         const el = document.getElementById(id);
//         if (!el) return;

//         if (el.tagName === "SELECT") {
//             const optionExists = Array.from(el.options).some(opt => opt.value === value);
//             if (optionExists) el.value = value;
//         } else {
//             el.value = value ?? "";
//         }
//     };

//     setInputValue("name_event", event.name);
//     setInputValue("location_event", event.location);
//     setInputValue("description_event", event.description);
//     setInputValue("date_event", event.date);
//     setInputValue("time_event", event.time);
//     setInputValue("price_event", event.price);
//     setInputValue("event_category", event.category);
//     setInputValue("seats_event", event.seats);
//     setInputValue("organizers_event", event.organizers);
//     setInputValue("program_event", event.program);
//     setInputValue("fullDescription_event", event.fullDescription);
// }

// ======= Получаем ID из URL =======
function getEventIdFromURL() {
    // const params = new URLSearchParams(window.location.search);
    // return params.get("id");

    // Получаем текущий URL
    const url = window.location.href; // Например: "http://example.com/admin/change-event/1"

    // Получаем путь из URL
    const path = window.location.pathname; // Например: "/admin/change-event/1"

    // Разделяем путь по слешу '/'
    const pathParts = path.split('/'); // Получаем массив: ["", "admin", "change-event", "1"]

    // Получаем последний элемент (ID)
    const eventId = pathParts[pathParts.length - 1]; // Или просто pathParts[3] для этого конкретного случая

    console.log(eventId); // Выведет: "1"

    // Если вам нужно число, а не строка
    const eventIdNumber = parseInt(eventId, 10);
    return eventIdNumber; // Выведет: 1
}   

// ======== Основная логика при загрузке страницы ========
document.addEventListener("DOMContentLoaded", async () => {
    const id = getEventIdFromURL();
    
    if (!id) {
        console.log("ID события не найден в URL");
        return;
    }

    const eventData = await fetchEventData(id);

    if (!eventData) {
        console.log("Событие с ID " + id + " не найдено в базе API");
        return;
    }

    populateForm(eventData);
});


