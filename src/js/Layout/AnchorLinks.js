// pass sectionId in localstorage so index.js can handle state

export default class AnchorLinks {
    constructor () {
        const links = [...document.getElementsByClassName("anchor-link")];
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                this.anchor(e);
            })
        })
    }

    anchor = (e) => {
        const sectionId = e.target.dataset.sectionId;
        localStorage.setItem('sectionId', sectionId);
    }
};