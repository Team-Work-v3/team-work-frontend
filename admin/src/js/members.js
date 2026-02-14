async function RenderUsersInEvents() {
    const container = document.querySelector(".events-list");
    if (!container) return;

    try {
        const response = await fetch("http://62.109.16.129");
        const data = await response.json();
        
        // Очищаем контейнер перед рендером
        container.innerHTML = "";

        // Проверяем, где лежат события (обычно в data.events)
        const eventsArray = data.events || Object.values(data)[0];

        eventsArray.forEach(event => {
            // 1. Формируем начало карточки
            let html = `
                <div class="event-container" data-event-id="${event.event_id}">
                    <div class="event-visible-information">
                        <div class="elements-event">
                            <span class="arrow-event arrow" data-event-id="${event.event_id}">⯆</span>
                            <span class="name-event event-title">${event.event_name}</span>
                        </div>
                    </div>
                    <div class="event-invisible-information" id="invisible-information-${event.event_id}" style="display:none;">
            `;

            // 2. Формируем контент (таблица или заглушка)
            if (event.users && event.users.length > 0) {
                let rows = "";
                event.users.forEach((user, index) => {
                    rows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${user.full_name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone_number}</td>
                            <td><button class="btn-cancel">Отменить</button></td>
                        </tr>`;
                });

                html += `
                    <table class="participants-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Имя фамилия</th>
                                <th>Email</th>
                                <th>Телефон</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>`;
            } else {
                html += '<h2 class="container--h2">На это мероприятие ещё никто не зарегистрировался</h2>';
            }

            // 3. Закрываем теги и добавляем в DOM
            html += `</div></div>`;
            container.innerHTML += html;
        });

        // После того как всё отрисовали — вешаем клики
        OpenUsers();

    } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
    }
}
