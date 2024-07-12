export default function burgerBtnManager() {
    const burgerBtn = document.querySelector('.burger-button');

    const mobileOverlayCloseBtn = document.querySelector('.mobile-overlay__close-button');

    const mobileOverlay = document.querySelector('#mobileOverlay')

    burgerBtn.addEventListener('click', ()=> {
        mobileOverlay.showModal();
        document.body.classList.add('no-scroll')
    })

    mobileOverlayCloseBtn.addEventListener('click', () => {
        document.body.classList.remove('no-scroll')
    })

    document.querySelectorAll('.mobile-overlay__link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращает переход по ссылке

            const targetId = event.target.getAttribute('href').substring(1); // Получаем id целевого элемента
            const targetElement = document.getElementById(targetId);

            mobileOverlay.close();
            document.body.classList.remove('no-scroll');

            // Переход к целевому элементу после закрытия диалога
            targetElement.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', `#${targetId}`);
        });
    });
}