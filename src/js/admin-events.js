AddJSON();
RenderEvents(getData());

function AddJSON() {
    const bool = localStorage.getItem("is-added") === "true";

    if (!bool) {
        const jsonData = {
            "event": {
                "1": { "id": 1, "name": "Фильм 1", "location": "Минск ул. Романовская Слобода 28", "active": true },
                "2": { "id": 2, "name": "Фильм 2", "location": "Минск ул. ул. Притыцкого 23", "active": true },
                "3": { "id": 3, "name": "Фильм 3", "location": "Минск пр. Независимости 13", "active": false },
                "4": { "id": 4, "name": "Фильм 4", "location": "Минск пр. Дзержинского 104", "active": true },
                "5": { "id": 5, "name": "Фильм 5", "location": "Минск ул. Бобруйская 6", "active": false }
            }
        };

        localStorage.setItem("JSON", JSON.stringify(jsonData));
        localStorage.setItem("is-added", "true");
    }
}

function getData() {
    const data = localStorage.getItem("JSON");

    if (data) return JSON.parse(data);
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
                <div class="event-container" id="event-container" data-id="${event.id}">
                    <div class="event-visible-information">
                        <div class="elements-event">
                            <span class="arrow-event" id="arrow-event" data-id="${event.id}">⯆</span>
                            <span class="name-event">${event.name}</span>
                        </div>
                        <div class="buttons-event">
                            <button class="button-event" id="edit-event-button" onclick="window.location.href = 'admin-edit-event.html'">Edit</button>
                            <button class="button-event" id="delete-event-button">Delete</button>
                        </div>
                    </div>
                    <div class="event-invisible-information" id="invisible-information-${event.id}">
                        <div>
                            <span class="information-event">${event.location}</span>
                            <span>${event.active === true ? "Активно" : "Неактивно"}</span>
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
            const invisibleInformation = document.getElementById(`invisible-information-${arrow.getAttribute("data-id")}`);

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