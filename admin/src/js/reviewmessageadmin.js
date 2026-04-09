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

// Ждем загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    const saveBtn = document.querySelector('.save');
    let selectedIcon = null;

    // 1. Логика выбора иконки (визуальный выбор)
    const icons = document.querySelectorAll('.icons img');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Убираем выделение у всех иконок
            icons.forEach(img => img.style.border = 'none');
            // Выделяем текущую
            icon.style.border = '2px solid #007bff';
            icon.style.borderRadius = '50%';
            // Сохраняем значение из data-value
            selectedIcon = icon.getAttribute('data-value');
        });
    });

    // 2. Обработка нажатия на кнопку "Сохранить"
    saveBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Собираем значения из полей
        const name = document.getElementById('fullname').value;
        const date = document.getElementById('date').value;
        const text = document.getElementById('content').value;
        const eventId = document.getElementById('event').value;

        // Простая валидация
        if (!name || !text || !eventId) {
            alert("Пожалуйста, заполните все обязательные поля!");
            return;
        }

        // Вызываем вашу функцию (которую мы исправили ранее)
        // Передаем параметры: id, icon, name, text, date
        await addReview(eventId, selectedIcon, name, text, date);
    });
});

