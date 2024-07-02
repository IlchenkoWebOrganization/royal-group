import './index.html';
import './index.scss';
import './scripts/index-scripts/shadow';

import { Controller } from 'scrollmagic';

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

});