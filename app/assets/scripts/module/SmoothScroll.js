import $ from'jquery';
import smoothScroll from 'jquery-smooth-scroll';

class SmoothScroll {
    constructor() {
        this.headerLinks = $(".smooth-scroll a");
        this.enableSmoothScroll();
    }

    enableSmoothScroll() {
        this.headerLinks.smoothScroll();
    }
}

export default SmoothScroll;