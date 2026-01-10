RenderUsersInEvents();

        async function RenderUsersInEvents() {
            const container = document.querySelector(".events-list");

            const response = await fetch("http://62.109.16.129:5000/api/getUsersInEvents");
            const data = await response.json();
            console.log(data.events);

            if (!container) {
                console.error("No data");
                return;
            }

            Object.values(data).forEach(events => {
                Object.values(events).forEach(event => {
                    const html_start = `
                     <div class="event-header">
                        <span class="arrow">▲</span>
                        <span class="event-title">Мероприятие 1</span>
                    </div>



                        <div class="event-container" id="event-container" data-event-id="${event.event_id}">
                            <div class="event-visible-information">
                                <div class="elements-event">
                                    <span class="arrow-event arrow" id="arrow-event" data-event-id="${event.event_id}">⯆</span>
                                    <span class="name-event event-title">${event.name_event}</span>
                                </div>
                            </div>
                            <div class="event-invisible-information" id="invisible-information-${event.event_id}">`;
                        container.innerHTML += html_start;
                        if(event.users){
                         const html_center_head = `
                                 <table class="participants-table">
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Имя фамилия</th>
                                            <th>Электронная почта</th>
                                            <th>Номер телефона</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                                        
                        container.innerHTML += html_center_head;
                        
                        Object.values(event.users).forEach(user => {
                        const html_center = `
                        
                             <tr>
                                <td>1</td><td>${user.full_name}</td><td>${user.email}</td><td>${user.phone_number}</td><td><button>Отменить</button></td>
                                </tr>          
                                       
                        `;

                    container.innerHTML += html_center;
                    });

                const html_end = ` 
                                       
                                    </tbody>
                                </table>
                           
                    `;
                }
                else{
                    container.innerHTML += '<h2>На это мероприятие ещё никто не зарегистировался</h2>';
                }
                    
                    
                    container.innerHTML += html_end;
                    container.innerHTML +=' </div>                        </div>';    
                 });
            });

            OpenUsers();
        }

        function OpenUsers() {
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