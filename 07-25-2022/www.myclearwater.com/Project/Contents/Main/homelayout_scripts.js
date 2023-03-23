
//function DropDownUL(el) {
//    this.dd = $(el);
//    this.itemClass = el;
//    this.initEvents();

//}
//DropDownUL.prototype = {
//    initEvents: function () {
//        var obj = this;

//        obj.dd.on('click', function (event) {
//            $(obj.itemClass).not($(this)).removeClass('active');
//            $(this).toggleClass('active');
//            event.stopPropagation();
//        });

//        $(document).click(function () {
//            $(obj.itemClass).removeClass('active');
//        });
//    }
//}


(function ($) {
    $.fn.preLoad = function (opts) {
        var options = $.extend({}, $.fn.preLoad.defaults, opts);

        var searchkey = "*[" + options.keyHover + "]";
        $(searchkey, options.root).each(function () { $('<img/>')[0].src = $(this).attr(options.keyHover); });
    };
    $.fn.preLoad.defaults = {
        root: ".home_buttons",
        keyHover: "data-hover-src"
    };

})(jQuery);

//equalize height
(function ($, window, undefined) {
    'use strict';

    $.fn.EqualizeHeight = function (options) {

        this.default = {
            delay: 100,
            responsive: []
        };

        options = options || {};
        var opts = $.extend(true, {}, this.default, options); //merge user and default options

        var tallestHeight = 0,
            breakpoint,
            $effectedColumns,
            $columns = this;

        $columns.breakpoints = [];
        $columns.breakpointColumns = [];
        if (opts.responsive &&
                opts.responsive.length &&
                opts.responsive !== null) {

            $.each(opts.responsive, function (i, val) {
                $columns.breakpoints.push(opts.responsive[i].breakpoint);
                $columns.breakpointColumns[opts.responsive[i].breakpoint] = opts.responsive[i].columns;
            });
        }


        $columns.reset = function () {
            $columns.css('min-height', 'auto');
            tallestHeight = 0
        }

        $columns.setHeight = function (w) {

            var targetBreakpoint = 0;
            if ($columns.breakpoints) {
                for (breakpoint in $columns.breakpoints) {
                    if ((w < $columns.breakpoints[breakpoint])) {
                        targetBreakpoint = $columns.breakpoints[breakpoint];
                    }
                }
            }

            if (targetBreakpoint == 0) {
                $effectedColumns = $columns;
            } else {
                $effectedColumns = $($columns.breakpointColumns[targetBreakpoint]);

            }

            $columns.each(function (i, el) {
                if ($(el).outerHeight() > tallestHeight) {
                    tallestHeight = $(el).outerHeight();
                }
            });

            $effectedColumns.css('min-height', tallestHeight);

        }


        //init - first load
        $columns.setHeight(window.width || $(window).width());


        var resizeTimer;
        $(window).on('resize', function (e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                //reset height
                $columns.reset();

                //check breakpoint
                var w = window.width || $(window).width();
                $columns.setHeight(w);
            }, opts.delay);
        });
        return $columns;
    };
}(jQuery, window));
/*
$('.col-left, .col-mid, .col-right').EqualizeHeight({
    delay: 40,
    responsive: [
        {
            breakpoint: 959,
            columns: '.col-left, .col-mid'
        },
        {
            breakpoint: 631,
            columns: ''
        }
    ]
});
*/

function changeBG(key) {
    var imageArray = [];
    if (key == 'work') {
        imageArray = imageWork;
    }
    else if (key == 'live') {
        imageArray = imageLive;
    }
    else if (key == 'play') {
        imageArray = imagePlay;
    }

    var random = Math.floor((Math.random() * imageArray.length));
    var stylebg = "background-image: url(" + imageArray[random] + ") !important;";
    $(".sitewrapper").attr("style", stylebg);

};
$(window).load(function ()
{
    /** start of tabs **/
    $(function () {
        $("body").delegate(".tabs a:not(.tab_active)", "click", function () {
            $(".tab_active", $(this).closest('.tabs')).each(function (i, n) {
                $(n).removeClass("tab_active");
                $($(n).attr("targetTab")).removeClass('tab_active');
            });
            $(this).addClass("tab_active");
            var targetTab = $(this).attr("targetTab");
            $(targetTab).addClass("tab_active");
            
            switch (targetTab) {
                case "#tab-3":
                    $('.home_collage').flexslider(0);
                    break;
                case "#tab-4":
                    $('.home_collage').flexslider(1);
                    break;
                case "#tab-5":
                    $('.home_collage').flexslider(2);
                    break;
                default:

            }
        });
    });
    /** end of tabs **/

    $(function () {
        //var aa = new DropDownUL('.dropdown_custom_links');

        //$('.dropdown_custom_links').click(function (event) {
        //    $('.dropdown_custom_links').not($(this)).removeClass('active');
        //    $(this).toggleClass('active');
        //    event.stopPropagation();
        //});

        //$(document).click(function () {
        //    // all dropdowns
        //    $('.dropdown_custom_links').removeClass('active');
        //});
    });

    $(function () {

        $('.dropdown_custom_links').click(function (event) {
            $('.dropdown_custom_links').not($(this)).removeClass('active');
            $(this).toggleClass('active');
            event.stopPropagation();
        });

        $(document).click(function () {
            // all dropdowns
            $('.dropdown_custom_links').removeClass('active');
        });
    });

       
    function DropDownUL() {

    }

    function preload(root, key)
    {
        if (key == null) { key = "data-hover-src"; }
        var searchkey = "*[" + key + "]";
        $(searchkey, root).each(function () { $('<img/>')[0].src = $(this).attr(key); });
    }

    // Check If HomePage
    if ($('.sitewrapper').hasClass('mainSpan_wrapper_home')) {
        $('body').addClass('homepage');
    }


    $(".home_buttons").preLoad();

    /*preload home buttons hover images*/
    //preload(".home_buttons", "data-hover-src");
    //preload();
    //preload(".home_buttons", null); //preload "data-hover-src" of ".home_buttons"
    //preload(null, "data-hover-src"); //preload the whole site

    //home buttons
    $(".home_buttons li")
        .mouseover(function () { $(this).find("img").attr("src", $(this).attr("data-hover-src")); })
        .mouseout(function () { $(this).find("img").attr("src", $(this).attr("data-src")); });
    

    if ($(".home_faq").length)
    {
        $("a.listfaq_q_content", ".home_faq").fancybox({ 'hideOnContentClick': true });
    }

});