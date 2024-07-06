import { debounce } from "lodash";

export default function manageLineHeight(lineSelector, sectionSelector, baseLineHeight = 0, lineOffset = 100) {

    const line = document.querySelector(lineSelector);

    // Изменение высоты линии исходя из высоты секции с дебаунсом
    const matchHeightWithDebounce = function(bounceTime) {
        return debounce((section, line) => {
            const height1 = section.offsetHeight + lineOffset;
    
            line.style.height = `${height1}px`;
        }, bounceTime);
    }

    // Функция изменения высоты при смене видимости линии
    const matchHeightChangeVisibility = matchHeightWithDebounce(0);

    // Функция изменения высоты при изменении размеров окна (с задержкой в 1,5 секунды)
    const matchHeightResize = matchHeightWithDebounce(1500);


    // Функция установки базового значения высоты линии
    function setBaseLineHeight(line) {
        line.style.height = `${baseLineHeight}px`;
    }

    const setBaseLineHeightWithDebounce = debounce(
        (line) => setBaseLineHeight(line), 
    700);


    // Установка высоты при смене видимости элемента
    function setHeight() {
        const section = document.querySelector(sectionSelector);
        const line = document.querySelector(lineSelector);

        if (line.classList.contains('visible')) {
            matchHeightChangeVisibility(section, line)
        } else {
            setBaseLineHeight(line)
        }
    }


    // Отслеживание добавления и удаления класса visible линии
    const lineVisibleObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                setHeight()
            }
        }
    });

    lineVisibleObserver.observe(line, { attributes: true });

    


    // Установка базового значения высоты линии при загрузке
    setBaseLineHeight(line);
    
    
    
    // Отслеживание размеров окна и изменение размеров линии в заваисимости от этого
    window.addEventListener('resize', () => {
        const section = document.querySelector(sectionSelector);
        const line = document.querySelector(lineSelector);

        if(line.classList.contains('visible')) {
            matchHeightResize(section, line);
        } else {
            setBaseLineHeightWithDebounce(line)
        }
    })

}