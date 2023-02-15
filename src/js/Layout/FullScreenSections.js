import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import EventEmitter from "../Utils/EventEmitter";
import BackgroundGradient from "./BackgroundGradient";
import Navigation from "./Navigation";
import parameters from "../Utils/parameters";

let instance = null; // singleton

// largely based of https://codepen.io/bassta/pen/qBbmLr?editors=0010
export default class FullScreenSections extends EventEmitter {
  // singleton
  constructor() {
    super(); // extends from EventEmmitter
    if (instance) {
      return instance;
    }
    instance = this;

    this.sectionsContainer = document.getElementById("sections-container");
    this.navLinks = document.getElementsByClassName("top-nav-btn");
    this.sections = document.getElementsByClassName("section");
    this.lastSection = [...this.sections][0];
    this.currentSection = [...this.sections][0];
    //Animating flag - is our app animating
    this.isAnimating = false;
    // get the pageheight before resize
    this.pageHeight = window.innerHeight;

    // event listeners
    window.addEventListener("resize", this.onResize);
  }

  // Find index of section in sectionsContainer https://stackoverflow.com/a/49646841
  getIndex = () => {
    return [...this.sections].indexOf(this.currentSection);
  };

  getLastIndex = () => {
    return [...this.sections].indexOf(this.lastSection);
  };

  // once gsap completed section slide animation
  onSectionChangeEnd = () => {
    this.isAnimating = false;
  };

  // actual transition between slides
  goToSection = (section) => {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.lastSection = this.currentSection;
      this.currentSection = section;

      // animate scrollposition
      gsap.to(this.sectionsContainer, parameters.scrollDuration, {
        scrollTo: { y: window.innerHeight * this.getIndex() },
        onComplete: this.onSectionChangeEnd,
        ease: parameters.ease,
      });

      this.setUpTriggers();
    }
  };

  // animate background - BackgroundGradient.js is listening
  // animate camera - Camera.js is listening
  // animate cluster - Cluster.js is listening (only between home and services)
  setUpTriggers = () => {
    this.trigger("sectionChanged");

    const lastIndex = this.getLastIndex();
    const index = this.getIndex();
    // if section change from home to services:
    if (lastIndex === 0 && index === 1) {
      this.trigger("homeToServices");
    }
    // if section change from services to home:
    if (lastIndex === 1 && index === 0) {
      this.trigger("servicesToHome");
    }
  };

  goToPrevSection = () => {
    const prevSection = this.currentSection.previousElementSibling;
    const isSection = prevSection.classList.contains("section");
    if (isSection) {
      this.goToSection(prevSection);
    }
  };

  goToNextSection = () => {
    const nextSection = this.currentSection.nextSibling;
    if (nextSection) {
      this.goToSection(nextSection);
    }
  };

  // Align current section to page on resize
  onResize = (e) => {
    const newPageHeight = window.innerHeight;

    if (this.pageHeight !== newPageHeight) {
      this.pageHeight = newPageHeight;

      // set the new height to container and every section (probably done with css but just to make sure)
      gsap.set([this.sectionsContainer, this.sections], {
        height: this.pageHeight + "px",
      });

      // put currentSection on top
      gsap.set(this.sectionsContainer, {
        scrollTo: { y: this.pageHeight * this.getIndex() },
      });
    }
  };
}
