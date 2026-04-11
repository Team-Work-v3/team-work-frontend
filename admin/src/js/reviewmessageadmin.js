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
          'review_date': date, 
          'icon_id': icon,     
          'is_approved': 0,
      };

      const response = await fetch(`http://62.109.16.129:5000/api/addReview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info)
      });

      if (response.ok) {
          console.log("Отзыв успешно добавлен");
          // window.location.reload(); // Можно включить для обновления списка
      } else {
          const result = await response.json();
          console.error("Ошибка сервера:", result.message);
      }
  } catch (error) {
      console.error("Сетевая ошибка:", error);
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
/* Валидация и отправка */
form.addEventListener("submit", async function(e) { // Добавили async
  e.preventDefault();

  let isValid = true;

  // Твоя валидация
  if (fullname.value.trim() === "") {
    nameError.textContent = "Введите имя и фамилию";
    isValid = false;
  } else { nameError.textContent = ""; }

  if (date.value === "") {
    dateError.textContent = "Выберите дату";
    isValid = false;
  } else { dateError.textContent = ""; }

  if (content.value.trim() === "") {
    contentError.textContent = "Заполните содержание";
    isValid = false;
  } else { contentError.textContent = ""; }

  if (eventSelect.value === "") {
    eventError.textContent = "Выберите мероприятие";
    isValid = false;
  } else { eventError.textContent = ""; }

  // Отправка данных
  if (isValid) {
    // Вызываем функцию, которую ты определил выше
    await addReview(
      eventSelect.value, 
      selectedIcon, 
      fullname.value.trim(), 
      content.value.trim(), 
      date.value
    );

    alert("Отзыв успешно отправлен!");
    
    // Очистка формы
    form.reset();
    icons.forEach(i => i.classList.remove("active"));
    selectedIcon = null;
  }
});


RenderEvents();

  // Иллюстрация
  // if (!selectedIcon) {
  //   iconError.textContent = "Выберите иллюстрацию";
  //   isValid = false;
  // } else {
  //   iconError.textContent = "";
  // }

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
  <option value="${event.event_id}" name="${event.event_id}">
    ${event.name_event}
  </option>`;


      container.innerHTML += html;
    });
  });

}

