import * as THREE from "three";
import Experience from "../Experience.js";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import FullScreenSections from "../../Layout/FullScreenSections";
import Cluster from "./CarouselElements/ClusterBefore.js";
import CampaignCluster from "./CarouselElements/Cluster.js";
import parameters from "../../Utils/parameters";

export default class Carousel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.fullScreenSections = new FullScreenSections();

    // paramaters
    this.currentItemZPos = 1.75;

    // set clusters and store them in array
    this.items = [];
    this.setCarouselItems();

    // keep track of current item in carousel
    this.currentItem = this.items[2];
    this.lastItem = null;

    // initial values of currentitem
    this.currentItem.iconMaterial.opacity = 1;
    this.currentItem.material.opacity = 1;
    this.currentItem.group.position.z = this.currentItemZPos;

    // grab reference to dom and init event listeners
    this.prevBtn;
    this.nextBtn;
    this.progressDots;
    this.handleDom();

    // camera scrolls on section change
    this.fullScreenSections.on("sectionChanged", () => {
      gsap.to(this.camera.position, 1, {
        y: -parameters.offset * this.fullScreenSections.getIndex(),
      });
    });
  }

  // make three.js clusters and store in array
  setCarouselItems() {
    this.growthCluster = new Cluster("red", -1);
    this.items.push(this.growthCluster);
    this.customCluster = new Cluster("orange", -0.5);
    this.items.push(this.customCluster);
    this.freeCluster = new Cluster("yellow", 0);
    this.items.push(this.freeCluster);
    this.campaignCluster = new Cluster("green", 0.5);
    this.items.push(this.campaignCluster);
    this.eventCluster = new Cluster("blue", 1);
    this.items.push(this.eventCluster);
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

  getIndex = (item) => {
    return this.items.indexOf(item);
  };

  goToItem(index) {
    // set last item
    this.lastItem = this.currentItem;
    // set currentItem
    this.currentItem = this.items[index];

    this.moveItem();
    this.setThreeOpacity();
    this.moveCamera();
    this.setProgressDots(index);
  }

  goToNextItem() {
    let index = this.getIndex(this.currentItem);
    if (index < 4) {
      index++;
      this.goToItem(index);
    }
  }

  goToPrevItem() {
    let index = this.getIndex(this.currentItem);
    if (index > 0) {
      index--;
      this.goToItem(index);
    }
  }

  // opacity of last item to 0
  // current item opacity to 1
  setThreeOpacity() {
    // icons
    gsap.to(this.lastItem.iconMaterial, 0.5, { opacity: 0 });
    gsap.to(this.currentItem.iconMaterial, 0.5, { opacity: 1 });

    // blobs
    gsap.to(this.lastItem.material, 0.5, { opacity: 0.6 });
    gsap.to(this.currentItem.material, 0.5, { opacity: 1 });
  }

  // move camera to currentitem
  moveCamera() {
    gsap.to(this.camera.position, 0.5, {
      x: this.currentItem.group.position.x,
    });
  }

  //move the current cluster forward
  moveItem() {
    gsap.to(this.lastItem.group.position, 0.5, { z: 0 });
    gsap.to(this.currentItem.group.position, 0.5, { z: this.currentItemZPos });
  }

  // get index of last item
  // grab coresponding progres dot and remove white background
  // grab coresponding progres dot and add white background
  setProgressDots(index) {
    const prevIndex = this.getIndex(this.lastItem);
    this.progressDots[prevIndex].classList.remove("current");
    this.progressDots[index].classList.add("current");
  }
}
