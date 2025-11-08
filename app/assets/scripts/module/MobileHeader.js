import $ from 'jquery';

class MobileHeader {
    constructor() {
        this.header = $(".header");
        this.menuIcon = $(".header__menu-icon");
        this.menuContainer = $(".header__menu-container");
        this.events();
    }f

    events() {
        this.menuIcon.on("click",this.toggleClass.bind(this));
    }

    toggleClass() {
        this.header.toggleClass("header__is-visible");
        this.menuContainer.toggleClass("header__menu-container__is-expanded");
        this.menuIcon.toggleClass("header__menu-icon__close");
    }
}

export default MobileHeader;