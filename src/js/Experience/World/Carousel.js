import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import * as THREE from "three";

import Experience from "../Experience.js";
import FullScreenSections from "../../Layout/FullScreenSections";
import parameters from "../../Utils/parameters";
import CampaignCluster from "./CarouselElements/CampaignCluster.js";
import FreeCluster from "./CarouselElements/FreeCluster.js";
import GrowthCluster from "./CarouselElements/GrowthCluster.js";
import CustomCluster from "./CarouselElements/CustomCluster.js";
import EventCluster from "./CarouselElements/EventCluster";
import EventEmitter from "../../Utils/EventEmitter.js";
import Title from "./CarouselElements/Title";

let instance = null;

export default class Carousel extends EventEmitter {
  constructor() {
    if (instance) {
      return instance;
    }
    super();
    instance = this;

    this.fullScreenSections = new FullScreenSections();
    this.experience = new Experience();
    this.camera = this.experience.camera.instance;
    // set clusters and store them in array
    this.items = [];
    this.setCarouselItems();
    this.titles = Title.titles;
    this.blobOpacity = 0.6;

    // keep track of current item in carousel
    this.currentItem = this.items[2];
    this.lastItem = this.items[1];
    this.lastClusterScene = this.lastItem.resource.scene;

    // initial values of currentCluster
    this.zpos = 1.75;
    this.moveItem();
    this.setThreeOpacity();
    // this.currentItem.initIconsPos();
    // when page loads the not current cluster icons have to go down already
    this.items.forEach((cluster) => {
      if (cluster != this.currentItem) {
        cluster.animateDownForAnchorLink();
      }
    });
    this.currentItem.title.setCurrent();
    // also set page position again to center the current title
    this.currentItem.title.setPagePostion();

    // grab reference to dom and init event listeners
    this.prevBtn;
    this.nextBtn;
    this.progressDots;
    this.handleDom();
  }

  // make three.js clusters and store in array
  // set x position along page coord
  setCarouselItems() {
    const growthCluster = new GrowthCluster();
    this.items.push(growthCluster);
    const customCluster = new CustomCluster();
    this.items.push(customCluster);
    const freeCluster = new FreeCluster();
    this.items.push(freeCluster);
    const campaignCluster = new CampaignCluster();
    this.items.push(campaignCluster);
    const eventCluster = new EventCluster();
    this.items.push(eventCluster);
  }

  // grab reference off dom service nav
  // add event listeners
  // grab reference off dom progress dots
  handleDom() {
    this.prevBtn = document.getElementById("previous-item");
    this.nextBtn = document.getElementById("next-item");

    this.prevBtn.addEventListener("click", () => {
      this.goToPrevItem();
    });
    this.nextBtn.addEventListener("click", () => {
      this.goToNextItem();
    });

    this.progressDots = [...document.getElementsByClassName("progress-dot")];
  }

  //
  //
  // Slider logic
  //
  //

  getIndex = (item) => {
    return this.items.indexOf(item);
  };

  // change state:
  // change lastitem & currentitem
  // keep track of the current & last cluster object in the array
  // change the carousel according to the state
  goToItem(index) {
    // set last item
    this.lastItem = this.currentItem;
    // set currentItem
    this.currentItem = this.items[index];

    this.moveCamera();
    this.moveItem();
    this.setThreeOpacity();
    this.setProgressDots();
    this.setTitle();
  }

  // find out left or right
  goToNextItem() {
    let index = this.getIndex(this.currentItem);
    if (index === 0) {
      this.prevBtn.classList.remove("hidden");
    }
    if (index < 4) {
      index++;
      this.goToItem(index);
      // Title.js is listening
      this.trigger("next");
    }
if (index === 4) {
this.nextBtn.classList.add("hidden");
}
  }
  goToPrevItem() {
    let index = this.getIndex(this.currentItem);
    if (index === 4) {
      this.nextBtn.classList.remove("hidden");
      }

    if (index > 0) {
      // if going to previouse and came from last cluster
      // show next btn again
      index--;
      this.goToItem(index);
      // Title.js is listening
      this.trigger("prev");
      console.log(index);

    }

    if (index === 0) {
      this.prevBtn.classList.add("hidden");
    }
    
  }

  //
  //
  // Carousel animations
  //
  //

  getCurrentClusterScene() {
    return this.currentItem.resource.scene;
  }

  getLastClusterScene() {
    return this.lastItem.resource.scene;
  }

  // move camera to currentitem
  moveCamera() {
    gsap.to(this.camera.position, parameters.animationDuration, {
      x: this.getCurrentClusterScene().position.x,
    });
  }

  //move the current cluster forward
  moveItem() {
    gsap.to(this.getLastClusterScene().position, parameters.animationDuration, {
      z: 0,
    });
    gsap.to(
      this.getCurrentClusterScene().position,
      parameters.animationDuration,
      {
        z: this.zpos,
      }
    );
  }

  setThreeOpacity() {
    // only get the icons from the scene and set opacity
    this.getCurrentClusterScene().traverse((child) => {
      if (
        child.name != "blob" &&
        child.name != "Scene" &&
        child.type != "Object3D"
      ) {
        gsap.to(child.material, parameters.animationDuration, { opacity: 1 });
      }
    });
    this.getLastClusterScene().traverse((child) => {
      if (
        child.name != "blob" &&
        child.name != "Scene" &&
        child.type != "Object3D"
      ) {
        gsap.to(child.material, parameters.animationDuration, { opacity: 0 });
      }
    });

    // only get the blob from the scene and set opacity
    const lastBlob = this.getLastClusterScene().children.filter(
      (child) => child.name === "blob"
    )[0];
    const currentBlob = this.getCurrentClusterScene().children.filter(
      (child) => child.name === "blob"
    )[0];
    gsap.to(lastBlob.material, parameters.animationDuration, {
      opacity: this.blobOpacity,
    });
    gsap.to(currentBlob.material, parameters.animationDuration, { opacity: 1 });
  }

  // get index of last item
  // grab coresponding progres dot and remove white background
  // grab coresponding progres dot and add white background
  setProgressDots() {
    const prevIndex = this.getIndex(this.lastItem);
    this.progressDots[prevIndex].classList.remove("current");
    const index = this.getIndex(this.currentItem);
    this.progressDots[index].classList.add("current");
  }

  // find title corresponding to currentitem
  // set to current
  // find title correspoinding to lastItem
  // unset to current
  setTitle() {
    const index = this.getIndex(this.currentItem);
    const currentTitle = this.titles[index];
    currentTitle.setCurrent();

    const lastIndex = this.getIndex(this.lastItem);
    const lastTitle = this.titles[lastIndex];
    lastTitle.unSetCurrent();
  }

  /**
   * Hover
   */

  mouseOverTitle(title) {
    // get the index and according title and cluster
    const index = this.titles.indexOf(title);
    const cluster = this.items[index];
    const titleElem = title.element;

    // todo: write methods in cluster class to move it up
    // todo: write methods in title class to move it up (according to the new cluster position)
    console.log(cluster, titleElem);
  }

  mouseLeavesTitle(title) {
    // get the index and according title and cluster
    const index = this.titles.indexOf(title);
    const cluster = this.items[index];
    const titleElem = title.element;

    // todo: write methods in cluster class to move it back down
    // todo: write methods in title class to move it back down (according to the new cluster position)
    console.log(cluster, titleElem);
  }

  handleHover() {
    console.log(this.titles);
    this.titles.forEach((title) => {
      const elem = title.element;
      elem.addEventListener("mouseover", () => {
        this.mouseOverTitle(title);
      });
      elem.addEventListener("mouseleave", () => {
        this.mouseLeavesTitle(title);
      });
    });
  }
}
