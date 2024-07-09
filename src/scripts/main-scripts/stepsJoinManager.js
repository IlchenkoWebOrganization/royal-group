export default function() {
    const fourthStepCard = document.querySelector('#fourthCard');

    const stepsContent = document.querySelector('#stepsContent');

    function showStepsJoinBtn() {
        const stepsJoinBtn = document.querySelector('#stepsJoin');

        stepsJoinBtn.classList.add('visible');
    }

    function hideStepsJoinBtn() {
        const stepsJoinBtn = document.querySelector('#stepsJoin');

        stepsJoinBtn.classList.remove('visible');
    }

    function hideStepsJoinBtnWhenFlex() {
        const stepsContent = document.querySelector('#stepsContent');

        const stepsJoinBtn = document.querySelector('#stepsJoin');

        if(!stepsContent.classList.contains('visible')) {
            stepsJoinBtn.classList.remove('visible');
        }
    }

    function showStepsJoinBtnWhenFlex() {
        const fourthStepCard = document.querySelector('#fourthCard');

        const stepsJoinBtn = document.querySelector('#stepsJoin');

        if(fourthStepCard.classList.contains('shadow')) {
            stepsJoinBtn.classList.add('visible');
        }

    }

    function handleFourthStepCardClassChange(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                showStepsJoinBtnWhenFlex();
            }
        }
    }

    function handleStepsContentClassChange(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                hideStepsJoinBtnWhenFlex();
            }
        }
    }


    function stepsJoinManager() {
        if(window.innerWidth <= 850) {

            var fourthBlockReachObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    showStepsJoinBtn();
                  } else {
                    hideStepsJoinBtn();
                  }
                });
              });
        
            fourthBlockReachObserver.observe(fourthStepCard);
            
        } else {
            showStepsJoinBtnWhenFlex()

            const fourthStepCardObserver = new MutationObserver(handleFourthStepCardClassChange);
            
            fourthStepCardObserver.observe(fourthStepCard, 
                {
                    attributes: true, // наблюдать за изменениями атрибутов
                    attributeFilter: ['class'] // наблюдать только за изменениями атрибута "class"
                }
            );
            
            const observer = new MutationObserver(handleStepsContentClassChange);
            
            observer.observe(stepsContent, 
                {
                    attributes: true, // наблюдать за изменениями атрибутов
                    attributeFilter: ['class'] // наблюдать только за изменениями атрибута "class"
                }
            );
    
        }
    }

    stepsJoinManager();

    window.onresize = stepsJoinManager;
}