export default     function addMarginToContainerWidth(trackableContainer, containerToResize) {

    const trackabelContainerStyles = getComputedStyle(trackableContainer);
    
    const trackableContainerWidth = trackableContainer.offsetWidth;
    
    const trackableContainerMarginLeft = parseFloat(trackabelContainerStyles.marginLeft);
  
    // Calculate the new width for the casesTrigger
    const newWidth = trackableContainerWidth + trackableContainerMarginLeft
  
    // Apply the new width to the casesTrigger
    containerToResize.style.maxWidth = `${newWidth}px`;

}