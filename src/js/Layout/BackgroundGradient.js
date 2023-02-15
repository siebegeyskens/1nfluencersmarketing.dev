import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import FullScreenSections from './FullScreenSections'
import parameters from "../Utils/parameters"
let instance;
export default class BackgroundGradient {

    constructor () {
      if (instance) {
        return instance;
      }
      instance = this;

        this.fullScreenSections = new FullScreenSections()

        this.backgroundColors = [
            `hsla(248,66%,82%,1)`,
            `hsla(248,66%,82%,.28)`,
            `hsla(248,66%,82%,.20)`,
            `hsla(248,66%,82%,0)`,
          ]
      
          this.backgroundImages = [
            `    
            radial-gradient(at 0% 0%,hsla(248,100%,68%,1) 0px, transparent 50%),
            radial-gradient(at 69% 0%,hsla(270,100%,68%,1) 0px, transparent 50%),
            radial-gradient(at 49% 100%,hsla(257,100%,68%,1) 0px, transparent 50%),
            radial-gradient(at 96% 87%,hsla(232,100%,68%,1) 0px, transparent 50%),
            radial-gradient(at 0% 62%,hsla(214,100%,68%,1) 0px, transparent 50%)
            `,
            `
            radial-gradient(at 0% 0%,hsla(230,100%,68%,.28) 0px, transparent 50%), 
            radial-gradient(at 69% 0%, hsla(248,100%,68%,.28) 0px, transparent 50%),
            radial-gradient(at 49% 100%, hsla(248,100%,68%,.39) 0px, transparent 50%),
            radial-gradient(at 96% 87%, hsla(248,100%,68%,.28) 0px, transparent 50%),
            radial-gradient(at 0% 62%, hsla(248,100%,68%,.28) 0px, transparent 50%)
            `,
            `
            radial-gradient(at 0% 0%,hsla(248,100%,68%,.20) 0px, transparent 50%), 
            radial-gradient(at 69% 0%, hsla(248,100%,68%,.20) 0px, transparent 50%),
            radial-gradient(at 49% 100%, hsla(248,100%,68%,.20) 0px, transparent 50%),
            radial-gradient(at 96% 87%, hsla(248,100%,68%,.20) 0px, transparent 50%),
            radial-gradient(at 0% 62%, hsla(248,100%,68%,.20) 0px, transparent 50%)
            `,
            `
            radial-gradient(at 0% 0%,hsla(248,100%,68%,0) 0px, transparent 50%), 
            radial-gradient(at 69% 0%, hsla(248,100%,68%,0) 0px, transparent 50%),
            radial-gradient(at 49% 100%, hsla(248,100%,68%,0) 0px, transparent 50%),
            radial-gradient(at 96% 87%, hsla(248,100%,68%,0) 0px, transparent 50%),
            radial-gradient(at 0% 62%, hsla(248,100%,68%,0) 0px, transparent 50%)
            `,
          ]

        // on section changed
        this.fullScreenSections.on('sectionChanged', () => {
            this.changeBackground();
        }) 
    }

    changeBackground() {
      // bug bc. of the ";" at the end of backgroundImage property
      // don't put a ";"
      gsap.to(".background", parameters.scrollDuration, {
        backgroundColor: this.backgroundColors[this.fullScreenSections.getIndex()],
        backgroundImage: this.backgroundImages[this.fullScreenSections.getIndex()]})
    }

    changeBackgroundNoAnimation() {
      document.getElementById("sections-container").style.backgroundColor = this.backgroundColors[this.fullScreenSections.getIndex()];
      document.getElementById("sections-container").style.backgroundImage = this.backgroundImages[this.fullScreenSections.getIndex()];
    }

} 