export default class toTopBtn {
  constructor() {
    this.toTopBtn = document.getElementById("to-top-btn");
    this.listenToBtn();
    this.showHideBtn();
  }

  listenToBtn() {
    this.toTopBtn.addEventListener("click", (e) => {
      this.scrollToTop(e);
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  //monitor scrolltop of body
  //if > ...
  // show btn
  showHideBtn() {
    const max = window.innerHeight * 0.33;
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > max) {
        this.showBtn();
      } else if (window.scrollY <= max) {
        this.hideBtn();
      }
    });
  }

  showBtn() {
    this.toTopBtn.classList.remove("hidden");
  }

  hideBtn() {
    this.toTopBtn.classList.add("hidden");
  }
}
