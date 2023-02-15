import parameters from "../Utils/parameters";
import Footer from "./Footer";
import FullScreenSections from "./FullScreenSections";
// import DropDown from "./DropDownOnClick"

let instance = null;

export default class Navigation {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    this.fullScreenSections = new FullScreenSections(); // singleton
    this.footer = new Footer();
    this.btns = [...document.getElementsByClassName("section-nav-btn")];

    // also push these next links into the array because they need to go to a section as well
    this.indexFooterAboutBtn = document.getElementById("about-index-footer");
    this.btns.push(this.indexFooterAboutBtn);

    this.sections = [...this.fullScreenSections.sections];
    this.toTopBtn = document.getElementById("to-top-btn");
    this.on = true;

    this.hideAndShowToTop();

    // event listeners
    this.toTopBtn.addEventListener("click", (e) => {
      this.scrollToTop(e);
    });
    this.btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.onBtnClick(e);
      });
    });
    window.addEventListener("wheel", this.onMouseWheel);
    window.addEventListener("keydown", this.onKeyDown);
  }

  hideAndShowToTop() {
    // this.fullScreenSections.on("homeToServices", () => {
    //   setTimeout(() => {
    //     this.toTopBtn.classList.remove("hidden");
    //   }, parameters.scrollDuration * 1000);
    // });
    // this.fullScreenSections.on("servicesToHome", () => {
    //   this.toTopBtn.classList.add("hidden");
    // });

    this.fullScreenSections.on("sectionChanged", () => {
      const index = this.fullScreenSections.getIndex();
      if (index > 0) {
        setTimeout(() => {
          this.showToTop();
        }, (parameters.scrollDuration * 1000) / 2);
      } else if (index === 0) {
        this.toTopBtn.classList.add("hidden");
      }
    });
  }

  // called by ListenToAnchorLink.js
  showToTop() {
    this.toTopBtn.classList.remove("hidden");
  }

  onBtnClick(e) {
    const btn = e.target;
    // if clicked about button in footer of index.html
    // set navigation back on
    // footer scrolltop 0
    if (btn === this.indexFooterAboutBtn) {
      console.log("about!");
      this.on = true;
      this.footer.resetScroll();
    }
    const sectionId = btn.dataset.sectionId;
    const section = document.getElementById(sectionId);
    this.fullScreenSections.goToSection(section);
    e.preventDefault();
  }

  // Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
  // This way, if there's text input, the user is still able to fill it
  onKeyDown = (e) => {
    if (!this.on) {
      return;
    }
    if (e.key === "ArrowDown") {
      this.fullScreenSections.goToNextSection();
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      this.fullScreenSections.goToPrevSection();
    }
  };

  // // go to section associated with nav links
  // onBtnClick = (e) => {
  //   const navLink = e.target;
  //   const sectionId = navLink.dataset.sectionId;
  //   const section = document.getElementById(sectionId);
  //   this.fullScreenSections.goToSection(section);
  //   e.preventDefault();
  // };

  // When user scrolls with the mouse, slide to next or prev section
  onMouseWheel = (e) => {
    if (!this.on) {
      return;
    }
    const delta = e.wheelDelta;
    const sign = Math.sign(delta);
    const minDelta = 15;
    // const maxDelta = 201;

    // only go to section if delta is between extremums
    // this prevents doing the action multiple times because wheel event keeps triggering with a mousepad scroll or a infinite scroll mouse
    // https://stackoverflow.com/a/35999199
    // other way to do this is to set a time out

    // if (Math.abs(delta) > minDelta && Math.abs(delta) < maxDelta) {
    if (Math.abs(delta) > minDelta) {
      if (sign > 0) {
        // scroll up
        this.fullScreenSections.goToPrevSection();
      } else {
        // scroll down
        this.fullScreenSections.goToNextSection();
      }
    }
  };

  scrollToTop(e) {
    const section = document.getElementById("home-section");
    this.fullScreenSections.goToSection(section);
    // if pressed from footer (scroll navigation turned off) then put it back on
    if (!this.scrollOn) {
      this.on = true;
    }
    e.preventDefault();
  }
}
