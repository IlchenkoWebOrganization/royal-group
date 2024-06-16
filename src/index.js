import './index.html';
import './index.scss';

import { Controller } from 'scrollmagic';

import { addAnimationsWithTrigger } from './scripts/main-scripts/createAnimationsModule';

document.addEventListener('DOMContentLoaded', function() {

    const animationController = new Controller();

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
        '.block-conclusion__line-divergence',
        '.block-conclusion__text'
    ]);

});