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
    alert("Отзыв успешно сохранён!");
    form.reset();
    icons.forEach(i => i.classList.remove("active"));
    selectedIcon = null;
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
