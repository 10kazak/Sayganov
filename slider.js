document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider-wrapper');
    const images = document.querySelectorAll('.slider-wrapper img');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let index = 0;

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-btn");
    const modalPrev = document.querySelector(".modal-prev");
    const modalNext = document.querySelector(".modal-next");

    function updateSlider() {
        const width = images[0].clientWidth;
        slider.style.transform = `translateX(${-index * width}px)`;
    }

    function openModal(i) {
        index = i;
        modal.style.display = "flex";
        modalImage.src = images[index].src;
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function showModalImage(offset) {
        index = (index + offset + images.length) % images.length;
        modalImage.src = images[index].src;
    }

    // Клик по изображениям
    images.forEach((img, i) => {
        img.addEventListener("click", () => openModal(i));
    });

    // Кнопки модалки
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    modalPrev.addEventListener("click", () => showModalImage(-1));
    modalNext.addEventListener("click", () => showModalImage(1));

    // Навигация с клавиатуры
    document.addEventListener("keydown", (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowLeft") showModalImage(-1);
            if (e.key === "ArrowRight") showModalImage(1);
            if (e.key === "Escape") closeModal();
        }
    });

    // Слайдер
    prevBtn.addEventListener('click', () => {
        index = (index === 0) ? images.length - 1 : index - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
});
