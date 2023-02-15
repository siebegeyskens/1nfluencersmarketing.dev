import Cluster from "./Cluster";
import * as THREE from "three";

export default class FreeCluster extends Cluster {
  constructor() {
    super();
    this.name = "Free<br>influencers";
    this.id = "free-title";
    this.href = "free-influencers.html";

    // lookuptable for the position & rotation
    this.lookup = {
      at: {
        position: new THREE.Vector3(0.643448, 4.525747, 0.781843),
        rotation: new THREE.Euler(
          -0.8296386971750812,
          -0.10695591420554314,
          0.5179851662418784
        ),
      },
      gift: {
        position: new THREE.Vector3(
          0.29356326447419817,
          3.979922584398053,
          3.13489258783869
        ),
        rotation: new THREE.Euler(
          0.3291037850091223,
          -0.31704076454664054,
          -7.302852464676272e-18
        ),
      },
      instagram: {
        position: new THREE.Vector3(
          -1.0756918500217152,
          4.46912531231108,
          1.9207522672674142
        ),
        rotation: new THREE.Euler(
          -1.0646878142760587,
          0.3858950706433658,
          0.596548724519998
        ),
      },
      mobile: {
        position: new THREE.Vector3(
          3.827927859415556,
          4.166550450222454,
          -4.8442858837507305
        ),
        rotation: new THREE.Euler(0.431313, -0.783154, 0.8597),
      },
      piggybank: {
        position: new THREE.Vector3(
          -0.6694608357280684,
          3.8722917410755167,
          1.9335109857717638
        ),
        rotation: new THREE.Euler(
          -0.5287673843549867,
          1.0922920952647113,
          0.9979658205639568
        ),
      },
      thumbUp: {
        position: new THREE.Vector3(
          -2.1150669565399913,
          6.268643022924208,
          -4.350512615029342
        ),
        rotation: new THREE.Euler(
          0.5552566501237599,
          -0.20515481282579995,
          0.5163062717763635
        ),
      },
      tiktok: {
        position: new THREE.Vector3(
          -0.48308451086932136,
          3.2199921137345244,
          -1.2438686584387013
        ),
        rotation: new THREE.Euler(
          0.868749586041976,
          -0.3828924048269077,
          0.8237724562097362
        ),
      },
    };

    this.resource = this.resources.items.freeClusterModel;
    this.xpos = 0;
    this.setModel(this.name, this.id, this.href);
  }
}
