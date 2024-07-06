import manageLineHeight from "./manageLineHeight";

import setupMediaQuery from "../main-scripts/setupMediaQuery";

export default function() {

    setupMediaQuery(
        0, 700,
        () => {
            manageLineHeight('#numbersArrow', '#numbersSection', 10, 60);
        }
    );

    setupMediaQuery(
        700,
        1200, 
        () => {
            manageLineHeight('#numbersArrow', '#numbersSection', 90, 60);
        }
    );


    setupMediaQuery(
        1200,
        100000, 
        () => {
            manageLineHeight('#numbersArrow', '#numbersSection', 120, 60);
        }
    );

}