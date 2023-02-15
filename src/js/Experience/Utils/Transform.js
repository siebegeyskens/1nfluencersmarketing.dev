//
// transformcontrols
//
//https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_transform.html
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import Experience from "../Experience";
import Carousel from "../World/Carousel";

export default class Transform {
  constructor(objectName) {
    // grab references
    this.experience = new Experience();
    this.camera = this.experience.camera.instance;
    this.scene = this.experience.scene;
    // this.carousel = new Carousel();

    // state
    this.attachedIcon = null;

    // set-up
    let rendererElement = document.getElementById("webgl");
    document.body.appendChild(rendererElement);
    this.control = new TransformControls(this.camera, rendererElement);
    // this.control.setMode("rotate");
    this.control.space = "world";

    // on key down
    window.addEventListener("keydown", (event) => {
      this.onKeyDown(event);
    });

    // change event
    //https://threejs.org/docs/index.html#examples/en/controls/TransformControls
    this.control.addEventListener("change", () => {
      this.onChange();
    });

    // attach
    this.attach(objectName);
    // this.carousel.on("next", () => {
    //   this.attach(objectName);
    // });
  }

  // wait for resources to load, then:
  // reference object
  // set state (current attached object)
  // object to control
  // add control to the scen
  attach(objectName) {
    setTimeout(() => {
      // reference icon object (js object)
      let icon = this.experience.world.carousel.currentItem.icons[objectName];
      this.control.attach(icon.object);
      this.scene.add(this.control);
      // setState
      this.attachedIcon = icon;
    }, 0);
  }

  onChange() {
    if (this.attachedIcon) {
      console.log(
        `${this.attachedIcon.object.position.x},${this.attachedIcon.object.position.y}, ${this.attachedIcon.object.position.z}`,
        ` ${this.attachedIcon.object.rotation.x},${this.attachedIcon.object.rotation.y}, ${this.attachedIcon.object.rotation.z}`
      );
    }
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 96:
        if (this.control.space === "world") {
          this.control.space = "local";
        } else {
          this.control.space = "world";
        }

      case 87: // W
        this.control.setMode("translate");
        break;

      case 82: // E
        this.control.setMode("rotate");
        break;

      // case 82: // R
      //   this.control.setMode("scale");
      //   break;

      case 67: // C
        const position = currentCamera.position.clone();

        currentCamera = currentCamera.isPerspectiveCamera
          ? cameraOrtho
          : cameraPersp;
        currentCamera.position.copy(position);

        orbit.object = currentCamera;
        this.control.camera = currentCamera;

        currentCamera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
        onWindowResize();
        break;

      case 86: // V
        const randomFoV = Math.random() + 0.1;
        const randomZoom = Math.random() + 0.1;

        cameraPersp.fov = randomFoV * 160;
        cameraOrtho.bottom = -randomFoV * 500;
        cameraOrtho.top = randomFoV * 500;

        cameraPersp.zoom = randomZoom * 5;
        cameraOrtho.zoom = randomZoom * 5;
        onWindowResize();
        break;

      case 187:
      case 107: // +, =, num+
        this.control.setSize(this.control.size + 0.1);
        break;

      case 189:
      case 109: // -, _, num-
        this.control.setSize(Math.max(this.control.size - 0.1, 0.1));
        break;

      case 88: // X
        this.control.showX = !this.control.showX;
        break;

      case 89: // Y
        this.control.showY = !this.control.showY;
        break;

      case 90: // Z
        this.control.showZ = !this.control.showZ;
        break;

      case 32: // Spacebar
        this.control.enabled = !this.control.enabled;
        break;

      case 27: // Esc
        this.control.reset();
        break;
    }
  }
}
