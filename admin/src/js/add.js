// async function fetchEventData() {
//     try {
//         let cat = JSON.stringify();
//         console.log(cat);
//         const response_cat = await fetch(`http://62.109.16.129:5000/api/getCategory`, {
//             method: "GET",
//             headers: {"Content-Type": "application/json"},
//             body: cat
//         });
        
//         const data_cat = await response_cat.json();
//         const event_cat = data_cat['category']; 

//         if (event_cat) {
//             fillForm(event_cat);
//         }

//     } catch (error) {
//         console.error("Ошибка при получении данных с API:", error);
//     }
// }



// function fillForm(data, data_cat) {
    
//     const catElement = document.querySelector('#event_category');
//     console.log(data_cat);
//     data_cat.forEach( cat =>
//         {
//                 catElement.innerHTML += "<option value="+ cat['category_id']+">"+ cat['category_name']+"</option>";
               
//         }
//     ) 
    
// }
// // ======== Основная логика при загрузке страницы ========
// document.addEventListener("DOMContentLoaded", async () => {
   

//     const eventData = await fetchEventData();

//     // populateForm(eventData);
// });

async function fetchEventData() {
    try {
        // 1. Убрали body (GET-запросы не поддерживают тело)
        const response_cat = await fetch(`http://62.109.16.129:5000/api/getCategory`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        
        const data_cat = await response_cat.json();
        // Предполагаем, что API возвращает { "category": [...] }
        const categories = data_cat['category']; 

        if (categories) {
            fillForm(categories); // Передаем данные правильно
        }

    } catch (error) {
        console.error("Ошибка при получении данных с API:", error);
    }
}

function fillForm(categories) {
    const catElement = document.querySelector('#event_category');
    if (!catElement) return;

    // Очищаем список перед заполнением (если нужно)
    catElement.innerHTML = '<option value="">Выберите категорию</option>';

    // Используем шаблонные строки для корректной генерации HTML
    categories.forEach(cat => {
        catElement.innerHTML += `<option value="${cat['category_id']}">${cat['category_name']}</option>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchEventData();
});




