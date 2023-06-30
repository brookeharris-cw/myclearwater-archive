
$(window).load(function () {
    /*flex slider initializers*/
    $('.home_collage').flexslider({
        directionNav: true,
        controlNav: true,
        slideshow: true
    });


    /*flex slider initializers*/
    $('.home_background').flexslider({
        slideshow: false,
        selector: ".slides > li",
        controlNav: true, //navigation dots.
       // manualControls: ".nav-tabs > li",
        directionNav: false,
        start: function () {
            $(".slide_content").addClass("slide_content-1");
        },

        after: function (slider) {
            window.curSlide = slider.currentSlide;

            var tar_class = window.curSlide + 1;
            tar_class = "slide_content-" + tar_class;

            $(".slide_content").removeClass("slide_content-1");
            $(".slide_content").removeClass("slide_content-2");
            $(".slide_content").removeClass("slide_content-3");
            $(".slide_content").removeClass("slide_content-4");
            $(".slide_content").addClass(tar_class);
        }
    }
    );
    $(".home_background li").each(function () {
        var img_src = $("img", this).attr('src');
        img_src = "url(" + img_src + ")";
        $(this).css({
            'background-image': img_src
        })
    })



    //$(window).resize($.debounce(50, OnResize));

    function OnResize() {
        //console.log(new Date());
        if ($(window).width() < 768) {
            $(".nav.nav-tabs").prependTo(".home_top");
        } else {
            $(".nav.nav-tabs").appendTo(".home_content");
        }
    }

    $('a[data-toggle = "tab"]').on('shown.bs.tab', function (e) {
        // Get the name of active tab
        var activeTab = $(e.target).attr('href');
        $('.tab-content>div').removeClass('active').removeClass('in');

        //var tabClass = $(this).attr('href');
        $(activeTab).addClass('active in');
        switch (activeTab) {
            case ".tabpanel-1":
                $('.home_background').flexslider(0);
                break;
            case ".tabpanel-2":
                $('.home_background').flexslider(1);
                break;
            case ".tabpanel-3":
                $('.home_background').flexslider(2);
                break;
            case ".tabpanel-4":
                $('.home_background').flexslider(3);
                break;
            case ".tabpanel-5":
                $('.home_background').flexslider(4);
                break;
            case ".tabpanel-6":
                $('.home_background').flexslider(5);
                break;
            default:

        }
        /* activeTab = activeTab.split('-')[1];
        $('.home_background li').fadeOut();
        $('.home_background li').eq(activeTab - 1).fadeIn();

       switch (activeTab) {

            case '1':
                $('.home_collage').addClass('style-1');
                $('.home_collage').removeClass('style-2');
                $('.home_collage').removeClass('style-3');
                $('.home_collage').removeClass('style-4');
                $('.home_collage').removeClass('style-5');
                $('.home_collage').removeClass('style-6');
                break;

            case '2':
                $('.home_collage').addClass('style-2');
                $('.home_collage').removeClass('style-1');
                $('.home_collage').removeClass('style-3');
                $('.home_collage').removeClass('style-4');
                $('.home_collage').removeClass('style-5');
                $('.home_collage').removeClass('style-6');
                break;
            case '3':
                $('.home_collage').addClass('style-3');
                $('.home_collage').removeClass('style-2');
                $('.home_collage').removeClass('style-1');
                $('.home_collage').removeClass('style-4');
                $('.home_collage').removeClass('style-5');
                $('.home_collage').removeClass('style-6');
                break;
            case '4':
                $('.home_collage').addClass('style-4');
                $('.home_collage').removeClass('style-2');
                $('.home_collage').removeClass('style-3');
                $('.home_collage').removeClass('style-1');
                $('.home_collage').removeClass('style-5');
                $('.home_collage').removeClass('style-6');
                break;
            case '5':
                $('.home_collage').addClass('style-5');
                $('.home_collage').removeClass('style-2');
                $('.home_collage').removeClass('style-3');
                $('.home_collage').removeClass('style-4');
                $('.home_collage').removeClass('style-1');
                $('.home_collage').removeClass('style-6');
                break;
            case '6':
                $('.home_collage').addClass('style-6');
                $('.home_collage').removeClass('style-2');
                $('.home_collage').removeClass('style-3');
                $('.home_collage').removeClass('style-4');
                $('.home_collage').removeClass('style-5');
                $('.home_collage').removeClass('style-1');
                break;
        }*/
        // Get the name of previous tab
        var previousTab = $(e.relatedTarget).text();

    });


    $(window).resize(function () {
        if ($(window).width() < 768) {
            if ($('.search_container').css('display') == 'none') {

                $('.search_container').show();

            }
        } else {
            if ($('.search_container').css('display') == 'block') {

                $('.search_container').hide();

            }

        }


    })

});