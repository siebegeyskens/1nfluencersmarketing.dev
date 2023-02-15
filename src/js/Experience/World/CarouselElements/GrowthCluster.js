import Cluster from "./Cluster";
import * as THREE from "three";

export default class GrowthCluster extends Cluster {
  constructor() {
    super();
    this.name = "Growth<br>hacking";
    this.id = "growth-title";
    this.href = "growth-hacking.html";
    this.resource = this.resources.items.growthClusterModel;
    this.xpos = -1;

    // lookuptable for the position & rotation
    this.lookup = {
      chart: {
        position: new THREE.Vector3(
          0.424997282827126,
          3.4157996684723786,
          -1.0412274966037618
        ),
        rotation: new THREE.Euler(
          -0.3889081441816851,
          0.31498095408788535,
          0.2588980889352418
        ),
      },
      pawn: {
        position: new THREE.Vector3(-0.51116, 4.90013, 0.12803518712524742),
        rotation: new THREE.Euler(-3.035216, 0.37108, -1.962836),
      },
      puzzle: {
        position: new THREE.Vector3(
          -0.7475879909669869,
          4.459533947599243,
          2.563596183199373
        ),
        rotation: new THREE.Euler(
          2.3988265370353643,
          0.6993242172289461,
          1.0880594511671197e-16
        ),
      },
      rocket: {
        position: new THREE.Vector3(
          -0.868773462246287,
          3.640247183612782,
          1.8839734702876343
        ),
        rotation: new THREE.Euler(
          -0.8240902922272266,
          0.9459104765142266,
          -1.9642259324687985
        ),
      },
      trophy: {
        position: new THREE.Vector3(
          1.7916742653581421,
          3.2360255897829613,
          -2.014511104841055
        ),
        rotation: new THREE.Euler(
          -1.1842010145217516,
          -0.5215156959368912,
          -2.898583344207282
        ),
      },
      instagram: {
        position: new THREE.Vector3(-0.8818079273027788, 4, -5.024335646507986),
        rotation: new THREE.Euler(
          -1.0799192717231312,
          0.11892970333011822,
          1.123176635116239
        ),
      },
      tiktok: {
        position: new THREE.Vector3(
          1.4794079192359648,
          5.6419618533294384,
          -0.5353736444246628
        ),
        rotation: new THREE.Euler(
          -0.31791748515787593,
          -0.7598699428809259,
          -0.8411139381633842
        ),
      },
    };

    this.setModel(this.name, this.id, this.href);
  }

  setHomePositions() {
    // console.log("home positions growth!");
  }

  setHomeRotations() {
    // console.log("home rotation campaign!");
  }
}
