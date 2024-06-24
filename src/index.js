import './index.html';
import './index.scss';

import { Controller, Scene } from 'scrollmagic';

import { addAnimationsWithTrigger } from './scripts/main-scripts/createAnimationsModule';

import Popup from './scripts/main-scripts/popup';


document.addEventListener('DOMContentLoaded', function () {

    const animationController = new Controller();


    const firstPotentialPartnerPopup = document.getElementById("firstPotentialPartnerModal");
    const firstPotentialPartnerPopupOpenBtn = document.getElementById("openFirstPotentialPartnerBtn");

    const secondPotentialPartnerPopup = document.getElementById("secondPotentialPartnerModal");
    const secondPotentialPartnerPopupOpenBtn = document.getElementById("openSecondPotentialPartnerBtn");


    new Popup(firstPotentialPartnerPopup, firstPotentialPartnerPopupOpenBtn)

    new Popup(secondPotentialPartnerPopup, secondPotentialPartnerPopupOpenBtn)


    addAnimationsWithTrigger(animationController, '#heroBlockTrigger', [
        '.financing-quote__info',
        '.financing-quote__stripes',
        '.payment-quote__info',
        '.neon-spacer--payment-quote'
    ]);


    addAnimationsWithTrigger(animationController, '#numbersBlockTrigger', [
        '.ellipse__main',
        '.ellipse__shadow'
    ], 'expanded')


    addAnimationsWithTrigger(animationController, '#numbersBlockTrigger', [
        '#numbersArrow',
        '.numbers__year-result-quote',
        '.numbers__circular',
        '.circular-progress-bar__gradient-circle',
        '.numbers__partners-result',
        '#numbersConclusionDivergence',
        '#numbersConclusionText'
    ]);


    addAnimationsWithTrigger(animationController, '#potentialPartnersBlockTrigger', [
        '#potentialPartnersLine',
        '#potentialPartnersHeader',
        '.potential-partner-card--1',
        '.potential-partner-card--2',
        '#potentialPartnersConclusionDivergence',
        '#potentialPartnersConclusionText'
    ]);


    addAnimationsWithTrigger(animationController, '#impactBlockTrigger', [
        '#impactHeader',
        '#impactLine'
    ]);

});