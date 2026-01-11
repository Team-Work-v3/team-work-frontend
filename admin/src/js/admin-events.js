RenderEvents();

async function RenderEvents() {
    const container = document.querySelector(".events-container");

    const response = await fetch("http://62.109.16.129:5000/api/getEvents");
    const data = await response.json();
    console.log(data.events);

    if (!container) {
        console.error("No data");
        return;
    }

    Object.values(data).forEach(events => {
        Object.values(events).forEach(event => {
            const html = `
                <div class="event-container" id="event-container" data-event-id="${event.event_id}">
                    <div class="event-visible-information">
                        <div class="elements-event">
                            <span class="arrow-event" id="arrow-event" data-event-id="${event.event_id}">⯆</span>
                            <span class="name-event">${event.name_event}</span>
                        </div>
                        <div class="buttons-event">
                            <button class="button-event" id="edit-event-button" onclick="window.location.href = '/admin/change-event/${event.event_id}'">Редактировать</button>
                            <button class="button-event" id="delete-event-button" onclick="deleteEvent(${event.event_id})">Удалить</button>
                        </div>
                    </div>
                    <div class="event-invisible-information" id="invisible-information-${event.event_id}">
                        <div>
                                    <div class="event-container" id="event-container" data-event-id="${event.event_id}">
    <div class="event-visible-information">
        <div class="elements-event">
            <span class="arrow-event" id="arrow-event" data-event-id="${event.event_id}">⯆</span>
            <span class="name-event">${event.name_event}</span>
        </div>
        <div class="buttons-event">
            <button class="button-event" id="edit-event-button" onclick="window.location.href = '/admin/change-event/${event.event_id}'">Редактировать</button>
            <button class="button-event" id="delete-event-button" onclick="deleteEvent(${event.event_id})">Удалить</button>
        </div>
    </div>
    <div class="event-invisible-information" id="invisible-information-${event.event_id}">
        <div>
            <div class="add-event-firstSecondBlock">
                <div class="add-event-firstBlock">
                    <div class="add-event-blocks">
                        <label for="name-event">Название мероприятия</label>
                        <input class="input--block" id="name_event" name="name_event" type="text" oninput="NameValidate(this)"
                            value="${event.name_event}" required>
                        <span class="error-event" id="nameError">Неправильно введеное поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="description-event">Описание мероприятия (краткое)</label>
                        <textarea class="input--block" id="description_event" name="description_event" rows="3"
                            oninput="DescriptionValidate(this)" required readonly>${event.description_event}</textarea>
                        <span class="error-event" id="descriptionError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="date-event">Дата</label>
                        <input class="input--block-low" id="date_event" name="date_event" type="date" onblur="DateValidate(this)"
                            onchange="DateValidate(this)" value="${event.date_event}" required onfocus="this.min=new Date().toISOString().split('T')[0]">
                        <span class="error-event" id="dateError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="time-event ">Время</label>
                        <input class="input--block-low" id="time_event" name="time_event" type="time" required min="09:00"
                            max="19:00" onblur="TimeValidate(this)" value="${event.time_event}">
                        <span class="error-event" id="timeError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="location-event">Место проведения</label>
                        <input class="input--block" id="location_event" name="location_event" type="text"
                            oninput="LocationValidate(this)" value="${event.location_event}">
                        <span class="error-event" id="locationError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="price-event">Цена</label>
                        <div class="price-container">
                            <input class="input--block" id="price_event" name="price_event" type="number" min="0" max="10000"
                                step="0.01" inputmode="decimal" oninput="PriceValidate(this)" value="${event.price_event}">
                            <select id="currency-select" class="input--block" style="width: auto; padding: 6px;" onchange="CurrencyChangeHandler()">
                                <option value="RUB" ${event.currency === 'RUB' ? 'selected' : ''}>BYN</option>
                                <option value="USD" ${event.currency === 'USD' ? 'selected' : ''}>USD</option>
                                <option value="EUR" ${event.currency === 'EUR' ? 'selected' : ''}>EUR</option>
                            </select>
                        </div>
                        <span class="error-event" id="priceError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="event-category">Категория</label>
                        <select id="event_category" name="event_category" class="input--block-select"
                            oninput="CategoryValidate(this)">
                            <option value="">Выберите категорию</option>
                            <option value="option 1" ${event.event_category === 'option 1' ? 'selected' : ''}>option 1</option>
                            <option value="option 2" ${event.event_category === 'option 2' ? 'selected' : ''}>option 2</option>
                            <option value="option 3" ${event.event_category === 'option 3' ? 'selected' : ''}>option 3</option>
                        </select>
                        <span class="error-event" id="selectError"></span>
                    </div>

                    <form action="#" method="post">
                        <div class="add-event-blocks">
                            <label for="images-events">Фотографии</label>
                            <input class="input--block-btn" type="file" multiple accept=".png,.jpeg,.webp,.jpg" name="images-events"
                                id="images-events" onchange="ImagesValidate(this)">
                            <span class="error-event" id="imagesError">Неправильный формат фотографий</span><br>
                        </div>
                    </form>

                    <div class="add-event-blocks">
                        <label for="seats-event">Количество мест</label>
                        <input class="input--block" id="seats_event" name="seats_event" type="number" min="0" step="1"
                            inputmode="numeric" oninput="SeatsValidate(this)" value="${event.seats_event}">
                        <span class="error-event" id="seatsError">Неправильно введено поле</span><br>
                    </div>

                </div>
                <div class="add-event-secondBlock">
                    <div class="add-event-blocks">
                        <label for="organizers-event">Организаторы</label>
                        <textarea class="input--block" id="organizers_event" name="organizers_event" type="text"
                            oninput="organizersValidate(this)" readonly>${event.organizers_event}</textarea>
                        <span class="error-event" id="organizersError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="program-event">Программа</label>
                        <textarea class="input--block" id="program_event" name="program_event" rows="4" type="text"
                            oninput="programValidate(this)" readonly>${event.program_event}</textarea>
                        <span class="error-event" id="programError">Неправильно введено поле</span><br>
                    </div>

                    <div class="add-event-blocks">
                        <label for="fullDescription-event">Описание мероприятия (полное)</label>
                        <textarea class="input--block" id="fullDescription_event" name="fullDescriptionevent" rows="" type="text"
                            oninput="fullDescriptionValidate(this)" readonly>${event.fullDescription_event}</textarea>
                        <span class="error-event" id="fullDescriptionError">Неправильно введено поле</span><br>
                    </div>

                </div>
                <div class="add-event-buttons">
                    <button type="submit" id="addBtn-event">Изменить</button>
                    <form action="#" method="post"><button type="reset">Удалить</button></form> 
                </div>
            </div>
        </div>
        <img alt="picture" src="${event.images_events}" class="picture-event">
    </div>
</div>
                        <img alt="picture" src="${event.images_events}" class="picture-event">
                    </div>
                </div>
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