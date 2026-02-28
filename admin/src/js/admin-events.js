RenderEvents();

async function RenderEvents() {
  const container = document.querySelector(".events-container");

  const response = await fetch("http://62.109.16.129:5000/api/getEvents");
  const data = await response.json();
  console.log(data.events);

    // --- НОВОЕ: Получаем категории ---
  const catResponse = await fetch("http://62.109.16.129:5000/api/getCategory");
  const catData = await catResponse.json();
  const allCategories = catData.category; // Массив всех категорий

  if (!container) {
    console.error("No data");
    return;
  }

  Object.values(data).forEach(events => {
    Object.values(events).forEach(event => {
      let categoryOptionsHtml = "";
      allCategories.forEach(cat => {
          const isSelected = (cat.category_id == event.event_category) ? "selected" : "";
          categoryOptionsHtml += `<option value="${cat.category_id}" ${isSelected}>${cat.category_name}</option>`;
      });
      const html = `
<section class="add-event">
    <div class="event-container" id="event-container" data-event-id="${event.event_id}">
        
        <div class="event-visible-information">
            <div class="elements-event">
                <span class="arrow-event" id="arrow-event" data-event-id="${event.event_id}">⯆</span>
                <span class="name-event">${event.name_event}</span>
            </div>
            <div class="buttons-event">
                <button class="button-event" id="edit-event-button" onclick="window.location.href='/admin/change-event/${event.event_id}'">Редактировать</button>
                <button class="button-event" id="delete-event-button" onclick="deleteEvent(${event.event_id})">Удалить</button>
            </div>
        </div>

        <div class="event-invisible-information" id="invisible-information-${event.event_id}">
            <div class="add-event-firstBlock">
                
                <div class="add-event-blocks">
                    <label>Название мероприятия</label>
                    <input class="input--block" type="text" oninput="NameValidate(this)" value="${event.name_event}" required>
                </div>

                <div class="add-event-blocks">
                    <label>Количество мест</label>
                    <input class="input--block" type="number" oninput="SeatsValidate(this)" value="${event.seats_event}">
                </div>

                <div class="add-event-blocks">
                    <label>Категория</label> 
                    <select class="input--blockCAT">
                        ${categoryOptionsHtml}
                    </select>
                </div>

                <div class="add-event-blocks">
                    <label>Цена</label>
                    <input class="input--block" type="number" step="0.01" oninput="PriceValidate(this)" value="${event.price_event}">
                </div>

                <div class="date-time">

                  <div class="add-event-blocks">
                    <label>Дата</label>
                    <input class="input--block-low" id="input-data" type="date" onchange="DateValidate(this)" value="${event.date_event}" required 
                    onfocus="this.min=new Date().toISOString().split('T')[0]">
                  </div>

                  <div class="add-event-blocks">
                    <label>Время</label>
                    <input class="input--block-low" type="time" required min="09:00" max="19:00" onblur="TimeValidate(this)" value="${event.time_event}">
                  </div>

                </div>

                <div class="add-event-blocks">
                    <label>Место проведения</label>
                    <input class="input--block" type="text" oninput="LocationValidate(this)" value="${event.location_event}">
                </div>


                <div class="add-event-blocks">
                    <label>Обложка мероприятия</label>
                    <img alt="picture" src="${event.images_events}" class="picture-event" >
                </div>

                <div class="add-event-blocks">
                    <label>Количество мест</label>
                    <input class="input--block" type="number" oninput="SeatsValidate(this)" value="${event.seats_event}">
                </div>

                </div>

                <div class="add-event-secondBlock">

                <div class="add-event-blocks">
                    <label>Описание мероприятия (полное)</label>
                    <textarea class="input--block" id="fullDescription_event" oninput="fullDescriptionValidate(this)">${event.fullDescription_event}</textarea>
                </div>

                <div class="add-event-blocks">
                    <label>Описание мероприятия (краткое)</label>
                    <textarea class="input--block" id="Description_event" rows="3" oninput="DescriptionValidate(this)" required>${event.description_event}</textarea>
                </div>

                <div class="add-event-blocks">
                    <label>Программа</label>
                    <textarea class="input--block" id="program_event" rows="4" oninput="programValidate(this)">${event.program_event}</textarea>
                </div>

                <div class="add-event-blocks">
                    <label>Организаторы</label>
                    <textarea class="input--block" id="organizers_event" oninput="organizersValidate(this)">${event.organizers_event}</textarea>
                </div>

            </div>
        </div>
    </div>
</section>
`;

      container.innerHTML += html;
    });
  });

  OpenEvent();
}

function OpenEvent() {
  const arrows = document.querySelectorAll("#arrow-event");
  const invisibleInformations = document.querySelectorAll(".event-invisible-information");

  arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      const invisibleInformation = document.getElementById(`invisible-information-${arrow.getAttribute("data-event-id")}`);

      if (invisibleInformation.style.display === "flex") {
        arrow.innerHTML = "⯆";
        invisibleInformation.style.display = "none";
        return;
      }

      invisibleInformations.forEach(information => {
        information.style.display = "none";
        arrows.forEach(arrow => arrow.innerHTML = "⯆");
      });

      invisibleInformation.style.display = "flex";
      arrow.innerHTML = "⯅";
    });
  });
}