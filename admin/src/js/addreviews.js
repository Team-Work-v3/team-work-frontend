async function savereviews() {
    const form = document.querySelector('#event-form');
    const formData = new FormData(form);
    
    const selectedData = Object.fromEntries(formData.entries());

    console.log("Отправляем данные:", selectedData);

    try {
        const response = await fetch(`http://62.109.16.129`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedData)
        });

        if (response.ok) {
            alert("Данные успешно сохранены!");
        }
    } catch (error) {
        console.error("Ошибка при сохранении:", error);
    }
}
savereviews()