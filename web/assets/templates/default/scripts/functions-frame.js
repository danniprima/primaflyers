// JavaScript Document

// ***********************************************************************
// Document Ready Functions
// ***********************************************************************

jQuery(document).ready(function($){
  $("#left_navigation_list li ul").each(function() {
    var elem = $(this);
    if (elem.children().length == 0) {
      elem.remove();
    }
  });

  $("#left_navigation_list").dropmenu({
	openAnimation: "size",
	closeAnimation: "size",
	openSpeed: 300,
	closeSpeed: 200,
	closeDelay: 400,
	zindex: 100,
	openMenuClass: 'open',
	autoAddArrowElements: true
  });
});


$(document).ready(function() {

  // Cufon Font Replacement - Main Items
  Cufon.replace(".cufon", { fontFamily: 'helveticaneue' });
  Cufon.replace(".title", { fontFamily: 'helveticaneue' });
  Cufon.replace(".specials h1.title", { fontFamily: 'helveticaneue' });
  Cufon.replace(".specials h2.subtitle", { fontFamily: 'helveticaneue' });

  // Scroll Header Infinitely
  var init = setInterval("scrollBg()", scrollSpeed);  
  
  // Homepage Tooltips
  // $(".chat").tooltip({ position: "center right", tipClass: "tooltip-right", effect: "fade", opacity: 1.0, predelay: 300 });
  
  // Homepage Button Slides Functions
  $("#button_1").hover(
    function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px -125px"});
	},
	function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px 0px"});
	}
  );

  $("#button_2").hover(
    function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px -250px"});
	},
	function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px 0px"});
	}
  );
  
  $("#button_3").hover(
    function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px -375px"});
	},
	function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px 0px"});
	}
  );
  
  $("#button_4").hover(
    function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px -500px"});
	},
	function() {
	  $("#slide_buttons_small").css({backgroundPosition:"0px 0px"});
	}
  );

});

// ***********************************************************************
// Homepage Header Scroll Functions
// ***********************************************************************

var scrollSpeed = 70;   // Speed in milliseconds
var step = 1; 		    // How many pixels to move per step
var current = 0;		// The current pixel row
var imageWidth = 3225;  // Background image height
var headerWidth = 950;  // How tall the header is.
var restartPosition = -(imageWidth - headerWidth);
	  
function scrollBg() {
  //Go to next pixel row.
  current -= step;
  //If at the end of the image, then go to the top.
  if (current == restartPosition){ current = 0; }
  //Set the CSS of the header.
  $('#header').css({backgroundPosition:current+"px 0px"});
}

// ***********************************************************************
// Image Preloading Functions
// ***********************************************************************

function preload(img) {
  $('<img/>')[0].src = img;
}