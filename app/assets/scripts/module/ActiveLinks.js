import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class ActiveLinks {
    constructor() {
        this.headerLinks = $(".menu-list a");
        this.sectionLinks = $(".section-link");
        this.lazyImages = $(".lazyload");
        this.createWaypoints(); 
        this.refreshWayPoints();
    }

    refreshWayPoints() {
        this.lazyImages.on('load',function() {
            Waypoint.refreshAll();
        })
    }

    createWaypoints() {
        let that = this;
        this.sectionLinks.each(function() {
            let currentSection = this;
            new Waypoint({
                element: currentSection,
                handler: function(direction) {
                    if(direction === "down") {
                        let matchingHeaderLink = currentSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("active");
                        $(matchingHeaderLink).addClass("active");
                    }
                },
                offset: "40%"
            });

            new Waypoint({
                element: currentSection,
                handler: function(direction) {
                    if(direction === "up") {
                        let matchingHeaderLink = currentSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("active");
                        $(matchingHeaderLink).addClass("active");
                    }
                },
                offset: "-40%"
            });
        });
    }
}

export default ActiveLinks;