async function addCategorySelection() {
    const catElement = document.querySelector('#event_category');
    const selectedData = {
        category_id: catElement.value 
    };

    try {
        const response = await fetch(`http://62.109.16.129:5000/api/getCategory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedData)
        });

        if (response.ok) {
            console.log("успешно");
        }
    } catch (error) {
        console.error("печально:", error);
    }
}



