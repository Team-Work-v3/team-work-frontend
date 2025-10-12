OpenEvent();

function OpenEvent() {
    const arrows = document.querySelectorAll("#arrow-event");
    const invisibleInformations = document.querySelectorAll(".event-invisible-inforamtion");

    arrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            const invisibleInformation = document.getElementById(`invisible-information-${arrow.getAttribute("data-id")}`);

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