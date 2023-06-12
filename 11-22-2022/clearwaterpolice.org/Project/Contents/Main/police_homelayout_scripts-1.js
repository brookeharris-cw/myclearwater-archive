
$(window).load(function ()
{

	$(window).resize($.debounce( 50, OnResize ));

		function OnResize()
		{
			//console.log(new Date());
			if ($(window).width() < 768) {
	            $(".nav.nav-tabs").prependTo(".home_top");
	        } else {
	            $(".nav.nav-tabs").appendTo(".home_content");
			}


			if ($(window).width() < 768) {
			    if ($('.search_container').css('display') == 'none') {
			        $('.search_container').show();

			    }
			} else {
			    if ($('.search_container').css('display') == 'block') {
			        $('.search_container').hide();

			    }

			}

		}


    /*flex slider initializers*/
		$('.home_background').flexslider({
		    directionNav: false,
		    controlNav: false,
            slideshow: false
		});

		$(".home_background li").each(function () {
		    var img_src = $("img", this).attr('src');
		    img_src = "url(" + img_src + ")";
		    $(this).css({
		        'background-image': img_src
		    })
		})



		$('.home_content').find(".nav.nav-tabs").find('a[data-toggle = "tab"]').on('shown.bs.tab', function (e) {
		    // Get the name of active tab
		    var activeTab = $(e.target).attr('href');
		    activeTab = activeTab.split('-')[1];
		    var homeSlider = $('.home_background').data('flexslider');
		    // now you can access all the methods for example flexAnimate
		    homeSlider.flexAnimate(activeTab - 1);

		});

});