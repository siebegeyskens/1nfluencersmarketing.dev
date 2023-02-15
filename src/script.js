// console.log(document.querySelector("meta[name=viewport]"))
// document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio));


import "./style.css";
import Experience from "./js/Experience/Experience.js";
import FullScreenSections from "./js/Layout/FullScreenSections";
import BackgroundGradient from "./js/Layout/BackgroundGradient";
import DropDownOnClick from "./js/Layout/DropDownOnClick";
import DropDownOnHover from "./js/Layout/DropDownOnHover";
import Navigation from "./js/Layout/Navigation";
import FormSelect from "./js/Layout/FormSelect";
import TextArea from "./js/Layout/TextArea";
import Footer from "./js/Layout/Footer";
import ListenToAnchorLink from "./js/Layout/ListenToAnchorLink";
import AnchorLinksIndex from "./js/Layout/AnchorLinksIndex";
import Transform from "./js/Experience/Utils/Transform";
import Form from "./js/Layout/Form";

// TODO key events
// TODO write classes

// fix Windows Scaling issues above 100%
// https://silvawebdesigns.com/how-to-fix-windows-scaling-issues-above-100-for-your-website/
// console.log(document.querySelector("meta[name=viewport]"))
// document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio));

/**
 * WebGl Experience
 */

const servicesExperience = new Experience(document.getElementById("webgl"));
const fullScreenSections = new FullScreenSections();
const backgroundGradient = new BackgroundGradient();
const dropDownOnClick = new DropDownOnClick();
const dropDownOnHover = new DropDownOnHover();
const navigation = new Navigation();
const formSelect = new FormSelect();
const textarea = new TextArea();
const footer = new Footer();
const listenToAnchorLink = new ListenToAnchorLink();
const anchorLinksIndex = new AnchorLinksIndex();
const form = new Form();

// window.addEventListener("click", (e) => {
//   console.log(e);
//   if (e.clientX < 50) {
//     const transform = new Transform("tiktok");
//   }
// });
