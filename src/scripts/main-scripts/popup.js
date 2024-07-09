export default class Popup {
    constructor(popup, openPopupBtn) {
        this.popup = popup;
        this.openPopupBtn = openPopupBtn;
        this.closePopupBtn = this.popup.querySelector('.popup__close-btn');

        this.initPopup()
    }

    initPopup() {
        this.openPopupListener();
        this.closePopupWithEscapeBtnListener();
        this.closePopupWithOutsideClickListener()
        this.closePopupWithEscapeListener()
    }

    closePopup() {
        document.body.classList.remove('no-scroll');
        this.popup.classList.remove('fade-in');
        this.popup.querySelector('.popup__content').classList.remove('slide-in');
        this.popup.classList.add('fade-out');
        this.popup.querySelector('.popup__content').classList.add('slide-out');
        setTimeout(() => {
            this.popup.style.display = "none";
        }, 500);
    }

    openPopupListener() {
        this.openPopupBtn.addEventListener('click', () => {
            document.body.classList.add('no-scroll');
            this.popup.classList.remove('fade-out');
            this.popup.querySelector('.popup__content').classList.remove('slide-out');
            this.popup.style.display = "block";
            setTimeout(() => {
                this.popup.classList.add('fade-in');
                this.popup.querySelector('.popup__content').classList.add('slide-in');
            }, 10);
        });
    }

    closePopupWithEscapeBtnListener() {
        this.closePopupBtn.addEventListener('click', () => this.closePopup());
    }

    closePopupWithOutsideClickListener() {
        window.addEventListener('click', (event) => {
            if (event.target === this.popup) {
                this.closePopup()
            }
        });
    }

    closePopupWithEscapeListener() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' || e.code === 27) {
                    this.closePopup()
                }
            });
    }
}