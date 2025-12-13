async function getEvents() {
    const response = await fetch("http://62.109.16.129:5000/api/getEvents");
    const events = await response.json();
    console.log(events);
}

getEvents();