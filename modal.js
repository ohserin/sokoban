export function setModal() {
    const openModalBtn = document.querySelector(".modal-btn");
    const modal = document.getElementById("modal");
    const bg = document.querySelector(".overlay");


    function toggleModal() {
        modal.classList.toggle("show");
        openModalBtn.classList.toggle("hidden");
        bg.classList.toggle("out");
    }

    openModalBtn.addEventListener("click", toggleModal);
}

