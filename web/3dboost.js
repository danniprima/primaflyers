//Load Assets

function load_promotion_asset(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


/* ========= INFORMATION ============================
 
 - document:  Slick Modals - HTML5 and CSS3 powered modal popups
 - author:    Capelle @ Codecanyon
 - profile:   http://codecanyon.net/user/Capelle
 - version:   3.0
 
 ==================================================== */

!function (o) {
    o.fn.slickModals = function (i) {
        var n = o.extend({ popupType: null, delayTime: null, exitTopDistance: null, scrollTopDistance: null, setCookie: !1, cookieDays: null, cookieTriggerClass: "setSlickCookie", cookieName: "slickCookie", overlayBg: !1, overlayBgColor: null, overlayTransition: null, overlayTransitionSpeed: null, bgEffect: null, blurBgRadius: null, scaleBgValue: null, windowWidth: null, windowHeight: null, windowLocation: null, windowTransition: null, windowTransitionSpeed: null, windowTransitionEffect: null, windowShadowOffsetX: null, windowShadowOffsetY: null, windowShadowBlurRadius: null, windowShadowSpreadRadius: null, windowShadowColor: null, windowBackground: null, windowRadius: null, windowMargin: null, windowPadding: null, closeButton: null, reopenClass: null }, i); return this.each(function () {
        	function i() { o(r).addClass("isActive"); if (jQuery('#qv_buttons').length > 0) { jQuery('#qv_buttons').hide() } } function e() { o(r).removeClass("isActive"); if (jQuery('#qv_buttons').length > 0) { jQuery('#qv_buttons').show() } } function a() {
                function i() {
                    o(c).not(".slickModal, link, script").addClass("blurred");
                    o(c).not(".slickModal, link, script").css({ "-webkit-filter": "blur(" + n.blurBgRadius + ")", "-moz-filter": "blur(" + n.blurBgRadius + ")", "-ms-filter": "blur(" + n.blurBgRadius + ")", filter: "blur(" + n.blurBgRadius + ")" })
                } function e() {
                    o(c).not(".slickModal, link, script").addClass("scaled").css({ "-webkit-transform": "scale(" + n.scaleBgValue + ")", "-moz-transform": "scale(" + n.scaleBgValue + ")", "-ms-transform": "scale(" + n.scaleBgValue + ")", transform: "scale(" + n.scaleBgValue + ")" })
                } "blur" === n.bgEffect && i(), "scale" === n.bgEffect && e(), "both" === n.bgEffect && (i(), e()), o(c).not(".slickModal, link, script").css({ "-webkit-transition-duration": n.overlayTransitionSpeed + "s", "-moz-transition-duration": n.overlayTransitionSpeed + "s", "-ms-transition-duration": n.overlayTransitionSpeed + "s", "transition-duration": n.overlayTransitionSpeed + "s" })
            } function l() {
                o(c).removeClass("blurred scaled").css({ "-webkit-transform": "", "-moz-transform": "", "-ms-transform": "", transform: "", "-webkit-filter": "", "-moz-filter": "", "-ms-filter": "", filter: "" })
            } function s() {
                o(r).prepend("<div class='overlay closeModal'></div>"), o(r).children(".overlay").addClass(n.overlayTransition).css({ background: n.overlayBgColor, "-webkit-transition-duration": n.overlayTransitionSpeed + "s", "-moz-transition-duration": n.overlayTransitionSpeed + "s", "-ms-transition-duration": n.overlayTransitionSpeed + "s", "transition-duration": n.overlayTransitionSpeed + "s" })
            } function t() { o(r).children(".window").addClass(n.windowLocation + " " + n.windowTransitionEffect + " " + n.windowTransition).css({ width: n.windowWidth, height: n.windowHeight, "box-shadow": n.windowShadowOffsetX + " " + n.windowShadowOffsetY + " " + n.windowShadowBlurRadius + " " + n.windowShadowSpreadRadius + " " + n.windowShadowColor, background: n.windowBackground, "border-radius": n.windowRadius, margin: n.windowMargin, padding: n.windowPadding, "-webkit-transition-duration": n.windowTransitionSpeed + "s", "-moz-transition-duration": n.windowTransitionSpeed + "s", "-ms-transition-duration": n.windowTransitionSpeed + "s", "transition-duration": n.windowTransitionSpeed + "s" }), "center" === n.windowLocation && o(r).children(".window").css({ margin: "auto" }) } function d() { days = n.cookieDays, CookieDate = new Date, days > 0 && (CookieDate.setTime(CookieDate.getTime() + 24 * days * 60 * 60 * 1e3), document.cookie = n.cookieName + "=true; expires=" + CookieDate.toGMTString()), 0 === days && (document.cookie = n.cookieName + "=true;") } var r = this; "delayed" === n.popupType && document.cookie.indexOf(n.cookieName) < 0 && (setTimeout(i, n.delayTime + 200), setTimeout(a, n.delayTime)), "exit" === n.popupType && o(document).mousemove(function (o) { document.cookie.indexOf(n.cookieName) < 0 && o.clientY <= n.exitTopDistance && (i(), a()) }), "scrolled" === n.popupType && o(document).scroll(function () { var e = o(this).scrollTop(); document.cookie.indexOf(n.cookieName) < 0 && e > n.scrollTopDistance && (i(), a()) }), document.cookie.indexOf(n.cookieName) >= 0 && (e(), l()); var c = "body > *"; if (n.overlayBg === !0 && s(), o(r).children(".window").prepend("<div class='close closeModal'></div>"), o(r).find(".window").children(".closeModal").addClass(n.closeButton + " " + n.cookieTriggerClass), t(), n.setCookie === !0) { { document.cookie.split(";").map(function (o) { return o.trim().split("=") }).filter(function (o) { return o[0] === n.cookieName }).pop() } o("." + n.cookieTriggerClass).on("click", function () { d() }) } o(".closeModal").on("click", function () { e(), l() }), o("." + n.reopenClass).on("click", function () { i(), a() })
        })
    }
}(jQuery);



/*!
 * jQuery Peelback
 * Copyright 2011, Rob Flaherty
 *
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function ($) {
    $.Peelback = function (el, settings) {

        //Caching
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("Peelback", base);

        //Main stuff    
        base.init = function () {

            //Vars
            var peelHTML, peelImage, peelMask, smallSize, bigSize, smallMaskSize, bigMaskSize;

            //Defaults, meet Settings
            base.settings = $.extend({}, $.Peelback.defaultSettings, settings);

            //If ad image is missing, stop the show            
            if (typeof (base.settings.adImage) !== 'string' || base.settings.adImage === '') {
                if (base.settings.debug === true) {
                    console.log('Ad image missing');
                }
                return;
            }

            //If peel image is missing, stop the show            
            if (typeof (base.settings.peelImage) !== 'string' || base.settings.peelImage === '') {
                if (base.settings.debug === true) {
                    console.log('Peel effect image missing');
                }
                return;
            }

            //If click URL is missing, stop the show            
            if (typeof (base.settings.clickURL) !== 'string' || base.settings.clickURL === '') {
                if (base.settings.debug === true) {
                    console.log('Click URL missing');
                }
                return;
            }

            //Convenience vars and set mask size
            smallSize = base.settings.smallSize + 'px';
            bigSize = base.settings.bigSize + 'px';
            smallMaskSize = (base.settings.smallSize - 3) + 'px';
            bigMaskSize = Math.floor((base.settings.bigSize * 0.96)) + 'px';

            //Assemble
            peelHTML = $('<div id="peelback"><a href="' + base.settings.clickURL + '" target="_blank"><img src="' + base.settings.peelImage + '" alt="" border="0" /></a><div></div></div>');
            peelImage = peelHTML.find('img');
            peelMask = peelHTML.find('div');

            $(peelImage).css({
                'width': '0',
                'height': '0',
                'z-index': '99999',
                'position': 'absolute',
                'right': '0',
                'top': '0',
                '-ms-interpolation-mode': 'bicubic'
            });

            $(peelMask).css({
                'width': '0',
                'height': '0',
                'z-index': '99998',
                'overflow': 'hidden',
                'position': 'absolute',
                'right': '0',
                'top': '0',
                'background': 'url(' + base.settings.adImage + ') no-repeat right top'
            });

            //Insert
            base.$el.prepend(peelHTML);

            //Auto animate option      
            if (base.settings.autoAnimate === false) {
                $(peelImage).css({ 'width': smallSize, 'height': smallSize });
                $(peelMask).css({ 'width': smallMaskSize, 'height': smallMaskSize });
            } else {
                $(peelImage).delay(500).animate({
                    width: smallSize,
                    height: smallSize
                }, 500);

                $(peelMask).delay(500).animate({
                    width: smallMaskSize,
                    height: smallMaskSize
                }, 500);
            }

            //Hover behavior
            peelHTML.hover(

			  //Mouseover
			  function () {
			      $(peelImage).stop().animate({
			          width: bigSize,
			          height: bigSize
			      }, 500);

			      $(peelMask).stop().animate({
			          width: bigMaskSize,
			          height: bigMaskSize
			      }, 500);

			      //If GA tracking enabled
			      if (base.settings.gaTrack === true) {
			          if (typeof (_gaq) != 'undefined') {
			              _gaq.push(['_trackEvent', 'Ad_Interaction', 'Peelback', base.settings.gaLabel]);
			          } else {
			              if (base.settings.debug === true) {
			                  console.log('Google Analytics _gaq object undefined');
			              }
			          }
			      }
			  },

			  //Mouseout
			  function () {
			      $(peelImage).stop().animate({
			          width: smallSize,
			          height: smallSize
			      }, 400);

			      $(peelMask).stop().animate({
			          width: smallMaskSize,
			          height: smallMaskSize
			      }, 400);
			  }

			);

        };

        // Run initializer
        base.init();
    };

    $.Peelback.defaultSettings = {
        adImage: null,
        peelImage: null,
        clickURL: null,
        smallSize: 58,
        bigSize: 500,
        gaTrack: false,
        gaLabel: 'default',
        autoAnimate: true,
        debug: false
    };

    $.fn.peelback = function (settings) {
        return this.each(function () {
            (new $.Peelback(this, settings));
        });
    };

})(jQuery);


jQuery.fn.extend({

    meerkat: function (options) {

        var defaults = {
            background: 'none',
            opacity: null,
            height: 'auto',
            width: '100%',
            position: 'bottom',
            close: '.close',
            dontShowAgain: '#dont-show',
            dontShowAgainAuto: false,
            animationIn: 'none',
            animationOut: null,
            easingIn: 'swing',
            easingOut: 'swing',
            animationSpeed: 'normal',
            cookieExpires: 0,
            removeCookie: '.removeCookie',
            delay: 0,
            onMeerkatShow: function () { },
            timer: null
        };

        var settings = jQuery.extend(defaults, options);


        if (jQuery.easing.def) {
            settings.easingIn = settings.easingIn;
            settings.easingOut = settings.easingOut;
        } else {
            settings.easingIn = 'swing';
            settings.easingOut = 'swing';
        }

        if (settings.animationOut === null) {
            settings.animationOut = settings.animationIn;
        }

        settings.delay = settings.delay * 1000;
        if (settings.timer != null) {
            settings.timer = settings.timer * 1000;
        }

        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else {
                var expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name, "", -1);
        }
        jQuery(settings.removeCookie).click(function () { eraseCookie('meerkat') });

        return this.each(function () {
            var element = jQuery(this);
            if (readCookie('meerkat') != "dontshow") {
                settings.onMeerkatShow.call(this);

                function animateMeerkat(showOrHide, fadeOrSlide) {
                    var meerkatWrap = jQuery('#meerkat-wrap');
                    if (fadeOrSlide === "slide") {
                        if (settings.position === "left" || settings.position === "right") {
                            var animationType = 'width';
                        } else {
                            var animationType = 'height';
                        }
                    } else {
                        var animationType = "opacity";
                    }
                    var animationProperty = {};
                    animationProperty[animationType] = showOrHide;

                    if (showOrHide === "show") {
                        if (fadeOrSlide !== "none") {
                            if (settings.delay > 0) {
                                jQuery(meerkatWrap).hide().delay(settings.delay).animate(animationProperty, settings.animationSpeed, settings.easingIn);
                            } else {
                                jQuery(meerkatWrap).hide().animate(animationProperty, settings.animationSpeed, settings.easingIn);
                            }
                        } else if ((fadeOrSlide === "none") && (settings.delay > 0)) {
                            jQuery(meerkatWrap).hide().delay(settings.delay).show(0);
                        } else {
                            jQuery(meerkatWrap).show();
                        }
                        jQuery(element).show(0);
                    }

                    if (showOrHide === "hide") {
                        if (fadeOrSlide !== "none") {
                            if (settings.timer !== null) {
                                jQuery(meerkatWrap).delay(settings.timer).animate(animationProperty, settings.animationSpeed, settings.easingOut,
								  function () {
								      jQuery(this).destroyMeerkat();
								      if (settings.dontShowAgainAuto === true) { createCookie('meerkat', 'dontshow', settings.cookieExpires); }
								  });
                            }
                            jQuery(settings.close).click(function () {
                                jQuery(meerkatWrap).stop().animate(animationProperty, settings.animationSpeed, settings.easingOut, function () { jQuery(this).destroyMeerkat(); });
                                return false;
                            });
                            jQuery(settings.dontShowAgain).click(function () {
                                jQuery(meerkatWrap).stop().animate(animationProperty, settings.animationSpeed, settings.easingOut, function () { jQuery(this).destroyMeerkat(); });
                                createCookie('meerkat', 'dontshow', settings.cookieExpires);
                                return false;
                            });
                        } else if ((fadeOrSlide === "none") && (settings.timer !== null)) {
                            jQuery(meerkatWrap).delay(settings.timer).hide(0).queue(function () {
                                jQuery(this).destroyMeerkat();
                            });
                        } else {
                            jQuery(settings.close).click(function () {
                                jQuery(meerkatWrap).hide().queue(function () {
                                    jQuery(this).destroyMeerkat();
                                });
                                return false;
                            });
                            jQuery(settings.dontShowAgain).click(function () {
                                jQuery(meerkatWrap).hide().queue(function () {
                                    jQuery(this).destroyMeerkat();
                                });
                                createCookie('meerkat', 'dontshow', settings.cookieExpires);
                                return false;
                            });
                        }
                    }
                }


                jQuery('html, body').css({ 'margin': '0', 'height': '100%' });
                jQuery(element).wrap('<div id="meerkat-wrap"><div id="meerkat-container"></div></div>');
                jQuery('#meerkat-wrap').css({ 'position': 'fixed', 'z-index': '10000', 'width': settings.width, 'height': settings.height }).css(settings.position, "0");
                jQuery('#meerkat-container').css({ 'background': settings.background, 'height': settings.height });

                if (settings.position === "left" || settings.position === "right") { jQuery('#meerkat-wrap').css("top", 0); }

                if (settings.opacity != null) {
                    jQuery("#meerkat-wrap").prepend('<div class="opacity-layer"></div>');
                    jQuery('#meerkat-container').css({ 'background': 'transparent', 'z-index': '2', 'position': 'relative' });
                    jQuery(".opacity-layer").css({
                        'position': 'absolute',
                        'top': '0',
                        'height': '100%',
                        'width': '100%',
                        'background': settings.background,
                        "opacity": settings.opacity
                    });

                }
                if (jQuery.browser.msie && jQuery.browser.version <= 6) {
                    jQuery('#meerkat-wrap').css({ 'position': 'absolute', 'bottom': '-1px', 'z-index': '0' });
                    if (jQuery('#ie6-content-container').length == 0) {
                        jQuery('body').children()
                            .filter(function (index) {
                                return jQuery(this).attr('id') != 'meerkat-wrap';
                            })
                        .wrapAll('<div id="ie6-content-container"></div>');
                        jQuery('html, body').css({ 'height': '100%', 'width': '100%', 'overflow': 'hidden' });
                        jQuery('#ie6-content-container').css({ 'overflow': 'auto', 'width': '100%', 'height': '100%', 'position': 'absolute' });
                        var bgProperties = document.body.currentStyle.backgroundColor + " ";
                        bgProperties += document.body.currentStyle.backgroundImage + " ";
                        bgProperties += document.body.currentStyle.backgroundRepeat + " ";
                        bgProperties += document.body.currentStyle.backgroundAttachment + " ";
                        bgProperties += document.body.currentStyle.backgroundPositionX + " ";
                        bgProperties += document.body.currentStyle.backgroundPositionY;
                        jQuery("body").css({ 'background': 'none' });
                        jQuery("#ie6-content-container").css({ 'background': bgProperties });
                    }
                    var ie6ContentContainer = document.getElementById('ie6-content-container');
                    if ((ie6ContentContainer.clientHeight < ie6ContentContainer.scrollHeight) && (settings.position != 'left')) {
                        jQuery('#meerkat-wrap').css({ 'right': '17px' });
                    }
                }

                switch (settings.animationIn) {
                    case "slide":
                        animateMeerkat("show", "slide");
                        break;
                    case "fade":
                        animateMeerkat("show", "fade");
                        break;
                    case "none":
                        animateMeerkat("show", "none");
                        break;
                    default:
                        alert('The animationIn option only accepts "slide", "fade", or "none"');
                }

                switch (settings.animationOut) {
                    case "slide":
                        animateMeerkat("hide", "slide");
                        break;

                    case "fade":
                        animateMeerkat("hide", "fade");
                        break;

                    case "none":
                        if (settings.timer != null) {
                            jQuery('#meerkat-wrap').delay(settings.timer).hide(0).queue(function () {
                                jQuery(this).destroyMeerkat();
                            });
                        }
                        jQuery(settings.close).click(function () {
                            jQuery('#meerkat-wrap').hide().queue(function () {
                                jQuery(this).destroyMeerkat();
                            });
                        });
                        jQuery(settings.dontShowAgain).click(function () {
                            jQuery('#meerkat-wrap').hide().queue(function () {
                                jQuery(this).destroyMeerkat();
                            });
                            createCookie('meerkat', 'dontshow', settings.cookieExpires);
                        });
                        break;

                    default:
                        alert('The animationOut option only accepts "slide", "fade", or "none"');
                }
            } else {
                jQuery(element).hide();
            }
        });
    },
    destroyMeerkat: function () {
        jQuery('#meerkat-wrap').replaceWith(jQuery('#meerkat-container').contents().hide());
    }
});




function createCookie_upsell(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie_upsell(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

jQuery.fn.idle = function (time) {
    var i = $(this);
    i.queue(function () {
        setTimeout(function () {
            i.dequeue();
        }, time);
    });
};


function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}



var POPref = document.referrer;
var POPurl = location.href;
var sPage = POPurl.substring(POPurl.lastIndexOf('/') + 1);
var url_parts = sPage.split('?');
var sPage = url_parts[0];



var currpagecount = readCookie_upsell('pagecount')
if (currpagecount == null) { currpagecount = 0; }
currpagecount++; createCookie_upsell('pagecount', currpagecount, 7);


document.write('<sc' + 'ript src="3dboost.asp?page=' + sPage + '"><\/sc' + 'ript>');
document.write('<link rel="StyleSheet" href="3dboost.css" type="text/css" media="screen">');