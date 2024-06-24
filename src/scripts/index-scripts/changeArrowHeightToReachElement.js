export default function changeArrowHeightToReachElement(reachableElement, arrowToResize) {
    const rect = reachableElement.getBoundingClientRect();
    
    const endY = rect.bottom + window.scrollY;

    const startY = arrowToResize.getBoundingClientRect().top + window.scrollY;

    const requiredHeight = endY - startY;

    arrowToResize.style.height = `${requiredHeight + 50}px`;
}