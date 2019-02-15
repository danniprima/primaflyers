jQuery(document).ready(function () {
    moveMenu();
	sticky_header();
});
jQuery(window).load(function () {
    moveMenu();
	sticky_header();
});
jQuery(window).resize(function () {
    moveMenu();
	sticky_header();
});


function update_flyoutcart() {
    jQuery.ajax({
        url: '/frontapi.asp',
        dataType: 'json',
        type: 'GET',
        cache: false,
        data: {
            module: 'cartajax',
        },
        success: function (data) {
            if (data.ItemsInCart != undefined) {
                if (data.ItemsInCart.length > 0) {
                    jQuery('#floating-cart').fadeIn(300);
                }
            }
        },
        error: function (objError) {
            //alert('Error');
            return;
        }
    });
}

function addcart_callback(productDiv, data) {
    jQuery(productDiv).addClass('ajaxcart-complete');
    setTimeout(function () { jQuery(productDiv).removeClass('ajaxcart-complete'); }, 1000);

    var itemsInCart = 0;
    var subtotal = 0;

    jQuery(data.ItemsInCart).each(function (index, item) {
        itemsInCart += item.qty;
        subtotal += (item.price * item.qty);
    });
    //minicart - subtotal
    jQuery('.minicart-items').text(itemsInCart);
    update_flyoutcart();

    var currency = jQuery('body').data('currency');
    jQuery('.minicart-subtotal').text(currency + subtotal);
   
}

function mailinglist_callfront(form) {
    jQuery(form).find('.mailinglist-input').prop('disabled', true);
    jQuery(form).find('.mailinglist-submit').prop('disabled', true);
    jQuery(form).find('#mailing-btn-txt').addClass('hidden');
    jQuery(form).find('#mailing-btn-load').removeClass('hidden');

    jQuery('#mailinglist-response').slideUp(300);
    jQuery('#mailinglist-response div').addClass('hidden');
}

function mailinglist_response(form, response) {

    jQuery(form).find('.mailinglist-input').prop("disabled", false);
    jQuery(form).find('.mailinglist-submit').prop("disabled", false);


    if (response == 1 || response == 3) {
        jQuery('#mailinglist-response .mailinglist-subscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }
    else if (response == -1) {
        jQuery('#mailinglist-response .mailinglist-unsubscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }
    else if (response == 2) {
        jQuery('#mailinglist-response .mailinglist-error').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
    }

    jQuery(form).find('#mailing-btn-txt').removeClass('hidden');
    jQuery(form).find('#mailing-btn-load').addClass('hidden');

}

function moveMenu() {
    var respWidth = window.innerWidth;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari/") !== -1 && ua.indexOf("chrom") === -1) {
        respWidth = jQuery(window).width();
    }

    if (respWidth < 992) {
        jQuery('#categories').appendTo('#mobile-categories');
        jQuery('#menulinks').appendTo('#mobile-menulinks');
    }
    else {
        jQuery('#categories').appendTo('#categories-outer');
        jQuery('#menulinks').appendTo('#menulinks-outer');
    }
/*
    if (respWidth < 768) {
    }
    else {
    }
*/
}

jQuery(document).ready(function () {

    update_flyoutcart();

    jQuery('#mobile-menu-trigger, #mobile-menu-trigger2').click(function (e) {
        e.preventDefault();

        jQuery('#mobile-menu').show(0, function () {
            jQuery('body').addClass('menu-open');
        });
    });

    jQuery('.mobile-menu-close').click(function (e) {
        e.preventDefault();

        jQuery('body').removeClass('menu-open');
        setTimeout(function () {
            jQuery('#mobile-menu').hide(0);
        }, 250);
    });


    var respWidth = window.innerWidth;

	if (respWidth >= 767) {
    	jQuery('.navbar .dropdown').hover(function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(150).slideDown('fast');

    	}, function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(50).slideUp('fast');

    	});

    	jQuery('.navbar .dropdown > a').click(function () {
//    		location.href = this.href;
    	});
    }
	
});

jQuery(function ($) {
	$('.navbar .dropdown').hover(function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(150).slideDown();

	}, function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(50).slideUp();

	});

	$('.navbar .dropdown > a').click(function () {
//		location.href = this.href;
	});

});

jQuery(function () {

	var $window = jQuery(window),
		win_height_padded = $window.height() * 1.1;

	$window.on('scroll', revealOnScroll);

	function revealOnScroll() {
		var scrolled = $window.scrollTop(),
			win_height_padded = $window.height() * 1.1;

		// Showed...
		$(".revealOnScroll:not(.animated)").each(function () {
			var $this = $(this),
				offsetTop = $this.offset().top;

			if (scrolled + win_height_padded > offsetTop) {
				if ($this.data('timeout')) {
					window.setTimeout(function () {
						$this.addClass('animated ' + $this.data('animation'));
						$this.removeClass('revealOnScroll');
					}, parseInt($this.data('timeout'), 10));
				} else {
					$this.addClass('animated ' + $this.data('animation'));
					$this.removeClass('revealOnScroll');
				}
			}
		});
		// Hidden...
		$(".revealOnScroll.animated").each(function (index) {
			var $this = $(this),
				offsetTop = $this.offset().top;
			if (scrolled + win_height_padded < offsetTop) {
				$(this).removeClass('revealOnScroll animated');
			}
		});
	}

	revealOnScroll();
});


$(document).ready(function () {

	//Check to see if the window is top if not then display button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top
	$('.scrollToTop').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 800);
		return false;
	});

});

function sticky_header() {

	var shrinkHeader = 300;
	var header_height = $('.sticky-header').innerHeight();

//	if (window.innerWidth > 767) {
		$('body').css('padding-top' , header_height);
//	}

	$(window).scroll(function() {

		var scroll = getCurrentScroll();
		header_height = $('.sticky-header').innerHeight();

		
		if ( scroll >= shrinkHeader ) {
			$('.sticky-header').addClass('shrink');
			$('body').css('padding-top' , header_height);
		}
		else {
			$('.sticky-header').removeClass('shrink');
			$('body').css('padding-top' , header_height);
		}
	});

/*
	var lastScrollTop = 0;
	$(window).scroll(function(){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
		   // downscroll code
		   $('.sticky-header').removeClass('show-top-nav');
		   if(!$('.sticky-header').hasClass('hide-top-nav')){
			   $('.sticky-header').addClass('hide-top-nav');
		   }
	   } else {
		  // upscroll code
		   $('.sticky-header').removeClass('hide-top-nav');
		   if(!$('.sticky-header').hasClass('show-top-nav')){
			   $('.sticky-header').addClass('show-top-nav');
		   }
	   }
	   lastScrollTop = st;
	});
*/	
	
}

function getCurrentScroll() {
	return window.pageYOffset || document.documentElement.scrollTop;
}
jQuery(function () {
	//Quantity box listing page
	jQuery('.QTY-input .QTY-up').click(function () {
		var qtyInput = jQuery(this).data('target');
		var incrementedVal = parseInt(jQuery(qtyInput).val()) + 1;
		jQuery(qtyInput).val(incrementedVal);
	});
	jQuery('.QTY-input .QTY-down').click(function () {
		var qtyInput = jQuery(this).data('target');
		var incrementedVal = parseInt(jQuery(qtyInput).val()) - 1;

		if (incrementedVal <= 1) incrementedVal = 1;
		jQuery(qtyInput).val(incrementedVal);
	});
	
    // Animations ScrollReveal
    jQuery('body:not(".view-cart") .product-item').each(function () {
//        jQuery('.product-item').addClass('lazy-products');
    });

	
	if(typeof ScrollReveal === "function") {
		// Changing the defaults
		window.sr = ScrollReveal({ reset: true });
	
		// Customizing a reveal set
		sr.reveal('.lazy', { 
			duration: 1000,
			origin: 'bottom'
		});
	
		sr.reveal('.lazy-products', { 
			duration: 2000
		});
	}

});

//ddmenu build and animations with hoverintent
jQuery(function () {

	// see whether device supports touch events (a bit simplistic, but...)
	var hasTouch = ("ontouchstart" in window);
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	 
	// hook touch events for drop-down menus
	// NB: if has touch events, then has standards event handling too
	if (hasTouch && document.querySelectorAll) {
		var i, len, element,
			dropdowns = document.querySelectorAll('.subnav > ul > li > a, #categories-outer #categories > li > a');
	 
		function menuTouch(event) {
			// toggle flag for preventing click for this link
			var i, len, noclick = !(this.dataNoclick);
	 
			// reset flag on all links
			for (i = 0, len = dropdowns.length; i < len; ++i) {
				dropdowns[i].dataNoclick = false;
			}
	 
			// set new flag value and focus on dropdown menu
			this.dataNoclick = noclick;
			this.focus();
		}
	
		function menuClick(event) {
			// if click isn't wanted, prevent it
			if (this.dataNoclick) {
				event.preventDefault();
			}
		}
	 
		for (i = 0, len = dropdowns.length; i < len; ++i) {
			element = dropdowns[i];
			element.dataNoclick = false;
			element.addEventListener("touchstart", menuTouch, false);
			element.addEventListener("click", menuClick, false);
		}
	}

	hiConfig = {
		sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
		interval: 155, // number = milliseconds for onMouseOver polling interval
		timeout: 50, // number = milliseconds delay before onMouseOut
		over: function() {
			$('.dropdown-menu').hide();
			$(this).find('.dropdown-menu').show();;
/*			$(this).find('.dropdown-menu').animate({
				width: '100%'}, 75, "swing", function() {
					$(this).show();
				}
			);
*/			
		}, 
		out: function() { 
			$(this).find('.dropdown-menu').removeClass('bounceInDown');
			$(this).find('.dropdown-menu').hide();
		},
	};	

	jQuery('#categories-outer #categories > li.dropdown').each(function() {
		$(this).hoverIntent(hiConfig);
	});

	function registerForm() {
		var request = $.ajax({
			url: "https://store.primaatlanta.com/files/register.php",
			method: "POST",
			data: $form.serialize(),
			dataType: "html",
			beforeSend : function(xhr) {
				//xhr.setRequestHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control');
			}
		});
		 
		request.done(function( msg ) {
			if (msg == 'already exists') {
				alert("User with same email already exists");
			} else if (msg == 'done') {
		    	window.location = 'https://www.primaflyers.com/homecomingconf';
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		    console.log( "Request failed: " + textStatus );
		});
	}

	if (window.location.href.match('homecoming')) {
		var $form = $("#contest-form");
		var $button = $("<button>");
		$button.addClass('btn btn-default btn-lg');
		$button.text("Submit");
		$form.find('div.button').replaceWith($button);
		$button.on('click', function() {
			//registerForm();	
		});
		$form.submit(function(e) {
			e.preventDefault();
			registerForm();
		})
	}
});