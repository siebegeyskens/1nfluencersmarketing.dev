import FullScreenSections from "../../../Layout/FullScreenSections";
import * as THREE from "three";
import FormSelect from "../../../Layout/FormSelect";
import Cluster from "./Cluster";

export default class CustomCluster extends Cluster {
  constructor() {
    super();
    this.name = "Custom<br>campaigns";
    this.id = "custom-title";
    this.href = "#";
    this.fullScreenSections = new FullScreenSections();
    this.formSelect = new FormSelect();

    // lookuptable for the position & rotation
    this.lookup = {
      camera: {
        position: new THREE.Vector3(
          0.8776921074907029,
          4.975347335308577,
          1.126147704465676
        ),
        rotation: new THREE.Euler(0.83924640009079, 0, 0.35017228718578525),
      },
      gift: {
        position: new THREE.Vector3(
          1.8434137540129698,
          2.9419093960401237,
          -0.18193741477634084
        ),
        rotation: new THREE.Euler(
          0.7774313911231201,
          0.21456999775482838,
          -0.6250221138755667
        ),
      },
      gear: {
        position: new THREE.Vector3(
          0.505862089341016,
          3.8956847365439686,
          2.2473116943506026
        ),
        rotation: new THREE.Euler(0.5918699170310668, 0, 0),
      },
      megaphone: {
        position: new THREE.Vector3(
          2.4648096720067425,
          3.978190724913105,
          -2.0359414433380936
        ),
        rotation: new THREE.Euler(
          -0.3942364611321048,
          0.37554333670569184,
          0.24086409009943963
        ),
      },
      puzzle: {
        position: new THREE.Vector3(
          -1.1191328329138426,
          3.9925147128931817,
          1.595933644108046
        ),
        rotation: new THREE.Euler(
          -1.1191328329138426,
          3.9925147128931817,
          1.595933644108046 - 0.9243748593215593,
          -0.25795908612733837,
          -0.1761784476205305
        ),
      },
      instagram: {
        position: new THREE.Vector3(
          -0.7421752139218389,
          4.8977557265700655,
          -0.3695801388135642
        ),
        rotation: new THREE.Euler(
          -0.5944895696588617,
          -0.11346820852401761,
          0.20284410807098868
        ),
      },
      tiktok: {
        position: new THREE.Vector3(0, 3.5229433684219575, 1.2663609780804892),
        rotation: new THREE.Euler(
          -1.2694271065927514,
          -0.4635608764283863,
          -1.8234445135940291
        ),
      },
      youtube: {
        position: new THREE.Vector3(
          1.0458025651274685,
          3.688068712684857,
          -5.4200381098088535
        ),
        rotation: new THREE.Euler(
          -0.5890704701080021,
          -0.7220709432434905,
          -0.06505322695592448
        ),
      },
      twitch: {
        position: new THREE.Vector3(
          -2.23376301285112,
          5.0622463782467495,
          -0.5182166883303161
        ),
        rotation: new THREE.Euler(
          -0.8921667212829156,
          0.6955964730403613,
          0.7348862455013343
        ),
      },
    };

    this.resource = this.resources.items.customClusterModel;
    this.xpos = -0.5;
    this.setModel(this.name, this.id, this.href);

    // When the title is made add event listener for click
    // when clicked go to contact section (with fullscreensections)
    // form select should go to custom
    this.title.element.addEventListener("click", () => {
      this.toSection();
      this.setForm();
    });
  }

  toSection() {
    const section = document.getElementById("contact-section");
    this.fullScreenSections.goToSection(section);
  }

  setForm() {
    this.formSelect.setToCustom();
  }

  setHomePositions() {
    // console.log("home positions custom!");
  }

  setHomeRotations() {
    // console.log("home rotation campaign!");
  }
}
