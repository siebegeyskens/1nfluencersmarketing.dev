export default class TextArea {
  constructor() {
    this.element = document.getElementById("message");
    this.floatingLabel = document.getElementById("message-floating-label");
    this.element.addEventListener("change", (e) => {
      this.check(e);
    });
  }

  check(e) {
    const value = e.target.value;
    if (value != "") {
      this.floatingLabel.classList.remove("hidden");
    } else if (value === "") {
      this.floatingLabel.classList.add("hidden");
    }
  }
}
