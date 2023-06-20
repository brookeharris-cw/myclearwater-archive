$(window).load(function () {
    /*flex slider initializers*/
    $('.home_collage').flexslider({
        directionNav: false,
        controlNav: true,
        slideshow: true
    });

    /*flex slider initializers*/
    $('.home_background').flexslider({
        directionNav: false,
        controlNav: false,
        slideshow: false
    });
    $('.home_content').find(".nav.nav-tabs").find('a[data-toggle = "tab"]').on('shown.bs.tab', function (e) {
        // Get the name of active tab
        var activeTab = $(e.target).attr('href');
        activeTab = activeTab.split('-')[1];
        var homeSlider = $('.home_background').data('flexslider');
        // now you can access all the methods for example flexAnimate
        homeSlider.flexAnimate(activeTab - 1);

    });

    //console.log(new Date());
    if ($(window).width() < 768) {

        $('.home_content').find(".nav.nav-tabs").prependTo(".home_top");

    } else {

        $('.home_top').find(".nav.nav-tabs").appendTo(".home_content");

    }

});