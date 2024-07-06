import setupMediaQuery from "../main-scripts/setupMediaQuery"

function ellipseManager() {
    const ellipseMain = document.querySelector('.ellipse__main')
    const ellipseShadow = document.querySelector('.ellipse__shadow')

    if(!ellipseMain.classList.contains('expanded')) {

        setupMediaQuery(
            0, 700,
            () => {

                if(window.innerHeight < 617) {
                    ellipseMain.style.top = '100vh'
                    ellipseShadow.style.top = '100vh'
                } else {
                    ellipseMain.style.top = '95vh'
                    ellipseShadow.style.top = '95vh'
                }
            }
        );
    
        setupMediaQuery(
            700,
            1200, 
            () => {

                if(window.innerHeight < 666) {
                    ellipseMain.style.top = '100vh'
                    ellipseShadow.style.top = '100vh'
                } else {
                    ellipseMain.style.top = '87vh'
                    ellipseShadow.style.top = '87vh'
                }

            }
        );
    
    
        setupMediaQuery(
            1200,
            100000, 
            () => {

                if(window.innerHeight < 733) {
                    ellipseMain.style.top = '100vh'
                    ellipseShadow.style.top = '100vh'
                } else {
                    ellipseMain.style.top = '90vh'
                    ellipseShadow.style.top = '90vh'
                }

            }
        );

    } else {

        ellipseMain.style.top = '-10%';
        ellipseShadow.style.top = '-30%';
        
    }
}


export default function () {
    ellipseManager()
    
    window.addEventListener('resize', ellipseManager)
    
    
    const ellipseExpandObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                ellipseManager()
            }
        }
    });
    
    const ellipseMain = document.querySelector('.ellipse__main');
    
    ellipseExpandObserver.observe(ellipseMain, { attributes: true });
}