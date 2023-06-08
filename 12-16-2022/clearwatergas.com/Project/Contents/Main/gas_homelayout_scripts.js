$(window).load(function () {
    /*flex slider initializers*/
    $('.home_collage').flexslider({
        directionNav: false,
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

    var origin_img = "url(Project/Contents/Gas/_gfx/home/home_button_bg.png)";

    $(".nav-tabs li.active a").each(function () {
        var tar_img = $(this).attr("data-hover-src");
        tar_img = "url(" + tar_img + ")";
        $(this).css({
            'background-image': tar_img
        })
    })


    $(".nav-tabs li a").hover(function () {
        var tar_img = $(this).attr("data-hover-src");
        tar_img = "url(" + tar_img + ")";
        $(this).css({
            'background-image': tar_img
        })
    }, function () {
        if ($(this).parent().hasClass("active")) {
        } else {
            $(this).css({
                'background-image': origin_img
            })
        }

    })

    $(".nav-tabs li a").click(function () {

        $(".nav-tabs li a").each(function () {
            $(this).css({
                'background-image': origin_img
            })
        })
        var tar_img = $(this).attr("data-hover-src");
        tar_img = "url(" + tar_img + ")";
        $(this).css({
            'background-image': tar_img
        });
        $('.tab-content>div').removeClass('active').removeClass('in');
       
        var tabClass = $(this).attr('href');
        $(tabClass).addClass('active in');
        
        switch (tabClass) {
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
            default:

        }
    })

    /*var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });

    function doneResizing(){
            if ($(window).width() < 768) {
                $(".nav.nav-tabs").prependTo(".home_top");
            } else {
                $(".nav.nav-tabs").appendTo(".home_content");
            }
    }*/

    $(window).resize(OnResize);

    //$(window).resize($.debounce(50, OnResize));

    function OnResize() {
        //console.log(new Date());
        if ($(window).width() < 768) {
            $(".nav.nav-tabs").prependTo(".home_top");
        } else {
            $(".nav.nav-tabs").appendTo(".home_content");
        }
    }
});