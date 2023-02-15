import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Icons from "./Icons.js";
import Carousel from "./Carousel";
import Slider from "./Slider.js";
import ListenToAnchorLink from "../../Layout/ListenToAnchorLink.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.listenToAnchorLinks = new ListenToAnchorLink();

    // for debugging
    this.resetOpacity = false;

    // Debug

    // Wait for resources
    this.resources.on("ready", () => {
      // this.slider = new Slider();
      this.carousel = new Carousel();
      this.environment = new Environment();

      this.setDebug();
    });
  }

  changeOpacity() {
    if (this.resetOpacity === true) {
      this.scene.traverse((child) => {
        if (child.type === "Mesh") {
          child.material.opacity = 1;
        }
      });
    } else {
      window.location.reload();
    }
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("world");
    }
    if (this.debug.active) {
      this.debugFolder
        .add(this, "resetOpacity")
        .name("reset opacity")
        .onChange(() => {
          this.changeOpacity();
        });
    }
  }

  update() {
    // if(this.fox)
    //     this.fox.update()
  }
}
