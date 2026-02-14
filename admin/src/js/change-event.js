// ======= Функция получения данных из API и подстановка=======
async function fetchEventData(id) {
    try {
        const info ={
            'id':id
        };
        let inf = JSON.stringify(info);
        console.log(inf);
        const response = await fetch(`http://62.109.16.129:5000/api/getEvent`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: inf
        });
        
        const data = await response.json();
        
        console.log(data);//!!!!!!!!!!!!!!!!!!!!!!!!!
        const event = data; 


        let cat = JSON.stringify();
        console.log(cat);
        const response_cat = await fetch(`http://62.109.16.129:5000/api/getCategory`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: cat
        });
        
        const data_cat = await response_cat.json();
        const event_cat = data_cat['category']; 

        if (event) {
            fillForm(event, event_cat);
        }

    } catch (error) {
        console.error("Ошибка при получении данных с API:", error);
    }
}



function fillForm(data, data_cat) {
    const fields = [
        'date_event', 'description_event', 'event_category', 
        'location_event', 'name_event', 'price_event', 'time_event', 
        'organizers_event', 'program_event', 'description_event', 
        'fullDescription_event', 'seats_event'

    ];

    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element && data[field] !== undefined) {
            element.value = data[field];
        }
    });

    const imgElement = document.getElementById('event_image_preview');
    if (imgElement && data.images_events) {
        imgElement.src = data.images_events;
    }

    const catElement = document.querySelector('#event_category');
    console.log(data_cat);
    data_cat.forEach( cat =>
        {
             if (cat['category_id'] == fields['event_category'] ) {
                catElement.innerHTML += "<option selected value="+ cat['category_id']+">"+ cat['category_name']+"</option>";
            }
            else{
                catElement.innerHTML += "<option value="+ cat['category_id']+">"+ cat['category_name']+"</option>";
            }
            
        }
    ) 
    
}


// ======= Получаем ID из URL =======
function getEventIdFromURL() {
    // const params = new URLSearchParams(window.location.search);
    // return params.get("id");

    // Получаем текущий URL
    const url = window.location.href; // Например: "http://example.com/admin/change-event/1"

    // Получаем путь из URL
    const path = window.location.pathname; // Например: "/admin/change-event/1"

    // Разделяем путь по слешу '/'
    const pathParts = path.split('/'); // Получаем массив: ["", "admin", "change-event", "1"]

    // Получаем последний элемент (ID)
    const eventId = pathParts[pathParts.length - 1]; // Или просто pathParts[3] для этого конкретного случая

    console.log(eventId); // Выведет: "1"
    const url2 = `/api/editEventsForm/${eventId}`;
    console.log(url2);
    document.getElementById('formedit').action = url2;

    // Если вам нужно число, а не строка
    const eventIdNumber = parseInt(eventId, 10);
    return eventIdNumber; // Выведет: 1
}   

// ======== Основная логика при загрузке страницы ========
document.addEventListener("DOMContentLoaded", async () => {
    const id = getEventIdFromURL();
    
    if (!id) {
        console.log("ID события не найден в URL");
        return;
    }

    const eventData = await fetchEventData(id);

    // if (!eventData) {
    //     console.log("Событие с ID " + id + " не найдено в базе API");
    //     return;
    // }

    populateForm(eventData);
});



