// JavaScript Document

// ***********************************************************************
// Document Ready Functions
// ***********************************************************************

$(document).ready(function() {
  
  // Cufon Font Replacement - Main Items
  Cufon.replace(".cufon", { fontFamily: 'helveticaneue' });
  Cufon.replace(".title", { fontFamily: 'helveticaneue' });
  Cufon.replace(".specials h1.title", { fontFamily: 'helveticaneue' });
  Cufon.replace(".specials h2.subtitle", { fontFamily: 'helveticaneue' });

  // Scroll Header Infinitely
  var init = setInterval("scrollBg()", scrollSpeed);  

  // Firefox Bug Fix for Top Navigation Background
  $("#top_navigation").css({backgroundImage:"url('assets/templates/xmas/images/bg_nav_top_sub.png')"});
  
  // Image Preloading
  preload("assets/templates/default/images/bg_flyers_1.png");
  preload("assets/templates/default/images/bg_flyers_2.png");
  preload("assets/templates/default/images/bg_flyers_3.png");
  preload("assets/templates/default/images/bg_flyers_4.png");
  
  // Homepage Tooltips
  $(".chat").tooltip({ position: "center right", tipClass: "tooltip-right", effect: "fade", opacity: 1.0, predelay: 300 });
  
  // Homepage Button Slides Functions
  $("#button_1").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -200px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_1.png')"});
	  $("#slide_flyers").css({backgroundPosition:"57px 120px"});
	
	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"57px -300px"});
	  
	}
  );

  $("#button_2").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -400px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_2.png')"});
	  $("#slide_flyers").css({backgroundPosition:"227px 120px"});

	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"277px -300px"});
	  
	}
  );
  
  $("#button_3").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -600px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_3.png')"});
	  $("#slide_flyers").css({backgroundPosition:"425px 120px"});

	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"425px -300px"});
	  
	}
  );
  
  $("#button_4").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -800px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_4.png')"});
	  $("#slide_flyers").css({backgroundPosition:"637px 120px"});
	  
	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"637px -300px"});
	  
	}
  );



  // Homepage Button Slides TRIGGERS Functions
  $("#button_1_trigger").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -200px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_1.png')"});
	  $("#slide_flyers").css({backgroundPosition:"57px 120px"});
	
	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"57px -300px"});
	  
	}
  );

  $("#button_2_trigger").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -400px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_2.png')"});
	  $("#slide_flyers").css({backgroundPosition:"227px 120px"});

	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"277px -300px"});
	  
	}
  );
  
  $("#button_3_trigger").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -600px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_3.png')"});
	  $("#slide_flyers").css({backgroundPosition:"425px 120px"});

	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"425px -300px"});
	  
	}
  );
  
  $("#button_4_trigger").hover(
    function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px -800px"});
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/xmas/images/bg_flyers_4.png')"});
	  $("#slide_flyers").css({backgroundPosition:"637px 120px"});
	  
	},
	function() {
	  /* Temporary Fix While Debugging */
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").css({backgroundImage:"url('')"});
	  $("#slide_flyers").css({backgroundPosition:"637px -300px"});
	  
	}
  );



});

// ***********************************************************************
// Homepage Header Scroll Functions
// ***********************************************************************

var scrollSpeed = 70;   // Speed in milliseconds
var step = 1; 		    // How many pixels to move per step
var current = -1256;		// The current pixel row
var imageHeight = 420;  // Background image height
var headerHeight = 1676;  // How tall the header is.
var restartPosition = 0;

function scrollBg() {
  //Go to next pixel row.
  current += step;
  //If at the end of the image, then go to the top.
  if (current == restartPosition){ current = -1256; }
  //Set the CSS of the header.
  $('#header_wrap').css({backgroundPosition:"0px "+current+"px"});
}

// ***********************************************************************
// Image Preloading Functions
// ***********************************************************************

function preload(img) {
  $('<img/>')[0].src = img;
}