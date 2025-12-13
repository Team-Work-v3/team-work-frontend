RenderEvents(getEvents());

async function getEvents() {
    const response = await fetch("http://62.109.16.129:5000/api/getEvents");
    const events = await response.json();
    console.log(events.events);
    return events.events;
}

function RenderEvents(data) {
    const container = document.querySelector(".events-container");

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
                            <button class="button-event" id="edit-event-button" onclick="window.location.href = 'admin-edit-event.html'">Edit</button>
                            <button class="button-event" id="delete-event-button">Delete</button>
                        </div>
                    </div>
                    <div class="event-invisible-information" id="invisible-information-${event.event_id}">
                        <div>
                            <span class="information-event">${event.location}</span>
                            <span>${event.is_active === 1 ? "Активно" : "Неактивно"}</span>
                        </div>
                        <!-- In the future, this div is going img -->
                        <div class="picture-event"></div>
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