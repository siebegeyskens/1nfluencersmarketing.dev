import Stats from "stats.js";
import EventEmitter from "../../Utils/EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    /**
     * Stats
     */
    // this.stats = new Stats();
    // this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(this.stats.dom);

    // Setup
    this.start = Date.now(); // timestamp when the experience starts
    this.current = this.start; // changes on each frame
    this.elapsed = 0; // how much time is spent since start of the experience
    this.delta = 16; // time spent since last frame

    // Wait one frame so this.delta doesn't resolve in 0
    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
  }

  nextFrame() {
    // this.stats.begin();
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("nextFrame");

    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
    // this.stats.end();y
  }
}
