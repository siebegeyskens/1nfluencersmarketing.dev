import { gsap } from "gsap";
import * as THREE from "three";
import Experience from "../../Experience";
import parameters from "../../../Utils/parameters";
import Carousel from "../Carousel";

export default class Title {
  static titles = [];
  constructor(blobPosition, title, id, href) {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera.instance;
    this.blobPosition = blobPosition;
    this.title = title;
    this.id = id;
    this.href = href;
    this.carousel = new Carousel(); // singleTon
    this.element;
    this.screenPosition;

    this.makeElement();
    this.get3DPosition();
    this.getPagePosition();
    this.setPagePostionNoAnimation();

    // store childs to reference in Time.js
    // using a static variable so this array doesn't change when creating new instances
    Title.titles.push(this);

    this.listenToCarousel();
  }

  /**
   * Initialize
   */
  makeElement() {
    // make elem
    this.element = document.createElement("a");
    this.element.setAttribute("id", this.id);
    this.element.setAttribute("href", this.href);
    this.element.innerHTML = this.title;
    this.element.classList.add("service-title");
    this.element.style.left = "50%";
    // add to dom
    document
      .getElementById("services-section")
      .insertAdjacentElement("afterbegin", this.element);
  }

  // titles x position = blobs x position
  // titles y position = blobs y position + offset off the 3D
  get3DPosition() {
    this.position = new THREE.Vector3(
      this.blobPosition.x,
      this.blobPosition.y + parameters.offset,
      0
    );
  }

  getPagePosition() {
    const position = this.position.clone();
    // get 2D coord from 3D coord
    // https://threejs-journey.com/lessons/mixing-html-and-webgl#setup
    this.screenPosition = position.project(this.camera);
  }

  setPagePostion() {
    // translate relative to it's starting position (in pixels instead of normalized value)
    // the titles dom style is centered so the translate are starting from the center of the page
    let translateX = this.screenPosition.x * this.sizes.width * 0.5;
    let translateY = -this.screenPosition.y * this.sizes.height * 0.5;

    /*
    translateY -= boundingRect.height / 2;
    */
    // get the bounding box
    const boundingRect = this.element.getBoundingClientRect();
    // add the half of width and height of the element to the translates so the element is centered over the cluster
    translateX -= boundingRect.width / 2;

    // add the translate to the css
    gsap.to(`#${this.id}`, parameters.animationDuration, {
      translateX: translateX,
      translateY: translateY,
    });
  }

  setPagePostionNoAnimation() {
    // translate relative to it's starting position (in pixels instead of normalized value)
    // the titles dom style is centered so the translate are starting from the center of the page
    let translateX = this.screenPosition.x * this.sizes.width * 0.5;
    let translateY = -this.screenPosition.y * this.sizes.height * 0.5;

    /*
    translateY -= boundingRect.height / 2;
    */
    // get the bounding box
    const boundingRect = this.element.getBoundingClientRect();
    // add the half of width and height of the element to the translates so the element is centered over the cluster
    translateX -= boundingRect.width / 2;

    //  document.getElementById(this.id).style.transform = `translate(${translateX, translateY})`;
    // add the translate to the css
    gsap.to(`#${this.id}`, 0, {
      translateX: translateX,
      translateY: translateY,
    });
  }

  /**
   * Animate
   */

  // update screenPosition
  // set Page position based on the changed screenPosition
  moveRight() {
    this.screenPosition.x += 0.5;
    this.setPagePostion();
  }

  // update screenPosition
  // set Page position based on the changed screenPosition
  moveLeft() {
    this.screenPosition.x -= 0.5;
    this.setPagePostion();
  }

  setCurrent() {
    this.element.classList.add("current-service-title");
  }

  unSetCurrent() {
    this.element.classList.remove("current-service-title");
  }

  /**
   * Listeneres
   */

  listenToCarousel() {
    this.carousel.on("next", () => {
      this.moveLeft();
    });
    this.carousel.on("prev", () => {
      this.moveRight();
    });
  }
}
