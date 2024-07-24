export default class AdaptiveSliderForThreeCards {
    constructor(sliderSelector, prevButtonSelector, nextButtonSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.sliderTrack = this.slider.querySelector('.slider-for-three-cards__track');
        this.slides = this.slider.querySelectorAll('.slider-for-three-cards__slide');
        this.prevButton = document.querySelector(prevButtonSelector);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.currentSlide = 0;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;

        this.updateSlidesToShow();
        this.updateSliderPosition();

        this.prevButton.addEventListener('click', this.showPrevSlide.bind(this));
        this.nextButton.addEventListener('click', this.showNextSlide.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        this.sliderTrack.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.sliderTrack.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.sliderTrack.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    updateSlidesToShow() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 741) {
            this.slidesToShow = 1;
        } else if (screenWidth <= 1124) {
            this.slidesToShow = 2;
        } else {
            this.slidesToShow = 3;
        }
    }

    updateSliderPosition() {
        const slideWidth = this.slides[0].clientWidth;
        this.sliderTrack.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    }

    showPrevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSliderPosition();
        }
    }

    showNextSlide() {
        if (this.currentSlide < this.slides.length - this.slidesToShow) {
            this.currentSlide++;
            this.updateSliderPosition();
        }
    }

    onResize() {
        this.updateSlidesToShow();
        this.updateSliderPosition();
    }

    onTouchStart(event) {
        this.startX = event.touches[0].clientX;
        this.isDragging = true;
        this.sliderTrack.style.transition = 'none'; // Disable transitions during drag
    }

    onTouchMove(event) {
        if (!this.isDragging) return;
        this.currentX = event.touches[0].clientX;
        const deltaX = this.currentX - this.startX;
        const slideWidth = this.slides[0].clientWidth;
        const newTranslateX = -this.currentSlide * slideWidth + deltaX;
        this.sliderTrack.style.transform = `translateX(${newTranslateX}px)`;
    }

    onTouchEnd() {
        this.isDragging = false;
        const slideWidth = this.slides[0].clientWidth;
        const movedBy = this.currentX - this.startX;

        if (movedBy > slideWidth / 3 && this.currentSlide > 0) {
            this.showPrevSlide();
        } else if (movedBy < -slideWidth / 3 && this.currentSlide < this.slides.length - this.slidesToShow) {
            this.showNextSlide();
        } else {
            this.updateSliderPosition();
        }

        this.sliderTrack.style.transition = ''; // Re-enable transitions
    }
}