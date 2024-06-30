import './index.html';
import './index.scss';
import './scripts/index-scripts/shadow';

import { Controller, Scene } from 'scrollmagic';

import initSlider from './scripts/main-scripts/initSlider';

// import styles bundle
import 'swiper/css/bundle';

import addMarginToContainerWidth from './scripts/main-scripts/addMarginToContainerWidth';



import { addAnimationsWithTrigger } from './scripts/main-scripts/createAnimationsModule';

import Popup from './scripts/main-scripts/popup';


document.addEventListener('DOMContentLoaded', function () {

    const animationController = new Controller();


    // Настройка контейнера без отсутпа справа, но при этом с сохранением отсутпа слева, позволяющего контроллировать неоновую линию на уровне других контейнеров
    const impactContainerToTrackMargin = document.getElementById('impactBlockTrigger');
    const casesContainerToResize = document.getElementById('casesTrigger');
      
    // Первичное определение отсупа слева и размера контейнера
    addMarginToContainerWidth(impactContainerToTrackMargin, casesContainerToResize);
      
    // Отслеживание изменения размера окна для изменения значений отсупа слева и размера контейнера
    window.addEventListener('resize', () => addMarginToContainerWidth(impactContainerToTrackMargin, casesContainerToResize));


    // Работа с popup-ами для блока потенциальных партнёров
    const firstPotentialPartnerPopup = document.getElementById("firstPotentialPartnerModal");
    const firstPotentialPartnerPopupOpenBtn = document.getElementById("openFirstPotentialPartnerBtn");


    const secondPotentialPartnerPopup = document.getElementById("secondPotentialPartnerModal");
    const secondPotentialPartnerPopupOpenBtn = document.getElementById("openSecondPotentialPartnerBtn");


    new Popup(firstPotentialPartnerPopup, firstPotentialPartnerPopupOpenBtn)

    new Popup(secondPotentialPartnerPopup, secondPotentialPartnerPopupOpenBtn)



    // Инициализация слайдеров
    initSlider('.cases__list', '.cases__next-btn', '.cases__prev-btn');
   

    
    // Инициализация анимаций
    addAnimationsWithTrigger(animationController, '#heroBlockTrigger', [
        '.financing-quote__info',
        '.financing-quote__stripes',
        '.payment-quote__info',
        '.neon-spacer--payment-quote'
    ]);


    addAnimationsWithTrigger(animationController, '#numbersBlockTrigger', [
        '#numbersArrow',
        '.numbers__year-result-quote',
        '.numbers__circular',
        '.circular-progress-bar__gradient-circle',
        '.numbers__partners-result',
        '#numbersConclusionDivergence',
        '#numbersConclusionText',
        '.circular-description__vector'
    ]);


    addAnimationsWithTrigger(animationController, '#numbersBlockTrigger', [
        '.ellipse__main',
        '.ellipse__shadow'
    ], 'expanded');


    addAnimationsWithTrigger(animationController, '#potentialPartnersBlockTrigger', [
        '#potentialPartnersLine',
        '#potentialPartnersHeader',
        '.potential-partner-card--1',
        '.potential-partner-card--2',
        '#potentialPartnersConclusionDivergence',
        '#potentialPartnersConclusionText'
    ]);


    addAnimationsWithTrigger(animationController, '#impactBlockTrigger', [
        '#impactIcon',
        '#impactLine',
        '#impactHeader',
        '#impactJoinButton',
        '#impactList'
    ]);


    addAnimationsWithTrigger(animationController, '#casesTrigger', [
        '#casesFirstLine',
        '#casesHeader',
    ]);


    addAnimationsWithTrigger(animationController, '#casesSecondLineTrigger', [
        '#casesSecondLine',
        '#casesContent'
    ]);


    addAnimationsWithTrigger(animationController, '#missionTrigger', [
        '#missionHeader',
        '#missionLine',
        '#missionConclusionDivergence',
        '#missionConclusionText',
        '#missionMainDivergence',
        '#missionImage',
        '#missionText',
        '#missionStatisticRubles',
        '#missionStatisticBanks',
        '#missionStatisticClients',
        '#missionStatisticPercents'
    ]);

    addAnimationsWithTrigger(animationController, '#stepsBlockTrigger', [
        '#stepsHeader',
        '#stepsLine',
    ]);


    const stepsList = document.querySelector('.steps__list');
  
    function updateShadowOnScroll() {

        const stickySection = document.querySelector('.section--sticky');

        const stepItems = Array.from(document.querySelectorAll('.steps__item'));
        const itemOffsets = [];
      
        // Вычисляем отступы слева до каждого элемента .steps__item
        stepItems.forEach(item => {
          const itemOffsetLeft = item.offsetLeft;
          itemOffsets.push(itemOffsetLeft);
        });


        const scrollPosition = window.scrollY;

        const sectionTop = stickySection.getBoundingClientRect().top + scrollPosition;

        const currentPosition = scrollPosition - sectionTop;
  
      // Определяем индекс элемента, чей отступ слева равен текущему scrollLeft
      let activeIndex = -1;
      for (let i = 0; i < itemOffsets.length; i++) {
        // console.log(`${currentPosition} ${itemOffsets[i]}`);

        if (currentPosition === itemOffsets[i]) {
          activeIndex = i;
          break;
        }
      }
  
      // Убираем класс shadow у всех элементов
      stepItems.forEach(item => {
        item.classList.remove('shadow');
      });
  
      // Добавляем класс shadow только активному элементу
      if (activeIndex !== -1) {
        stepItems[activeIndex].classList.add('shadow');
      }
    }
  
    stepsList.addEventListener('scroll', updateShadowOnScroll);

    updateShadowOnScroll();
      


    // function handleScroll() {
    //     // Получаем элементы
    //     const stickySection = document.querySelector('.section--sticky');

    //     const stepsContainer = document.querySelector('.steps');
    
    //     const stepsContainerWidth = stepsContainer.offsetWidth;
    
    //     stickySection.style.height = stepsContainerWidth;


    //     const scrollPosition = window.scrollY;


    //     const stepsList = document.querySelector('.steps__list');

    //     const stepsListTop = stepsList.getBoundingClientRect().top + scrollPosition;

    //     const header = document.querySelector('.section__header');

    //     // Получаем высоту элемента с учетом padding
    //     const headerHeight = header.offsetHeight;

    //     // Получаем вычисленные стили элемента
    //     const headerStyle = getComputedStyle(header);

    //     // Получаем значения верхнего и нижнего margin
    //     const marginTop = parseFloat(headerStyle.marginTop);
    //     const marginBottom = parseFloat(headerStyle.marginBottom);

    //     // Общая высота с учетом всех padding и margin
    //     const totalHeaderHeight = headerHeight + marginTop + marginBottom;

    //     // Получаем текущее положение скролла от верха viewport
        
    //     // Получаем отступ сверху родительского элемента .section--sticky от верха viewport
    //     const sectionTop = stickySection.getBoundingClientRect().top + scrollPosition;

    //     // Вычисляем текущую позицию внутри .section--sticky
    //     const currentPosition = scrollPosition - sectionTop - totalHeaderHeight;
        
    //     console.log(`Отступ до контейнера: ${sectionTop}. Текущее положение относительно top: ${currentPosition} пикселей. Ширина контейнера с элементами ${stepsContainerWidth}`);
    //   }
      
    //   // Добавляем обработчик события скролла
    //   window.addEventListener('scroll', handleScroll);
      

});