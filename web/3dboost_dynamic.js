jQuery(document).ready(function () {

    var siteURL = location.protocol + "//" +location.host;

    var displayurls = "[displayurls]";
    displayurls = displayurls.split(',');
    //trim urls
    for (var i = 0; i < displayurls.length; i++) {
        displayurls[i]= displayurls[i].trim();

        if (displayurls[i].indexOf("http") < 0) {
            displayurls[i] = siteURL + displayurls[i];
        }
    }

    var displaytemplates = "[displaytemplates]";
    displaytemplates = displaytemplates.split(',');
    //trim displaytemplates
    for (var i = 0; i < displaytemplates.length; i++) {
        displaytemplates[i] = displaytemplates[i].trim();
    }

    // popup pages to show on
    // 1=All Pages,2=Specifc Templates,3=Specific URLs
    var displayPages = ["1", "2", "3"];
    displayPage = displayPages[[displaypages] - 1];


    if (displayPage == 2) {
        jQuery.each(displaytemplates, function (i, template) {
            if (jQuery("section[id^=" + template + "]").length > 0) {
                showUpsell();
                return false;
            }
        });
    }
    else if (displayPage == 3) {
        if (displayurls.indexOf(window.location.href) >= 0) {
            showUpsell();
        }
    }
    else {
        showUpsell();
    }

	
	//show upsell modal
    function showUpsell() {

        var currviewcount = readCookie_upsell('viewcount[popup_id]');
        if (currviewcount == null) { currviewcount = 0; }
        currviewcount++; createCookie_upsell('viewcount[popup_id]', currviewcount, 7);

        jQuery('[popup]').appendTo('body');

        // popup location
        var popupPositions = ["center", "leftSide", "rightSide", "topCenter", "topLeft", "topRight", "bottomCenter", "bottomLeft", "bottomRight"];
        popupPosition = popupPositions[[popupposition] - 1];

        // overlay color
        var overlayTypes = ["black", "white", "transparent", "blurred"];
        overlayType = overlayTypes[[overlaytype] - 1];

        // transition type
        var transitionEffects = ["fade", "zoomIn", "zoomOut", "slideTop", "slideBottom", "slideLeft", "slideRight", "flipHorizontal", "perspectiveTop", "perspectiveBottom", "perspectiveLeft", "perspectiveRight"];
        transitionEffect = transitionEffects[[transitioneffect] - 1];

        var ContentTypes = ["upsell_image", "upsell_text", "upsell_iframe"];
        contentType = ContentTypes[[contenttype] - 1];

        popupType = 'delayed';

        var urlChange = [urlchange];

        var setCookieFlag = false;

        if (urlChange == 1) {
            popupType = 'exit';
            setCookieFlag = true;
        }
        else {
            delete_cookie('3dboost-setCookie-[id]');
        }

	    jQuery('#[popup_id]').slickModals({
			// Functionality
	        popupType: popupType,
			delayTime: [popuptimer],
			exitTopDistance: 15,
			scrollTopDistance: 400,
	        setCookie: setCookieFlag,
			cookieDays: 1,
			cookieTriggerClass: '3dboost-setCookie-[id]',
			cookieName: '3dboost-setCookie-[id]',
	
			// Overlay options
			overlayBg: true,
			// overlayBgColor: overlayType,
			overlayTransition: 'ease',
			overlayTransitionSpeed: '0.4',
	
			// Background effects
			//bgEffect: 'scale',
			bgEffect: ([overlaytype] == 4) ? "blur" : "scale",
			blurBgRadius: "0",
			scaleBgValue: "1",
	
			// Window options
			windowWidth: "[popwidth]",
			windowHeight: "[popheight]",
			windowLocation: popupPosition,
			windowTransition: "ease",
			windowTransitionSpeed: "0.4",
			windowTransitionEffect: transitionEffect,
			windowShadowOffsetX: "0",
			windowShadowOffsetY: "0",
			windowShadowBlurRadius: "20px",
			windowShadowSpreadRadius: "0",
			windowShadowColor: "rgba(0,0,0,0.3)",
			windowBackground: "rgba(255,255,255,1)",
			windowRadius: "12px",
			windowMargin: "auto",
			windowPadding: "40px",
	
			// Close and reopen button
			closeButton: "icon",
			reopenClass: "openSlickModal-1",
			
		});
		jQuery('#[popup_id]').addClass(contentType);
		jQuery('#[popup_id] .overlay').addClass(overlayType);

		if ([contenttype] == 1){
			setImageHeight();

			/* On the window resize event. */
			jQuery(window).resize(function () {
			    var imgHeight2 = jQuery('.upsell_image .imagetype').height();
				jQuery('.upsell_image .window').css("height", imgHeight2);
			});
			
			/* On the device orientation change event. */
			jQuery(window).bind('orientationchange', function (event) {
			    var imgHeight2 = jQuery('.upsell_image .imagetype').height();
			    jQuery('.upsell_image .window').css("height", imgHeight2);
			});
		}

		if ([contenttype] == 2){
		    var txtHeight = jQuery(".text_Upsell").height();
		    jQuery('.upsell_text .window').css("height", txtHeight);
		}

        var viewcount = readCookie_upsell('viewcount_3dboost[id]')
		if (viewcount == null) { viewcount = 0; }
		viewcount++; createCookie_upsell('viewcount_3dboost[id]', viewcount, 7);
	}
	
});

function setImageHeight() {
    var $Set_img = jQuery('.upsell_image img');

	$Set_img.on('load', function(){
//		imgHeight = jQuery(this).height();
	    imgHeight = jQuery('.upsell_image .imagetype').height();
	    imgWidth = jQuery(this).width();
	    jQuery('.upsell_image .window').css("height", imgHeight);
//				console.log(imgHeight);
	    jQuery('.upsell_image .window').css("width", imgWidth);
//				console.log(imgWidth);
	    jQuery(this).css("max-width", "100%");
	    jQuery(this).css("max-height", "100%");
	});
}

