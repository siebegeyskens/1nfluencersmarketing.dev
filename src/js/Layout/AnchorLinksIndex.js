// when clicked on backtotop > current cluster icons to home
//when clicked on about, contact > currentcluster icons to services

import Carousel from "../Experience/World/Carousel";
import parameters from "../Utils/parameters";

export default class AnchorLinksIndex {
constructor() {
    let buttons = [...document.getElementsByClassName("anchor-link")];
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            this.iconsDown();
        })
    })
    this.toTopBtn = document.getElementById("to-top-btn");
    this.toTopBtn.addEventListener("click", () => {
this.iconsUp();
    })
   
}
iconsDown() {
    // icons position to services section
    this.carousel = new Carousel();

    // this.carousel.currentItem.animateDown(parameters.scrollDuration / 3);
    this.carousel.currentItem.animateDown();
}

iconsUp() {
    // icons position to services section
    this.carousel = new Carousel();

    // this.carousel.currentItem.animateDown(parameters.scrollDuration / 3);
    this.carousel.currentItem.animateUp();
}
}