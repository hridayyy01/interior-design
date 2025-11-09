import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(els,offset="40%") {
        this.itemsToReveal = els;
        this.offsetPerc = offset;
        this.hideInitially();
        this.createWayPoints();
    }

    hideInitially() {
        this.itemsToReveal.addClass("reveal-item");
    }

    createWayPoints() {
        let that = this;
        this.itemsToReveal.each(function() {
            let currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function() {
                    $(currentItem).addClass("reveal-item__is-visible");
                },
                offset: that.offsetPerc
            });
        });
    }
}

export default RevealOnScroll;