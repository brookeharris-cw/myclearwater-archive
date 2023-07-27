/*

EXTERNAL LINK INTERCEPT SCRIPT
- Interacts with links to add a modal window when an external link is clicked.
- The below runs onLoad and interacts with the A tags

How to include on page:

The following need to be included on your page for this script to work. If you include this script as well as the following, this intercept should automatically work.
- jquery-XX.js
- jquery-migrate-XX.js
- nps-bootstrap.min.js
- jquery.colorbox-min.js

Created By: Andy Reid
Original Date: October 15, 2010

Modifications;
DATE		NAME			DESC
5/12/2011	Andy Reid		Removed some weird references to usa.gov that were breaking the code
11/15/2011  Trevor Cole 	Removed style modal and replaced with colorbox modal.
							Added support to intercept mailto links with colorbox modal window if the class of the a tag is "colorbox-iframe"
5/21/2013	Andy Reid		Modified script to be less prone to error out when a user puts in a bad link. removed commented out code. backed up locally if you need it.
12/15/2014  Trevor Cole 	Added a tooltip to a certain link (NPF) class to open a modal window to display a form.
3/31/2015   Joe Flowers 	Switch to bootstrap modals for responsive design
06/15/2015  Paul Tsao		Added selector to handle href in image map
12/16/2015  Andy Reid		Added missing modal support and script note above
03/15/2017  Darrin Maule  	Added Exception for Google Sites
09/26/2017	Trevor Cole		Added Exceptions for VideoJS Social Sharing links
10/12/2017  Darrin Maule 	Resolved issue which kept the contact us modal from opening
01/28/2021	Andrew Mills	Added rsgsurvey.com to exception URL tests
01/29/2021	Andrew Mills	Added https://doimspp.sharepoint.com to exception URL tests
04/07/2021	Andrew Mills	Added https://teams.microsoft.com/l/ to exception URL tests
*/

jQuery(document).ready(function(){
	
	// Make sure we have the modal div ready. this is often already on our templates
	if(jQuery("#myModal").length == 0) {
		jQuery(document.body).append('<div id="myModal" class="modal refreshableModal"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
	}

	// Loop over the anchor tags on the page
	jQuery("a, area").each(function(){ 
		// Get the HREF Destination
		hrefVal = jQuery(this).attr("href");
		// Get the Class (used to exclude vjs-share-*)
		classVal = jQuery(this).attr("class"); 

		// Check that we have an href
		if ( ( hrefVal != undefined && hrefVal != '' && hrefVal != '#' && hrefVal.length > 4 ) && !( classVal != undefined && classVal.indexOf("vjs-share-") > -1 ) ){   
			
			// Strip old intercept urls preemtively
			hrefVal_strp = strip_old_intercepts( get_url_from_handlelink(hrefVal) );
					
			if (hrefVal != hrefVal_strp) {  jQuery(this).attr("href", hrefVal_strp);  }  
			hrefVal = hrefVal_strp;

			// String old intercept from the html of the element
			hrefHTML = jQuery(this).html();
			hrefHTML_strp = strip_old_intercepts( get_url_from_handlelink(hrefHTML) );
			if (hrefHTML != hrefHTML_strp) {  jQuery(this).html(hrefHTML_strp);  }
		
			// Get the href start value
			startStrVal = hrefVal.substring(0, 7);
			isProtocolAgnostic=hrefVal.substring(0, 2) == "//";
			
			// Check if we have a valid URL
			// CT Update: a valid url may be protocal agnostic and start with //

			if ( isProtocolAgnostic || startStrVal == 'http://' || startStrVal == 'https:/' || hrefVal.indexOf("javascript:HandleLink") != -1  ){
				
				// Get the HREF domain
				hrefDomain = get_hostname_from_url(hrefVal);
				
				// Check if we are going to the NPF Modal First
				if (hrefVal.indexOf("http://join.nationalparks.org/news-and-updates") !=-1){
					// load in css for tooltips
					if (document.createStyleSheet){
						document.createStyleSheet('/ADF/thirdParty/jquery/ui/jquery-ui-1.9/css/sunny/jquery-ui.css');
						document.createStyleSheet('/common/commonspot/templates/css/npf-tooltip.css');
					} else {
						jQuery("head").append("<link rel='stylesheet' href='/ADF/thirdParty/jquery/ui/jquery-ui-1.9/css/sunny/jquery-ui.css' type='text/css' media='screen' />");
						jQuery("head").append("<link rel='stylesheet' href='/common/commonspot/templates/css/npf-tooltip.css' type='text/css' media='screen' />");
					}
					// Remove onClick bindings
					jQuery(this).unbind('click');
					jQuery(this).attr("onClick", "");
					
					jQuery(this).attr("title", "This link will direct you to a non-government website that may have different privacy policies from those of the National Park Service.");
					//jQuery(this).attr("title", "Join the community of park supporters! Sign up to get the latest news from the National Park Foundation and receive your FREE Owner’s Guide today.");
					// This soltuion requires jQueryUI's tooltip, so we need to load it if it's not already loaded on the page
					// is it already loaded? Let's find out!
					if (typeof jQuery.ui != 'undefined') {
						// jQueryUI loaded, let's do something!
						jQuery('.npf-tooltip').tooltip({
							track: true,
							position: {
								my: "center bottom-20",
							    at: "center top",
							    using: function( position, feedback ) {
							    jQuery( this ).css( position );
							    jQuery( "<div>" )
							    	.addClass( "arrow" )
							        .addClass( feedback.vertical )
							        .addClass( feedback.horizontal )
							        .appendTo( this );
								}
							}
						});
					}else{
						// We need to load jQueryUI first
						var url = '/ADF/thirdParty/jquery/ui/jquery-ui-1.9/js/jquery-ui-1.9.js';
						jQuery.getScript( url )
							.done(function( script, textStatus ) {
						  		jQuery('.npf-tooltip').tooltip({
									track: true,
									position: {
										my: "center bottom-20",
								    	at: "center top",
								    	using: function( position, feedback ) {
								    		jQuery( this ).css( position );
								    		jQuery( "<div>" )
								    			.addClass( "arrow" )
								        		.addClass( feedback.vertical )
								        		.addClass( feedback.horizontal )
								        		.appendTo( this );
										}
									}
								});
							});
					}					
					
				}
				
				// Check if we are leaving the domain
				else if (hrefDomain != window.location.hostname && hrefDomain.indexOf(".gov") < 0 && hrefDomain.indexOf(".mil") < 0 && hrefDomain.indexOf(".si.edu") < 0 && hrefDomain.indexOf(".fed.us") < 0 && hrefDomain.indexOf("rsgsurvey.com") < 0 && hrefDomain.indexOf("teams.microsoft.com") < 0 && hrefDomain.indexOf("doimspp.sharepoint.com") < 0 && hrefDomain.indexOf("pvs.nupointsystems.com") < 0 ){

					/* NOTE: we set the 7 second timeout for the redirect in the modal_intercept.cfm file */
					var destURL = jQuery(this).attr("href");
					destURL="/common/commonspot/customcf/modals/modal_intercept.cfm?targetURL="+encodeURIComponent(destURL); 
						
					// open exit message
					jQuery(this).attr('data-toggle','modal');
					jQuery(this).attr('data-target','#myModal');
					jQuery(this).attr('data-remote',destURL);
					
				}
			}
			
			// check if it is a redirected mailto - if so, apply bootstrap modal
			if (hrefVal.indexOf("/common/utilities/sendmail/sendemail.cfm") !=-1){
				var me = this;
				jQuery(this).attr('original-href',hrefVal)
				jQuery(this).click(function(ev) {
					ev.preventDefault();
					if (jQuery('#modal-contact-us')) {
						_setModalContactUsHeight= function($body) {
							$body = jQuery('#modal-contact-us .modal-body');
							$body.css({
								height: 925
							});
						};

						var originalHREF=jQuery(this).attr('original-href');
						//var rdHref=originalHREF.replace("/sendmail/","/sendmail/rd/");
						var rdHref=originalHREF.replace("/sendmail/","/sendmail/");
						jQuery("#modal-contact-us-iframe").attr('src',rdHref); //sets the value for the iFrame to point to
						jQuery('#modal-contact-us').on('shown.bs.modal', function () { 
							/* set the height  when displayed */
							$body = jQuery('#modal-contact-us .modal-body');
							jQuery('#modal-contact-us .modal-body').css('z-index',999);
						
							_setModalContactUsHeight($body);



						}).on('hidden.bs.modal', function () {
						    //show 'from scratch' every time iFrame opens 
						    jQuery(this).removeData('bs.modal');
						}).modal({	
							//open our modal
					    	show: true
					    })
					    
					}
				});
			}
			
			// check if it is a redirected mailto and add the class iframe if it is
			if (hrefVal.indexOf("/customcf/audio_video/dspEmbeddedObject.cfm") !=-1){
				jQuery(this).addClass('colorbox-iframe-av');
			}
			if (hrefVal.indexOf("http://join.nationalparks.org/news-and-updates") != -1){
				jQuery(this).addClass('colorbox-iframe-npf');
			}
		}
	});

	window.closeContactModal = function() {
		if (jQuery('#modal-contact-us')) {
			jQuery('#modal-contact-us').modal('hide');
		}
	}
	window.closeInterceptModal = function() {
		if (jQuery('#myModal')) {
			jQuery('#myModal').modal('hide');
		}
	}
	window.fixContactModalHeight=function(num){
		if (jQuery('#modal-contact-us .modal-body')) {
			jQuery('#modal-contact-us .modal-body').css('height',num);	
		}
	}

	/* 
		whenever one of our bootstrap modals closes, this code runs
		Make sure not to put assign this event listener inside of the anchor loop above else it'll run hundreds of times
	 */
	jQuery('body').on('hidden.bs.modal', '#myModal', function () {
		/* removeData forces bootstrap modals to 'refresh' every time they load as if loading a new webpage
		   Useful for instance if they open the contact modal, then the intercept modal ... or open-close-open a modal  */
		jQuery(this).removeData('bs.modal');

		//if they clicked to close the intercept modal, stop the timer that takes them offsite.  this timer would be created in modal_intercept.cfm
		if (window.interceptExitInterval) {
			clearInterval(window.interceptExitInterval);
		}
	});

	// open any tag with a class of "colorbox-iframe" in a colorbox iframe
	jQuery('a.colorbox-iframe').colorbox({fixed:true, iframe:true, scrolling: true, transition:"none", title:"Contact Form", close:"close", width:"95%", height:"95%"});
	//jQuery('a.colorbox-iframe-map').colorbox({fixed:true, iframe:true, scrolling: false, transition:"none", title:jQuery('a.colorbox-iframe-map').attr('name'), close:"close", width:"800", height:"600"});
	jQuery('a.colorbox-iframe-npf').colorbox({
		fixed:true, 
		iframe:true, 
		transition:'none', 
		title:'National Park Foundation', 
		scrolling:true, 
		returnFocus:true, 
		trapFocus:true, 
		width:"650", 
		height:"640",  
		maxWidth:'95%', 
		maxHeight:'95%',  
		href:'http://join.nationalparks.org/news-and-updates', 
		onOpen: function () {
			// close the tooltip!!!
			jQuery('div[id^="ui-tooltip-"]:last').remove();
			// add event listener for postMessage
			// this is powerful mojo allowing a 3rd party site to send messages for us to act upon.
			// In this case, we are closing the modal, but we could just as easily resize it, chance it's source, etc.
			window.addEventListener('message', function(e){
				if ( e.origin !== 'http://join.nationalparks.org' )
					return;
				console.log(e);
				if ( e.data == 'closeModal'){
					jQuery.colorbox.close();
				} else {
					alert('invalid message');
				}
			}, false);
			return;
        }
	});
	/* Colorbox resize function */
	var resizeTimer;
	function resizeColorBox() {
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			if (jQuery('#cboxOverlay').is(':visible')) {
				jQuery.colorbox.load(true);
			}
		}, 50)
	}
	// Resize Colorbox when resizing window or changing mobile device orientation
	// This was deliberately removed when we went responsive as it was causing 'jumping' on mobile devices
	//jQuery(window).resize(resizeColorBox);
	//window.addEventListener("orientationchange", resizeColorBox, false);
});

function get_hostname_from_url(url) {
	url = get_url_from_handlelink(url);
	url_parse = url.match(/:\/\/(.[^/]+)/);
	if(url_parse){
		return url_parse[1];
	}else{
		return url;
	}
}

function get_url_from_handlelink(url) {
	// the CMS handles new windows with a "handlelink()" function
	if ( url.indexOf("javascript:HandleLink") != -1)  {	
		// pull url from cms window link
		x = url.indexOf("CPNEWWIN:");
		y = url.indexOf("'",x);
		url = url.substr(x,(y-x));
		url_arr = url.split(",");
		url = url_arr[url_arr.length-1];
		url_arr = url.split("@");
		url = url_arr[url_arr.length-1];	
	}
	return url;	
}

function strip_old_intercepts(url) {
	var newUrl = url.replace("http://www.nps.gov/cgi-bin/intercept?","");
	newUrl = newUrl.replace("http://www.nps.gov/cgi-bin/intercept2?","");
	newUrl = newUrl.replace("http://www.nps.gov/cgi-bin/intercept3?","");
	newUrl = newUrl.replace("http://www.nps.gov/cgi-bin/intercept4?","");
	newUrl = newUrl.replace("http://home.nps.gov/applications/redirect/?sUrl=","");
	newUrl = newUrl.replace("http://www.nps.gov/applications/redirect/?sUrl=","");
	newUrl = newUrl.replace("/cgi-bin/intercept?","");
	newUrl = newUrl.replace("/cgi-bin/intercept2?","");
	newUrl = newUrl.replace("/cgi-bin/intercept3?","");
	newUrl = newUrl.replace("/cgi-bin/intercept4?","");
	newUrl = newUrl.replace("/applications/redirect/?sUrl=","");
	newUrl = newUrl.replace("/applications/redirect/?sUrl=","");
	return newUrl;
}