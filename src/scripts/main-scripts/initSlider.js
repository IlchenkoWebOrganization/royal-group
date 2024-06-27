import Swiper from "swiper/bundle";

export default function(swiperSelector, nextBtnSelector, prevBtnSelector) {
    return new Swiper(swiperSelector, {
        slidesPerView: 'auto',
        spaceBetween: 30,
    
    
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