import { gsap } from "gsap";

let instance = null;

export default class DropDownOnClick {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this;
        this.visible = false
        this.animationDuration = 0.3;
        this.element = document.getElementById("dropdown-container")
        this.arrow = document.getElementById("arrow-drop-down")
        this.btn = document.getElementById("services-btn");
        this.btn.addEventListener('click', () => {
            if (this.visible) {
                this.hide()
            } else if(!this.visible) {
                this.show()
            }
        })
    }

    show() {
        this.element.classList.remove('hidden')
        gsap.to("#arrow-drop-down", this.animationDuration, {
            rotation: 180
        })
        this.visible = true
    }
    
    hide() {
        this.element.classList.add('hidden')
        gsap.to("#arrow-drop-down",this.animationDuration, {
            rotation: 0
        })
        this.visible = false
    }
}