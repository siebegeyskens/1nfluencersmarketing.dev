import FormSelect from "./FormSelect";

export default class Form {
  constructor() {
    this.submitBtn = document.getElementById("form-submit");
    this.element = document.getElementById("form");
    this.formSelect = new FormSelect();
    this.init();
  }

  init = () => {
    this.submitBtn.addEventListener("click", () => {
      // first submit
      this.element.submit();

      // then clear:
      // clear all form
      this.clearForm();
      // clear the custom select
      this.formSelect.reset();
    });
  };

  clearForm = () => {
    this.element.reset();
  };
}
