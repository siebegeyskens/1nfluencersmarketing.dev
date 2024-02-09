import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import EventEmitter from "../../Utils/EventEmitter";
import ListenToAnchorLink from "../../Layout/ListenToAnchorLink";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {}; // contains the loaded resources
    this.toLoad = this.sources.length; // n. of sources to load
    this.loaded = 0; // n. of sources loaded
    this.listenToAnchorLinks = new ListenToAnchorLink();

    //
    // loading
    //
    this.loadingManager = new THREE.LoadingManager(
      // when loaded
      () => {
        // console.log("loaded!")
        document.getElementById("loader").classList.add("hidden");
        this.listenToAnchorLinks.init();
      },
      // on progress
      () => {
        // console.log("progress!")
      }
    );

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    const dracoLoader = new DRACOLoader(this.loadingManager);
    dracoLoader.setDecoderPath("./draco/");
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    );
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  // if loaded all in sources.js trigger event - World.js is listening
  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
