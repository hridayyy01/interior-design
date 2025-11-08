import Isotope from 'isotope-layout';
import $ from 'jquery';

class Gallery {
    constructor() {
        this.initializeIsotopes();
    }
    initializeIsotopes() {
        const iso = new Isotope("#isotope-container",{
            itemSelector: ".gallery-item",
        });

        $('#isotopes-filters button').on('click',function() {
            const filterValue = $(this).attr('data-filter');
            iso.arrange({filter: filterValue});
            $("#isotopes-filters .active").removeClass("active");
            $(this).addClass("active");
        })
    }
}

export default Gallery;