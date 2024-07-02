import Swiper from "swiper/bundle";

export default function(swiperSelector, nextBtnSelector, prevBtnSelector, spaceBetween = 30, slidesPerView = 'auto') {
    return new Swiper(swiperSelector, {
        slidesPerView,
        spaceBetween,
    
    
        navigation: {
        nextEl: nextBtnSelector,
        prevEl: prevBtnSelector,
      },
    
      mousewheel: {
        invert: false,
        sensitivity: 2, // Чувствительность прокрутки
        },
        speed: 800, // Скорость анимации прокрутки (в миллисекундах)
    });
}