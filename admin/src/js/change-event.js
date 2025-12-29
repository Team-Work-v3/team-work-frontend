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

// ======= Подставляем данные в форму (без изменений) =======
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

    setInputValue("name_event", event.name);
    setInputValue("location_event", event.location);
    setInputValue("description_event", event.description);
    setInputValue("date_event", event.date);
    setInputValue("time_event", event.time);
    setInputValue("price_event", event.price);
    setInputValue("event_category", event.category);
    setInputValue("seats_event", event.seats);
    setInputValue("organizers_event", event.organizers);
    setInputValue("program_event", event.program);
    setInputValue("fullDescription_event", event.fullDescription);
}

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

const eventData = {
  created_by: 'admin',
  date_event: '2026-01-15',
  description_event: 'Конференция по искусственному интеллекту.',
  event_category: 'conference',
  event_id: 1,
  fullDescription_event: 'Полное описание конференции',
  images_events: '/admin/src/img/test.jpg',
  is_active: 1,
  location_event: 'Актовый зал университета',
  name_event: 'event1',
  organizers_event: 'ITeen Academy',
  price_event: 200,
  program_event: 'Доклады и дискуссии по А1',
  seats_event: 50,
  time_event: '10:00'
};


// Функция заполнения
function fillEventName(data) {
    const nameInput = document.getElementById('name_event');
    if (nameInput && data && data.name_event) {
        nameInput.value = data.name_event;
    }
}

// Вызов при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    if (window.eventData) {
        fillEventName(window.eventData);
    }
});