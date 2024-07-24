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
import swiperSlidesHeightManager from './scripts/main-scripts/swiperSlidesHeightManager';
import burgerBtnManager from './scripts/main-scripts/burgerBtnManager';




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

    const svetlanaCaseOpenBtn = document.querySelector('#svetlanaCaseBtn');

    const svetlanaCasePopup = document.querySelector('#svetlanaCase')

    new Popup(svetlanaCasePopup, svetlanaCaseOpenBtn)

    const vladimirCaseOpenBtn = document.querySelector('#vladimirCaseBtn');

    const vladimirCasePopup = document.querySelector('#vladimirCase')

    new Popup(vladimirCasePopup, vladimirCaseOpenBtn)

    const igorCaseOpenBtn = document.querySelector('#igorCaseBtn');

    const igorCasePopup = document.querySelector('#igorCase')

    new Popup(igorCasePopup, igorCaseOpenBtn)

    const franchiseCaseOpenBtn = document.querySelector('#franchiseCaseBtn');

    const franchiseCasePopup = document.querySelector('#franchiseCase')

    new Popup(franchiseCasePopup, franchiseCaseOpenBtn)

    const anatolyCaseOpenBtn = document.querySelector('#anatolyCaseBtn');

    const anatolyCasePopup = document.querySelector('#anatolyCase')

    new Popup(anatolyCasePopup, anatolyCaseOpenBtn)


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

    swiperSlidesHeightManager()

    burgerBtnManager()


    const joinBtns = document.querySelectorAll('.join-button');

    joinBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.open('https://t.me/gigachat_bot', '_blank');
        })
    })


    const headerBtn = document.querySelector('.header__button');

    headerBtn.addEventListener('click', () => window.open('https://t.me/gigachat_bot', '_blank'))

});