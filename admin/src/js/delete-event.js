// async function deleteEvent(id) { 
//     try {
//         const info = {
//             'event_id': id
//         };
//         let inf = JSON.stringify(info);
//         console.log("Отправка запроса на удаление ID:", id);

//         const response = await fetch(`http://62.109.16.129:5000/api/deleteEvent`, {
//             method: "POST", 
//             headers: {"Content-Type": "application/json"},
//             body: inf
//         });

//         const result = await response.json();

//         console.log("Результат удаления:", result);

//         if (response.ok) {
//             console.log(`Событие с ID ${id} успешно удалено.`);
//             window.location.reload();
//         } else {
//             console.error(`Ошибка при удалении события ID ${id}:`, result.message || response.statusText);
//         }
//     } catch (error) {
//         console.error("Ошибка при отправке запроса на удаление:", error);
//     }
// }

async function deleteEvent(id) { 
    if (!confirm("Вы уверены, что хотите удалить мероприятие?")) {
        return;
    }try {
        const info = {
            'event_id': id
        };
        let inf = JSON.stringify(info);
        console.log("Отправка запроса на удаление ID:", id);

        const response = await fetch(`http://62.109.16.129:5000/api/deleteEvent`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: inf
        });

        const result = await response.json();

        console.log("Результат удаления:", result);

        if (response.ok) {
            console.log(`Событие с ID ${id} успешно удалено.`);
            window.location.reload();
        } else {
            console.error(`Ошибка при удалении события ID ${id}:`, result.message || response.statusText);
        }
    } catch (error) {
        console.error("Ошибка при отправке запроса на удаление:", error);
    }
}
