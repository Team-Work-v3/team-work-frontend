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
                            <span class="information-event">${event.location_event}</span>
                            <span>${event.is_active === 1 ? "Активно" : "Неактивно"}</span>
                        </div>
                        <!-- In the future, this div is going img -->
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