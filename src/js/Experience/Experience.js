import * as THREE from "three";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";

import sources from "./sources.js";

let instance = null;

//
// Experience class handles everything related to WebGL
//

export default class Experience {
  constructor(_canvas) {
    // Singleton (so that it's property classes can acces it's properties)
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.time = new Time();
    this.renderer = new Renderer();
    this.world = new World();

    // Helpers
    // const axesHelper = new THREE.AxesHelper( 5 );
    // this.scene.add( axesHelper );

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time nextFrame event
    this.time.on("nextFrame", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  // call window.experience.destroy() in the console
  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
