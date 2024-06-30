const allCards = Array.from(document.getElementsByClassName('steps__item'));
const sectionElement = document.querySelector('.section--sticky');
const sectionTop = sectionElement.offsetTop;
const sectionHeight = sectionElement.getBoundingClientRect().height;
const SHADOW_CLASS = 'shadow';
const STEP_HEIGHT = 500;


const removeShadows = () => {
  allCards.forEach((element) => element.classList.remove('shadow'))
};

const isCurrentCard = (currentScrollY, index) => {
  console.log(currentScrollY)
  return currentScrollY > (sectionTop + (STEP_HEIGHT * index))
    && currentScrollY < (sectionTop + STEP_HEIGHT * (index + 1));
}

const checkAllCards = (currentScrollY) => {
  allCards.forEach((element, index) => {
    if(isCurrentCard(currentScrollY, index + 1) === true) {
      element.classList.add(SHADOW_CLASS)
    }
  })
}

window.addEventListener('scroll', (e) => {
  const currentScrollY = window.scrollY - STEP_HEIGHT;

  // убираем тень и не проверяем карточки в случае если секция не в фокусе зрения
  if(currentScrollY < sectionTop  
    || currentScrollY > (sectionTop + sectionHeight)) {
    removeShadows()
  } else {
    removeShadows();
    checkAllCards(currentScrollY);
  }
});