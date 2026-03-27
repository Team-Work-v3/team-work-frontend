RenderUsersInEvents();

        async function RenderUsersInEvents() {
            const container = document.querySelector(".events-list");



            const response = await fetch("http://62.109.16.129:5000/api/getEvents?state=back");
            const data = await response.json();
            console.log(data.events);
            i=0;
            for (const events of Object.values(data)) {
                for (const event of Object.values(events)) {
                    id = event.event_id;
                    console.log(id);
                    const response2 = await fetch(`http://62.109.16.129:5000/api/getAllReviews?id=${id}`);
                    const data2 = await response2.json();
                    console.log(data2.reviews);

                    data.events[i]['revs']  = data2.reviews;
                    i++;
                }
               
                
            }
            console.log(data.events);
            // const response = await fetch("http://62.109.16.129:5000/api/getAllReviews");
            // const data = await response.json();
            // console.log(data.events);

            if (!container) {
                console.error("No data");
                return;
            }

            Object.values(data).forEach(events => {
                Object.values(events).forEach(event => {
                    console.log(event);
                    var content = '';
                    var inner_content = '';
                    var html_start = `

                        <div class="event-container" id="event-container" data-event-id="${event.event_id}">
                            <div class="event-visible-information">
                                <div class="elements-event">
                                    <span class="arrow-event arrow" id="arrow-event" data-event-id="${event.event_id}">⯆</span>
                                    <span class="name-event event-title">${event.event_name}</span>
                                </div>
                            </div>
                            <div class="event-invisible-information" id="invisible-information-${event.event_id}">`;

                        if(event.revs.length > 0){
                         var html_center_head = `
                                 <table class="participants-table">
                                    <thead>
                                        <tr>
                                            <th class="th-number">№</th>
                                            <th class="th-FIO">ФИ</th>
                                            <th class="th-email">Содержание</th>
                                            <th class="th-phnumber">Дата</th>
                                            <th class="th-place"></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                                        
                        var center = ""; 
                        var count = 0;
                        Object.values(event.revs).forEach(user => {
                            count++;
                        center += `
                        
                             <tr>
                            
                                <td>${count}</td><td>${user_name}</td><td>${review_text}</td><td>${created_at}</td><td><button onclick="">Принять</button></td><td><button onclick="">Удалить</button></td>
                                </tr>          
                                       
                        `;
                    });

                var html_end = ` 
                                       
                                    </tbody>
                                </table>
                         
                    `;
                 inner_content += (html_center_head + center + html_end);
                }
                else{
                    inner_content += '<h2 class="container--h2">На это мероприятие ещё никто не зарегистировался</h2>';
                }
                    
                    content = html_start + inner_content +' </div> </div>';
                    container.innerHTML += content;    
                 });

                //  container.innerHTML += content;
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