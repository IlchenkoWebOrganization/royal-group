export default function setupMediaQuery(minWidth, maxWidth, onMatch, onUnmatch) {
    // Создание строки медиа-запроса
    let mediaQueryString = '';
    if (minWidth && maxWidth) {
        mediaQueryString = `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
    } else if (minWidth) {
        mediaQueryString = `(min-width: ${minWidth}px)`;
    } else if (maxWidth) {
        mediaQueryString = `(max-width: ${maxWidth}px)`;
    }

    // Создание объекта MediaQueryList
    const mediaQueryList = window.matchMedia(mediaQueryString);

    // Функция-обработчик для проверки соответствия медиа-запросу
    function handleMediaQueryChange(event) {
        if (event.matches) {
            onMatch();
        } else if (onUnmatch) {
            onUnmatch();
        }
    }

    // Первоначальная проверка
    handleMediaQueryChange(mediaQueryList);

    // Добавление слушателя изменений
    mediaQueryList.addEventListener('change', handleMediaQueryChange);
}