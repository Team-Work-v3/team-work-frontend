const form = document.getElementById("reviewForm");

const fullname = document.getElementById("fullname");
const date = document.getElementById("date");
const content = document.getElementById("content");
const eventSelect = document.getElementById("event");
const clearBtn = document.getElementById("clearBtn");

const nameError = document.getElementById("nameError");
const dateError = document.getElementById("dateError");
const contentError = document.getElementById("contentError");
const eventError = document.getElementById("eventError");
const iconError = document.getElementById("iconError");

const icons = document.querySelectorAll(".icons img");

let selectedIcon = null;

async function addReview(id, icon, name, text, date) {
    try {
        const info = {
            'event_id': id,
            'user_name': name,
            'review_text': text,
            'is_approved': 0,
        };
        let inf = JSON.stringify(info);

        const response = await fetch(`http://62.109.16.129:5000/api/addReview`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: inf
        });

        const result = await response.json();

        console.log("Результат:", result);

        if (response.ok) {
            console.log(`rew add`);
            window.location.reload();
        } else {
            console.error(`Ошибка `, result.message || response.statusText);
        }
    } catch (error) {
        console.error("Ошибка при отправке запроса :", error);
    }
}

/* Выбор иллюстрации */
icons.forEach(icon => {
  icon.addEventListener("click", () => {
    icons.forEach(i => i.classList.remove("active"));
    icon.classList.add("active");
    selectedIcon = icon.dataset.id;
    iconError.textContent = "";
  });
});

/* Валидация */
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let isValid = true;

  // ФИО
  if (fullname.value.trim() === "") {
    nameError.textContent = "Введите имя и фамилию";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // Дата
  if (date.value === "") {
    dateError.textContent = "Выберите дату";
    isValid = false;
  } else {
    dateError.textContent = "";
  }

  // Содержание
  if (content.value.trim() === "") {
    contentError.textContent = "Заполните содержание";
    isValid = false;
  } else {
    contentError.textContent = "";
  }

  // Мероприятие
  if (eventSelect.value === "") {
    eventError.textContent = "Выберите мероприятие";
    isValid = false;
  } else {
    eventError.textContent = "";
  }

  // Иллюстрация
  if (!selectedIcon) {
    iconError.textContent = "Выберите иллюстрацию";
    isValid = false;
  } else {
    iconError.textContent = "";
  }

  if (isValid) {
    // addReview(eventSelect.value, selectedIcon,  fullname.value.trim(), content.value.trim(), date.value);

    alert("Отзыв успешно сохранён!");
    form.reset();
    icons.forEach(i => i.classList.remove("active"));
    selectedIcon = null;


    // on api        /api/addReview

   


  }
});

RenderEvents();

async function RenderEvents() {
  const container = document.querySelector("#event");

  const response = await fetch("http://62.109.16.129:5000/api/getEvents?state=back");
  const data = await response.json();
  console.log(data.events);
  if (!container) {
    console.error("No data");
    return;
  }

  Object.values(data).forEach(events => {
    Object.values(events).forEach(event => {
      const html = `

      <option value="${event.event_id}">${event.name_event}</option>`;

      container.innerHTML += html;
    });
  });

}

/**
 * ЧАСТЬ 1: Работа с API
 * Отправляет данные на сервер согласно вашей спецификации
 */
async function sendReviewToServer(id, icon, name, text, date) {
    const url = 'http://62.109.16';
    
    const bodyData = {
        'id_event': parseInt(id), // int
        'fullname': name,         // str
        'date': date,             // str
        'content': text,          // str
        'images_events': icon     // str
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Отзыв успешно добавлен!");
            window.location.reload();
        } else {
            alert(`Ошибка: ${result.message || 'Сервер отклонил запрос'}`);
        }
    } catch (error) {
        console.error("Ошибка при подключении к API:", error);
        alert("Не удалось соединиться с сервером");
    }
}

/**
 * ЧАСТЬ 2: Интерфейс и сбор данных
 * Инициализируется при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.querySelector('.save');
    const icons = document.querySelectorAll('.icons img');
    let selectedIcon = null;

    // Выбор иконки
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icons.forEach(img => {
                img.style.border = 'none';
                img.style.opacity = '0.5';
            });
            icon.style.border = '3px solid #007bff';
            icon.style.borderRadius = '50%';
            icon.style.opacity = '1';
            
            // Получаем значение для images_events
            selectedIcon = icon.getAttribute('data-value');
        });
    });

    // Обработка кнопки "Сохранить"
    if (saveBtn) {
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // Сбор данных из полей
            const eventId = document.getElementById('event').value;
            const name = document.getElementById('fullname').value;
            const date = document.getElementById('date').value;
            const text = document.getElementById('content').value;

            // Валидация перед отправкой
            if (!name || !text || !eventId) {
                alert("Заполните обязательные поля: Мероприятие, Имя и Содержание.");
                return;
            }

            if (!selectedIcon) {
                alert("Выберите иллюстрацию!");
                return;
            }

            // Вызов API функции
            await sendReviewToServer(eventId, selectedIcon, name, text, date);
        });
    }
});

