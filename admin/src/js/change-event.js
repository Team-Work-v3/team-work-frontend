// ======= Функция получения данных из API =======
async function fetchEventData(id) {
    try {
        const info = { 'id': id };
        let inf = JSON.stringify(info);
        
        const response = await fetch(`62.109.16.129`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: inf
        });
        
        const data = await response.json();
        console.log("Данные от сервера:", data);

        // ВАЖНО: В вашем объекте ключ называется event_id, а не id
        const event = data.events.find(item => String(item.event_id) === String(id));
        
        return event;
    } catch (error) {
        console.error("Ошибка при получении данных с API:", error);
        return null;
    }
}

// ======= Подстановка данных в форму =======
function populateForm(event) {
    if (!event) return;

    const setInputValue = (id, value) => {
        const el = document.getElementById(id);
        if (!el) {
            console.warn(`Элемент с id="${id}" не найден на странице`);
            return;
        }

        let safeValue = value ?? "";

        // Корректировка для типа date (нужен формат YYYY-MM-DD)
        if (el.type === "date" && typeof safeValue === "string") {
            safeValue = safeValue.split("T")[0];
        }

        if (el.tagName === "SELECT") {
            // Используем нестрогое сравнение (==), чтобы сопоставить строку и число
            const optionExists = Array.from(el.options).some(opt => opt.value == safeValue);
            if (optionExists) {
                el.value = safeValue;
            }
        } else {
            el.value = safeValue;
        }
    };

    // Сопоставление ID из вашего HTML и ключей из вашего API объекта
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

// ======= Получаем ID из URL =======
function getEventIdFromURL() {
    const path = window.location.pathname;
    const pathParts = path.split('/'); 
    const eventId = pathParts[pathParts.length - 1]; 
    
    const eventIdNumber = parseInt(eventId, 10);
    return isNaN(eventIdNumber) ? null : eventIdNumber;
}   

// ======== Основная логика при загрузке страницы ========
document.addEventListener("DOMContentLoaded", async () => {
    const id = getEventIdFromURL();
    
    if (!id) {
        console.error("ID события не найден в URL");
        return;
    }

    const eventData = await fetchEventData(id);

    if (!eventData) {
        console.error("Событие с ID " + id + " не найдено в базе API");
        return;
    }

    populateForm(eventData);
});
