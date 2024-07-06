const allCards = Array.from(document.getElementsByClassName('sticky-section-steps__item'));
const sectionElement = document.querySelector('#stepsBlockTrigger');

const SHADOW_CLASS = 'shadow';
let STEP_HEIGHT = 700;


const removeShadows = () => {
  allCards.forEach((element) => element.classList.remove('shadow'))
};

const isCurrentCard = (sectionTop, currentScrollY, index) => {
  console.log(currentScrollY)
  return currentScrollY > (sectionTop + (STEP_HEIGHT * index))
    && currentScrollY < (sectionTop + STEP_HEIGHT * (index + 1));
}

const checkAllCards = (sectionTop, currentScrollY) => {
  allCards.forEach((element, index) => {
    if(isCurrentCard(sectionTop - STEP_HEIGHT, currentScrollY, index + 1) === true) {
      element.classList.add(SHADOW_CLASS)
    }
  })
}



    // window.addEventListener('scroll', (e) => {

    //   const sectionTop = sectionElement.offsetTop;
    
    //   const sectionHeight = sectionElement.getBoundingClientRect().height;
    
    //   const currentScrollY = window.scrollY - STEP_HEIGHT;
    
    //   // убираем тень и не проверяем карточки в случае если секция не в фокусе зрения
    //   if(currentScrollY < sectionTop  
    //     || currentScrollY > (sectionTop + sectionHeight)) {
    //     removeShadows()
    //   } else {
    //     removeShadows();
    //     checkAllCards(sectionTop, currentScrollY);
    //   }
    // });




    function handleScrollEvent() {

          const sectionTop = sectionElement.offsetTop;
        
          const sectionHeight = sectionElement.getBoundingClientRect().height;
        
          const currentScrollY = window.scrollY - STEP_HEIGHT;
        
          // убираем тень и не проверяем карточки в случае если секция не в фокусе зрения
          if(currentScrollY < sectionTop  
            || currentScrollY > (sectionTop + sectionHeight)) {
            removeShadows()
          } else {
            removeShadows();
            checkAllCards(sectionTop, currentScrollY);
          }
        }
  
  // Медиазапрос для минимальной ширины 670px
  const mediaQuery = window.matchMedia('(min-width: 660px)');
  
  // Функция для обработки изменения медиазапроса
  function handleMediaQueryChange(e) {
      if (e.matches) {
          // Добавляем слушатель прокрутки если ширина экрана 670px или больше
          window.addEventListener('scroll', handleScrollEvent);
      } else {
          removeShadows();
          window.removeEventListener('scroll', handleScrollEvent);
      }
  }
  
  // Добавляем слушатель для отслеживания изменений медиазапроса
  mediaQuery.addEventListener('change', handleMediaQueryChange);
  
  // Вызываем функцию сразу для начальной установки
  handleMediaQueryChange(mediaQuery);