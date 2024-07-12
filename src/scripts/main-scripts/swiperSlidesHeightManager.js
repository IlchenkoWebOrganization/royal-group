export default function swiperSlidesHeightManager() {
    // Функция для установки одинаковой высоты для всех слайдов
    function setEqualHeight() {
        var slides = document.querySelectorAll('.swiper-slide');
        var maxHeight = 0;

        // Сбрасываем высоту для всех слайдов, чтобы вычислить естественную высоту
        slides.forEach(function (slide) {
            slide.style.height = 'auto';
        });

        // Находим максимальную высоту среди всех слайдов
        slides.forEach(function (slide) {
            var slideHeight = slide.offsetHeight;
            if (slideHeight > maxHeight) {
                maxHeight = slideHeight;
            }
        });

        // Устанавливаем максимальную высоту для всех слайдов
        slides.forEach(function (slide) {
            slide.style.height = maxHeight + 'px';
        });
    }

    // Устанавливаем высоту при загрузке страницы
    setEqualHeight();

    // Устанавливаем высоту при изменении размера окна
    window.addEventListener('resize', setEqualHeight);
}