import $ from 'jquery';
import 'waypoints/lib/jquery.waypoints';
import 'jquery.counterup';

class Counter {
    constructor() {
        this.startCounter();
    }
    startCounter() {
        $('.counter-up').counterUp({
            delay:10,
            time:1000
        });
    }
}

export default Counter;