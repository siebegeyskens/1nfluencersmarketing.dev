import { gsap } from "gsap";

let instance = null;

export default class DropDownOnHover {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    // this.visible = false
    this.animationDuration = 0.3;
    this.imgElems = document.getElementsByClassName("dropdown-img");

    this.setState();

    this.element = document.getElementById("dropdown-container");
    this.arrow = document.getElementById("arrow-drop-down");
    this.btn = document.getElementById("services-btn");
    this.btn.addEventListener("mouseover", () => {
      this.show();
    });
    this.btn.addEventListener("mouseleave", () => {
      this.hide();
    });
    this.listenToHover();
  }

  show() {
    this.element.classList.remove("hidden");
    gsap.to("#arrow-drop-down", this.animationDuration, {
      rotation: 180,
    });
    // this.visible = true
  }

  hide() {
    // find out if mouse is in top
    this.element.classList.add("hidden");
    gsap.to("#arrow-drop-down", this.animationDuration, {
      rotation: 0,
    });
    // this.visible = false
  }

  change(event) {
    // hide current img
    this.currentImg.classList.add("hidden");

    // change state
    this.currentImg = document.getElementById(event.target.dataset.btn);

    // show img
    this.currentImg.classList.remove("hidden");
  }

  resetImg() {
    // reset img to start img
    // hide current img
    this.currentImg.classList.add("hidden");
    // change state
    this.currentImg = this.startImg;
    // show img
    this.currentImg.classList.remove("hidden");
  }

  listenToHover() {
    const btns = [...document.getElementsByClassName("dropdown-btn")];
    btns.forEach((btn) => {
      btn.addEventListener("mouseover", (event) => {
        this.change(event);
      });
      btn.addEventListener("mouseleave", () => {
        if (this.currentImg != this.startImg) {
          this.resetImg();
        }
      });
    });
  }

  setState() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    switch (page) {
      case "index.html":
        this.currentImg = document.getElementById("all-services");
        break;
      case "free-influencers.html":
        this.currentImg = document.getElementById("gift");
        break;
      case "growth-hacking.html":
        this.currentImg = document.getElementById("chart");
        break;
      case "influencer-campaigns.html":
        this.currentImg = document.getElementById("megaphone");
        break;
      case "event-management.html":
        this.currentImg = document.getElementById("camera");
        break;
    }
    this.startImg = this.currentImg;
  }
}
