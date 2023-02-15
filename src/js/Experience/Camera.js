import { gsap } from "gsap";
import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import FullScreenSections from "../Layout/FullScreenSections.js";
import parameters from "../Utils/parameters";

let instance = null;

export default class Camera {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.fullScreenSections = new FullScreenSections();
    this.instance;

    // this.zpos = 6;
    this.zpos = 6;

    this.setInstance();
    //this.setControls();

    // camera scrolls on section change
    this.fullScreenSections.on("sectionChanged", () => {
      gsap.to(this.instance.position, parameters.scrollDuration, {
        y: -parameters.offset * this.fullScreenSections.getIndex(),
        ease: parameters.ease,
      });
    });
  }

  // change camera position according to fullscreensections state
  // called by ListenToAnchorLink.js
  changePosition() {
    this.instance.position.y =
      -parameters.offset * this.fullScreenSections.getIndex();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height, // aspect ratio
      0.1,
      100
    );
    this.instance.position.z = this.zpos;
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
  }
}
