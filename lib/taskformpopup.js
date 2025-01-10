"use strict";
function openTaskPopup() {
    document.addEventListener("DOMContentLoaded", () => {
        const openPopupButton = document.getElementById("addtaskbutton");
        const popup = document.getElementById("addtaskpopup");
        const overlay = document.getElementById("popupoverlay");
        const closeButton = document.querySelector(".closepopup");
        const form = popup?.querySelector("form");
        if (!openPopupButton || !popup || !overlay || !closeButton || !form)
            return;
        openPopupButton.addEventListener("click", () => {
            popup.style.display = "block";
            overlay.style.display = "block";
        });
        closeButton.addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);
        function closePopup() {
            popup.style.display = "none";
            overlay.style.display = "none";
            form.reset();
        }
    });
}
openTaskPopup();
