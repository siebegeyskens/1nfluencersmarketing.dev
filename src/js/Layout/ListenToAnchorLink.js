// if index.html is visited from a service page
// set camera, clustericons, backgroundgradient & to top btn into place
// init is called when resources are loaded (Resources.js)

import FullScreenSections from "./FullScreenSections";
import Camera from "../Experience/Camera";
import Carousel from "../Experience/World/Carousel";
import BackgroundGradient from "./BackgroundGradient";
import Navigation from "./Navigation";

let instance = null;

export default class ListenToAnchorLink {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.sectionId = localStorage.getItem('sectionId');
        this.fullScreenSections = new FullScreenSections();
        this.camera = new Camera();
        this.backgroundGradient = new BackgroundGradient();
        this.navigation = new Navigation();
    }
    
    init = () => {
        // if localstarge sectionId is set (came from anchor-link on a service page)
        if (this.sectionId) {
            
            // change fullscreensections state (currentsection)
            const section = document.getElementById(this.sectionId);
            this.fullScreenSections.currentSection = section;
            
            // change camera position (according to currentsection)
            this.camera.changePosition();
            
            // icons position to services section (sets it to free influencers)
            this.carousel = new Carousel();
            this.carousel.currentItem.animateDownForAnchorLink();

            // change background (according to currentsection)
            this.backgroundGradient.changeBackgroundNoAnimation();

            // show to top btn
            this.navigation.showToTop();

            localStorage.clear();
        }  
    }

}