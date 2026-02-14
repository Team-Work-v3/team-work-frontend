async function fetchEventData() {
    try {
        let cat = JSON.stringify();
        console.log(cat);
        const response_cat = await fetch(`http://62.109.16.129:5000/api/getCategory`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: cat
        });
        
        const data_cat = await response_cat.json();
        const event_cat = data_cat['category']; 

        if (event_cat) {
            fillForm(event_cat);
        }

    } catch (error) {
        console.error("Ошибка при получении данных с API:", error);
    }
}



function fillForm(data, data_cat) {
    
    const catElement = document.querySelector('#event_category');
    console.log(data_cat);
    data_cat.forEach( cat =>
        {
                catElement.innerHTML += "<option value="+ cat['category_id']+">"+ cat['category_name']+"</option>";
               
        }
    ) 
    
}
// ======== Основная логика при загрузке страницы ========
document.addEventListener("DOMContentLoaded", async () => {
   

    const eventData = await fetchEventData();

    // populateForm(eventData);
});



