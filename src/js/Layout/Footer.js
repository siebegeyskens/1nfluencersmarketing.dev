import Navigation from "./Navigation";

// TODO:
// scroll with gsap and with max scroll sensitivity like in fullscreensections
//max scrollTop = 326
// this.section.scrollTop = 326;

let instance = null;

export default class Footer {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.navigation = new Navigation(); // singleton
    this.section = document.getElementById("contact-section");
    this.section.addEventListener("scroll", (e) => {
      this.scroll(e);
    });
      // window.addEventListener("keydown", (e) => {
      //   this.onKeyDown(e);
      // });
  }

  // turn off fullscreensections & navigation when scrollTop is > 0
  scroll(e) {
    const scrollTop = this.section.scrollTop;

    // turn of scroll navigation when footer is contact section scrolls down to footer
    // also turn of arrow key navigation
    if (scrollTop > 0) {
      this.navigation.on = false;
    }

    // if scrolled out of footer turn scroll & key navigation back on
    if (scrollTop === 0 && this.navigation.on === false) {
      this.navigation.on = true;
    }
  }

  resetScroll() {
    this.section.scrollTop = 0;
  }

  /*
  // when scrolled down into footer scroll back out on key up
  // put scrollNavigation a key navigation back on
  onKeyDown(e) {
    console.log(e);
    if (e.key === "ArrowUp" && this.section.scrollTop > 0) {
      this.section.scrollTop = 0;
      this.navigation.on = true;
    }
  }
  */
}
