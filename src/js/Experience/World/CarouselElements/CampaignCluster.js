import Cluster from "./Cluster";
import * as THREE from "three";

export default class CampaignCluster extends Cluster {
  constructor() {
    super();
    this.name = "Influencer<br>campaigns";
    this.id = "campaign-title";
    this.href = "influencer-campaigns.html";

    // lookuptable for the position & rotation
    this.lookup = {
      bulb: {
        position: new THREE.Vector3(
          0.8070358460422469,
          4.5974985740931515,
          1.407827921855608
        ),
        rotation: new THREE.Euler(
          -0.2592771011950168,
          -0.13058445593748091,
          -0.4096283302888055
        ),
      },
      hashtag: {
        position: new THREE.Vector3(
          -0.5990289204045707,
          6.068583536086465,
          -1.6763719194773992
        ),
        rotation: new THREE.Euler(
          2.489079097399296,
          0.3687640286434473,
          -1.829076970538707
        ),
      },
      magnet: {
        position: new THREE.Vector3(2.068158109261139, 4.603509474638199, 0),
        rotation: new THREE.Euler(
          -1.167983782924304,
          -0.9659141489785952,
          2.6130334802041735
        ),
      },
      megaphone: {
        position: new THREE.Vector3(
          -0.988783120110683,
          4.489918281406602,
          1.702785149684411
        ),
        rotation: new THREE.Euler(
          0.5297680964448833,
          0.9386230542984516,
          -0.8548975279975666
        ),
      },
      target: {
        position: new THREE.Vector3(
          -0.4169267225843871,
          3.4997832770489747,
          0.9677663264951675
        ),
        rotation: new THREE.Euler(
          -0.6024711900986213,
          0.6619559630780365,
          0.27764513644879896
        ),
      },
      instagram: {
        position: new THREE.Vector3(
          0.7190428531234643,
          2.924789401028609,
          -1.044008700040283
        ),
        rotation: new THREE.Euler(
          -1.221137264230167,
          -0.15981957003535038,
          -0.41151036257161755
        ),
      },
      tiktok: {
        position: new THREE.Vector3(
          -1.74383634549142,
          3.0722052961365436,
          0.25848117311156704
        ),
        rotation: new THREE.Euler(
          0.7403567707150676,
          0.8184161642204987,
          0.9552268857406906
        ),
      },
      twitch: {
        position: new THREE.Vector3(-0.4337773255298645, 4, -2.329233474863199),
        rotation: new THREE.Euler(
          0.6646061050583332,
          0.5778652397472643,
          -0.40439478733234935
        ),
      },
      youtube: {
        position: new THREE.Vector3(
          0.6286724928912446,
          4.109550779284975,
          2.834443968859685
        ),
        rotation: new THREE.Euler(
          0.8504985383523607,
          -0.4195041859040414,
          0.28410211091958476
        ),
      },
    };

    this.resource = this.resources.items.campaignClusterModel;
    this.xpos = 0.5;
    this.setModel(this.name, this.id, this.href);
  }
}
