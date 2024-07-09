import './index.html';
import './index.scss';

import './scripts/index-scripts/shadow'


// Работа с анимациями при достижении какого-то элемента
import { Controller } from 'scrollmagic';

import { addAnimationsWithTrigger } from './scripts/main-scripts/createAnimationsModule';


// Работа со Swiper
import initSlider from './scripts/main-scripts/initSlider';

import 'swiper/css/bundle';


// Управление контейнером без оступа справа
import addMarginToContainerWidth from './scripts/main-scripts/addMarginToContainerWidth';



// Подключение класса модального окна
import Popup from './scripts/main-scripts/popup';


// Слайдер для описания преимуществ партнёрства
import AdaptiveSliderForThreeCards from './scripts/main-scripts/AdaptiveSliderForThreeCards';



// Менеджеры различных элементов
import stepsJoinManager from './scripts/main-scripts/stepsJoinManager';




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



    initSlider('.cases__list', '.cases__next-btn', '.cases__prev-btn');



    new AdaptiveSliderForThreeCards('.slider-for-three-cards', '.section-bg__icon-prev', '.section-bg__icon-next');



    // Инициализация анимаций
    addAnimationsWithTrigger(animationController, '#heroBlockTrigger', [
        '.financing-quote__info',
        '.financing-quote__stripes',
        '.payment-quote__info',
        '#heroLine'
    ]);

    
    addAnimationsWithTrigger(animationController, '.numbers__content', [
        '#numbersLine',
    ]);


    addAnimationsWithTrigger(animationController, '.numbers__content', [
        '.numbers__year-result-quote',
        '.numbers__circular',
        '.circular-progress-bar__gradient-circle',
        '.numbers__partners-result',
        '#numbersConclusionDivergence',
        '#numbersConclusionText',
        '.circular-description__vector'
    ]);

    
    addAnimationsWithTrigger(animationController, '.numbers__content', [
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
        '#missionTextFirstParagraph',
        '#missionTextSecondParagraph',
        '#missionStatisticRubles',
        '#missionStatisticBanks',
        '#missionStatisticClients',
        '#missionStatisticPercents'
    ]);

    addAnimationsWithTrigger(animationController, '#stepsBlockTrigger', [
        '#stepsContent',
        '#stepsHeader',
        '#stepsLine',
        '#stepsIcon',
        '#stepsList'
    ]);


    stepsJoinManager()


});