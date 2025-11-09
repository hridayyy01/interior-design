import "../styles/style.css";
import $ from "jquery";
import 'lazysizes';
import ActiveLinks from "./module/ActiveLinks";
import MobileHeader from "./module/MobileHeader";
import SmoothScroll from "./module/SmoothScroll";
import RevealOnScroll from "./module/RevealOnScroll";
import Counter from "./module/Counter";
import Gallery from "./module/gallery";


if(module.hot) {
    module.hot.accept();
}

new MobileHeader();
new ActiveLinks();
new SmoothScroll();
new RevealOnScroll($("#about-us"),"50%");
new RevealOnScroll($("#services"),"50%");
new RevealOnScroll($("#testimonials"),"50%");
new RevealOnScroll($("#achievements"),"50%");
new Gallery();
new Counter();