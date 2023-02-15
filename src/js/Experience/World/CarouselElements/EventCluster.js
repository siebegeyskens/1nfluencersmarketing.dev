import Cluster from "./Cluster";
import * as THREE from "three";

export default class EventCluster extends Cluster {
  constructor() {
    super();
    this.name = "Event<br>management";
    this.id = "event-title";
    this.href = "event-management.html";

    // lookuptable for the position & rotation
    this.lookup = {
      balloon: {
        position: new THREE.Vector3(-0.6235290540851817, 4, 0.4524016783741378),
        rotation: new THREE.Euler(
          1.1844478366266198,
          1.297347369566134,
          -1.0975484263289492
        ),
      },
      calendar: {
        position: new THREE.Vector3(
          -0.8156014062091028,
          4.8358143502488256,
          0.30051580859070315
        ),
        rotation: new THREE.Euler(
          -0.7359759166813349,
          -0.6300762318098694,
          -0.17857656910528705
        ),
      },
      camera: {
        position: new THREE.Vector3(
          0.4357431843377553,
          3.914957114913528,
          2.239632734798033
        ),
        rotation: new THREE.Euler(
          -0.7364073178730903,
          -0.5886817165881958,
          -0.4663324910158186
        ),
      },
      mapPin: {
        position: new THREE.Vector3(1.5445722328363338, 4, 0.6648020107878887),
        rotation: new THREE.Euler(
          -0.4180871935219341,
          0.20958582993707608,
          0.09217272172870643
        ),
      },
      musicNote: {
        position: new THREE.Vector3(
          -0.530379837288419,
          4.651410066704096,
          2.829059402087097
        ),
        rotation: new THREE.Euler(
          -1.8818439097605324,
          0.2391307949897933,
          0.17815681337645597
        ),
      },
      instagram: {
        position: new THREE.Vector3(
          1.6803105020422118,
          5.456128685776851,
          -2.487472597965548
        ),
        rotation: new THREE.Euler(
          1.17261856542867,
          -0.5686542214408822,
          -2.1799994620876038
        ),
      },
      tiktok: {
        position: new THREE.Vector3(-1.1537776307143974, 4, 1.3968040380081947),
        rotation: new THREE.Euler(
          0.5093488913894229,
          -0.003698215344874222,
          -0.08737009122480903
        ),
      },
      youtube: {
        position: new THREE.Vector3(2.024507, 4.141878, -2.483751),
        rotation: new THREE.Euler(
          -1.1178782087049972,
          -0.5852712894267562,
          -0.6892825988199619
        ),
      },
      twitch: {
        position: new THREE.Vector3(
          -0.491508852524976,
          3.8003146827013348,
          2.61801193436811
        ),
        rotation: new THREE.Euler(
          2.006507817643387,
          0.24092187292708872,
          -0.19716705386887465
        ),
      },
    };

    this.resource = this.resources.items.eventClusterModel;
    this.xpos = 1;
    this.setModel(this.name, this.id, this.href);
  }

  setHomePositions() {
    // console.log("home positions event!");
  }

  setHomeRotations() {
    // console.log("home rotation campaign!");
  }
}
