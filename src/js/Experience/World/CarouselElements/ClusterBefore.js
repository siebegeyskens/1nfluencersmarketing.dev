import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import FullScreenSections from "../../../Layout/FullScreenSections";
import Experience from "../../Experience";
import parameters from "../../../Utils/parameters";

export default class Cluster {
  constructor(color, xpos) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;

    // clusters will listen to sections changing
    this.fullScreenSections = new FullScreenSections();

    // parameters
    this.scale = 0.49; // scale of the blob
    this.color = color;
    this.xpos = xpos;
    this.ypos = -parameters.offset;
    //   y: -0.166 - 2,

    this.setGeometry();
    // this.setTextures();
    this.setMaterial();
    this.setMesh();

    // listens to section changed (only from home to)
    // makes the icons follow the camera
    this.fullScreenSections.on("sectionChanged", () => {
      this.animate();
    });
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(this.scale);
    this.iconGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  }

  setMaterial() {
    const color = new THREE.Color(this.color);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
    });
    this.iconMaterial = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0,
    });
  }

  setMesh() {
    // test blob
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // test icon
    this.iconMesh = new THREE.Mesh(this.iconGeometry, this.iconMaterial);

    this.group = new THREE.Group();
    this.group.add(this.mesh, this.iconMesh);
    const iconStartX = -0.5;
    const iconStartY = parameters.offset;
    const iconStartZ = 0.5;
    this.iconMesh.position.set(iconStartX, iconStartY, iconStartZ);

    // set the initial x position
    this.setXPos(this.xpos);
    this.group.position.y = this.ypos;
    this.scene.add(this.group);
  }

  setXPos(xpos) {
    const threePosition = this.getThreePos(xpos);
    this.group.position.x = threePosition.x;
  }

  //
  // Helper functions
  //

  getThreePos(x) {
    let vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse
    vec.set(
      x,
      0, // doesn't matter in this case?
      0.5 // ?
    );
    vec.unproject(this.camera);
    vec.sub(this.camera.position).normalize();
    var distance = -this.camera.position.z / vec.z;
    pos.copy(this.camera.position).add(vec.multiplyScalar(distance));

    return pos;
  }

  // find out to animate up or down
  animate() {
    const lastIndex = this.fullScreenSections.getLastIndex();
    const index = this.fullScreenSections.getIndex();

    // if section change from home to services:
    if (lastIndex === 0 && index === 1) {
      this.animateDown();
    }

    // if section change from services to home:
    if (lastIndex === 1 && index === 0) {
      this.animateUp();
    }
  }

  animateDown() {
    gsap.to(this.iconMesh.position, 1, {
      x: this.iconMesh.position.x,
      y: -0.5, // relative offset to sphere
      z: this.iconMesh.position.z,
    });
    gsap.to(this.iconMesh.scale, 1, {
      x: this.iconMesh.scale.x / 3,
      y: this.iconMesh.scale.y / 3,
      z: this.iconMesh.scale.z / 3,
    });
  }

  animateUp() {
    gsap.to(this.iconMesh.position, 1, {
      x: this.iconMesh.position.x,
      y: parameters.offset, // relative offset to sphere
      z: this.iconMesh.position.z,
    });
    gsap.to(this.iconMesh.scale, 1, {
      x: this.iconMesh.scale.x * 3,
      y: this.iconMesh.scale.y * 3,
      z: this.iconMesh.scale.z * 3,
    });
  }
}
