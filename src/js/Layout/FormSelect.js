import { gsap } from "gsap";

let instance = null;

export default class FormSelect {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.animationDuration = 0.3;
    this.selectContainer = document.getElementById("select-container");
    // this.arrow = document.getElementById("select-arrow");
    this.selectOptionsContainer = document.getElementById(
      "select-options-container"
    );
    this.selectOptions = [...document.getElementsByClassName("select-option")];
    this.placeholder = document.getElementById("placeholder-text");
    this.floatingLabel = document.getElementById("select-floating-label");
    this.selected = null;
    this.hiddenInput = document.getElementById("service-input");

    this.selectOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        this.select(e);
      });
    });
    this.selectContainer.addEventListener("mouseover", () => {
      this.show();
    });
    this.selectContainer.addEventListener("mouseleave", () => {
      this.hide();
    });
  }

  show() {
    this.selectOptionsContainer.classList.remove("hidden");
    gsap.to("#select-arrow", this.animationDuration, {
      rotation: 180,
    });
  }

  hide() {
    // find out if mouse is in top
    this.selectOptionsContainer.classList.add("hidden");
    gsap.to("#select-arrow", this.animationDuration, {
      rotation: 0,
    });
  }

  reset() {
    //remove style from last selected
    this.selected.classList.remove("selected");
    this.selected = null;
    this.placeholder.innerText = "Select a service";
    this.placeholder.classList.remove("option-selected");
    this.floatingLabel.classList.add("hidden");
    //remove value of hidden input so it doesnt submit
    this.hiddenInput.removeAttribute("value");
  }

  select(e) {
    // clear the selected if it's the same
    if (e.target === this.selected) {
      this.reset();
      return;
    }

    //remove style from last selected
    if (this.selected != null) {
      this.selected.classList.remove("selected");
    }
    // change state
    this.selected = e.target;

    // change placeholder text
    this.placeholder.innerText = this.selected.innerText;
    // change placeholder style
    this.placeholder.classList.add("option-selected");
    // add checkmark and other styling to option
    this.selected.classList.add("selected");

    // show floating label
    if (this.floatingLabel.classList.contains("hidden")) {
      this.floatingLabel.classList.remove("hidden");
    }

    // add value to hidden input so it's sends along with the form
    this.hiddenInput.setAttribute("value", this.selected.innerText);
  }

  setToCustom() {
    //remove style from last selected
    if (this.selected != null) {
      this.selected.classList.remove("selected");
    }
    // change state
    this.selected = document.getElementById("custom-select-option");

    // change placeholder text
    this.placeholder.innerText = this.selected.innerText;
    // change placeholder style
    this.placeholder.classList.add("option-selected");
    // add checkmark and other styling to option
    this.selected.classList.add("selected");

    // show floating label
    if (this.floatingLabel.classList.contains("hidden")) {
      this.floatingLabel.classList.remove("hidden");
    }

    // add value to hidden input so it's sends along with the form
    this.hiddenInput.setAttribute("value", this.selected.innerText);
  }
}
