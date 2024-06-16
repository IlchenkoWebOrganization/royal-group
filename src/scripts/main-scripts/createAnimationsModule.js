import { Scene } from 'scrollmagic';

function addClassWithAnimationByTrigger(animationController, triggerSelector, changeBlock, changeSelector) {
    new Scene({
        triggerElement: `${triggerSelector}`, // Триггер нашей неоновой линии
    }).setClassToggle(`${changeBlock}`, `${changeSelector}`).addTo(animationController);
}

function addAnimationsWithTrigger(animationController, triggerSelector, elementsSelectors, className="visible") {
    elementsSelectors.forEach(elementSelector => {
        addClassWithAnimationByTrigger(animationController, triggerSelector, elementSelector, className);
    });
}

export {
    addClassWithAnimationByTrigger,
    addAnimationsWithTrigger,
}