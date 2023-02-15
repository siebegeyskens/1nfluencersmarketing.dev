import * as THREE from "three";
import { gsap } from "gsap";
import Experience from "../../Experience";
import parameters from "../../../Utils/parameters";
import FullScreenSections from "../../../Layout/FullScreenSections";
import { Vector3 } from "three";
import Carousel from "../Carousel";
import Title from "./Title";

export default class Cluster2 {
  constructor() {
    // this.counter = 0;
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.fullScreenSections = new FullScreenSections(); // singleton
    this.carousel = new Carousel(); // singleton

    // all the meshes in the scene
    this.meshes = [];

    this.icons = {};

    this.listenToSections();
  }

  // when section change between home and services do the animations
  listenToSections() {
    this.fullScreenSections.on("homeToServices", () => {
      if (this === this.carousel.currentItem) this.animateDown();
    });
    this.fullScreenSections.on("servicesToHome", () => {
      if (this === this.carousel.currentItem) this.animateUp();
    });
  }

  // grab some references and initisializations once the model is set by extended class
  setModel(name, id, href) {
    // actual scene of the loaded gltf
    this.scene = this.resource.scene;

    // grab reference to individual meshes in the scene
    this.scene.traverse((child) => {
      if (child.type === "Mesh") {
        this.meshes.push(child);
      }
    });

    // icons
    this.saveIcons();
    this.setIcons();

    // position the clusters
    this.setPosition();

    this.setTransparency();

    this.experience.scene.add(this.scene);

    //
    // TODO: set instance function that fires set model and set title
    // set the title:
    //
    this.title = new Title(this.scene.position, name, id, href);
  }

  /********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************

                                                  SET UP CLUSTER

   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************/

  setPosition = () => {
    // x position along page coord - laying them out from left of the screen to the right of the screen
    const threePosition = this.getThreePos(this.xpos);
    this.scene.position.x = threePosition.x;

    // y position along page coord - the clusters need to be on the services page so the y position = the offset + a little bit of offset
    // see three.js journey for how the offset works...
    // parameters
    // scale of the blob
    // scaled with blender
    //this.scale = 0.49;
    // 0.33 is extra offset of the cluster
    const ypos = -parameters.offset - parameters.carouselOffset;
    this.scene.position.y = ypos;
  };

  // page coord to 3D coord
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

  setTransparency() {
    this.meshes.forEach((mesh) => {
      mesh.material.transparent = true;
    });
  }
  /********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************

                                                  SET UP ICONS

   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************/

  // screen coord to 3D coord for the icons
  // x [-1,1]
  // y [-1,1]
  get3DPos(x, y, z) {
    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse

    vec.set(x, y, 0.5);

    vec.unproject(this.camera);

    vec.sub(this.camera.position).normalize();

    var distance = (z - this.camera.position.z) / vec.z;

    pos.copy(this.camera.position).add(vec.multiplyScalar(distance));

    // let xpos = pos.x;
    // let ypos = parameters.offset + parameters.carouselOffset + pos.y;
    // let zpos = pos.z - 1.75;

    pos.y += parameters.offset + parameters.carouselOffset;
    pos.z -= 1.75;

    // return [xpos, ypos, zpos];
    return pos;
  }

  // saveIcons
  saveIcons() {
    this.scene.children.forEach((child) => {
      if (child.name != "blob") {
        // store a reference to the icon object
        this.icons[child.name] = {};
        this.icons[child.name].object = child;
      }
    });
  }

  // // for all the icons store the start positions = imported positions
  // saveIconsServicePositions() {
  //   this.icons.objects.forEach((object) => {
  //     this.icons.servicePositions.push(object.position.clone());
  //   });
  // }

  // for every icon in the cluster
  // save position, rotation & scale from the imported gltf 3D file
  // set a position, rotation & scale for the 3D object on the home screen
  //

  // get random 2D coord
  // get 3D coord from 2D coord
  // save it to the icon homeposition
  // I use random 2D coord for now but
  // setHomePositions(icon) {
  //   const x = Math.random() * 2 - 1;
  //   const y = Math.random() * 2 - 1;
  //   const z = 4;

  //   let pos = this.get3DPos(x, y, z);
  //   icon.homePosition = pos;
  // }

  setHomePositions(icon) {
    const position = this.lookup[icon].position;
    // 2D coord to 3D coord
    // adjust z
    // position.z += 1.75;
    //let pos = this.get3DPos(position.x, position.y, position.z);
    // replace the z value with the on hardcoded in the look-up
    // pos.z = position.z;
    // save the homeposition
    //this.icons[icon].homePosition = pos;
    // init the position to the homepostion

    this.icons[icon].object.position.set(...position.toArray());
  }

  // const serviceRot = icon.copy.rotation;
  // icon.homeRotation = new THREE.Euler(
  //   serviceRot.x + Math.PI * 2,
  //   serviceRot.y + Math.PI * 2,
  //   serviceRot.z + Math.PI * 2
  // );
  setHomeRotations(icon) {
    const rotation = this.lookup[icon].rotation;
    const rot = new THREE.Euler(rotation.x, rotation.y, rotation.z);
    // save the hom rotation
    this.icons[icon].homeRotation = rot;
    // init the rotation to the homepostion
    this.icons[icon].object.rotation.set(...rot.toArray());
  }

  // todo:
  // multiply with a better chosen scalar
  setHomeScale(icon) {
    const serviceScale = new THREE.Vector3();
    serviceScale.copy(icon.copy.scale);
    icon.homeScale = new THREE.Vector3();
    icon.homeScale = serviceScale.multiplyScalar(Math.random(1));
  }

  setIcons() {
    for (const icon in this.icons) {
      // currentIcon = js object
      const currentIcon = this.icons[icon];
      currentIcon.copy = new THREE.Object3D();
      currentIcon.copy.copy(currentIcon.object);

      // reference initial home position
      currentIcon.homePosition = this.lookup[icon].position;
      currentIcon.object.position.set(...currentIcon.homePosition.toArray());

      // reference initial home rotation
      currentIcon.homeRotation = this.lookup[icon].rotation;
      currentIcon.object.rotation.set(...currentIcon.homeRotation.toArray());

      // save home properties (pos, rot, scale)
      // this.setHomePosition(currentIcon);
      // this.setHomePositions(icon);
      // this.setHomeRotations(icon);
      //this.setHomeScale(currentIcon);

      // init icons to home properties
      // currentIcon.object.rotation.set(...currentIcon.homeRotation.toArray());
      //currentIcon.object.scale.set(...currentIcon.homeScale.toArray());
    }
    // this function is defined in the extended classes
  }

  /********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************

                                                  ICONS ANIMATION

   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************
   ********************************************************************************************************/

  animatePositionDown(icon) {
    // the referenced object to change - the actual icon in the scene
    const position = icon.object.position;

    // position vector of the object when it was loaded in
    const servicePosition = icon.copy.position;

    // animation
    gsap.to(position, parameters.scrollDurationIcons, {
      x: servicePosition.x,
      y: servicePosition.y,
      z: servicePosition.z,
      ease: parameters.easeIcons,
    });
  }

  animateRotationDown(icon) {
    // the referenced object to change - the actual icon in the scene
    const rotation = icon.object.rotation;

    // position vector of the object when it was loaded in
    const serviceRotation = icon.copy.rotation;

    // animation
    gsap.to(rotation, parameters.scrollDurationIcons, {
      x: serviceRotation.x,
      y: serviceRotation.y,
      z: serviceRotation.z,
      ease: parameters.easeIcons,
    });
  }

  animateScaleDown(icon) {
    // the referenced object to change - the actual icon in the scene
    const scale = icon.object.scale;

    // position vector of the object when it was loaded in
    const serviceScale = icon.copy.scale;

    // animation
    gsap.to(scale, parameters.scrollDurationIcons, {
      x: serviceScale.x,
      y: serviceScale.y,
      z: serviceScale.z,
      ease: parameters.easeIcons,
    });
  }

  animateDown() {
    for (const icon in this.icons) {
      // the icon - js object
      const currentIcon = this.icons[icon];

      // POSITION
      this.animatePositionDown(currentIcon);
      this.animateRotationDown(currentIcon);
      //this.animateScaleDown(currentIcon);
    }
  }

  // animate down if landed on index through a service page
  animateDownForAnchorLink() {
    for (const icon in this.icons) {
      const currentIcon = this.icons[icon];

      // position
      const position = currentIcon.object.position;
      position.x = currentIcon.copy.position.x;
      position.y = currentIcon.copy.position.y;
      position.z = currentIcon.copy.position.z;

      // rotation
      const rotation = currentIcon.object.rotation;
      rotation.x = currentIcon.copy.rotation.x;
      rotation.y = currentIcon.copy.rotation.y;
      rotation.z = currentIcon.copy.rotation.z;

      // scale
      // const scale = currentIcon.object.scale;
      // scale.x = currentIcon.copy.scale.x;
      // scale.y = currentIcon.copy.scale.y;
      // scale.z = currentIcon.copy.scale.z;
    }
  }

  animatePositionUp(icon) {
    // the referenced object to change - the actual icon in the scene
    const position = icon.object.position;

    // position vector of the object when it was loaded in
    const homePosition = icon.homePosition;

    // animation
    gsap.to(position, parameters.scrollDurationIcons, {
      x: homePosition.x,
      y: homePosition.y,
      z: homePosition.z,
      ease: parameters.easeIcons,
    });
  }

  animateRotationUp(icon) {
    // the referenced object to change - the actual icon in the scene
    const rotation = icon.object.rotation;

    // position vector of the object when it was loaded in
    const homeRotation = icon.homeRotation;

    // animation
    gsap.to(rotation, parameters.scrollDurationIcons, {
      x: homeRotation.x,
      y: homeRotation.y,
      z: homeRotation.z,
      ease: parameters.easeIcons,
    });
  }

  animateScaleUp(icon) {
    // the referenced object to change - the actual icon in the scene
    const scale = icon.object.scale;

    // position vector of the object when it was loaded in
    const homeScale = icon.homeScale;

    // animation
    gsap.to(scale, parameters.scrollDurationIcons, {
      x: homeScale.x,
      y: homeScale.y,
      z: homeScale.z,
      ease: parameters.easeIcons,
    });
  }

  animateUp() {
    for (const icon in this.icons) {
      // the icon - js object
      const currentIcon = this.icons[icon];

      // POSITION
      this.animatePositionUp(currentIcon);
      this.animateRotationUp(currentIcon);
      //this.animateScaleUp(currentIcon);
    }
  }
}
