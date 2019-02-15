// JavaScript Document

// ***********************************************************************
// Document Ready Functions
// ***********************************************************************

$(document).ready(function() {

  // Scroll Header Infinitely
  var init = setInterval("scrollBg()", scrollSpeed);

  // Cufon Font Replacement
  Cufon.replace(".cufon");
  Cufon.replace(".title");
  Cufon.replace(".specials h1.title");
  Cufon.replace(".specials h2.subtitle");

  // Image Preloading
  preload("assets/templates/default/images/bg_flyers_1.png");
  preload("assets/templates/default/images/bg_flyers_2.png");
  preload("assets/templates/default/images/bg_flyers_3.png");
  preload("assets/templates/default/images/bg_flyers_4.png");
  
  // Homepage Button Slides Functions
  $("#button_1").hover(
    function() {
      $("#slide_buttons").css({backgroundPosition:"0px -200px"});
	  
	  $("#slide_flyers").stop();
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/default/images/bg_flyers_1.png')"});
	  $("#slide_flyers").css({backgroundPosition:"57px -300px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"57px 100px"		 
      }, 500);
	},
	function() {
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"57px -300px"
      }, 500, function() {
		$("#slide_flyers").css({backgroundPosition:"0px 0px"});
	    $("#slide_flyers").css({backgroundImage:"url('')"});  
	  });
	}
  );

  $("#button_2").hover(
    function() {
      $("#slide_buttons").css({backgroundPosition:"0px -400px"});
	  
	  $("#slide_flyers").stop();
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/default/images/bg_flyers_2.png')"});
	  $("#slide_flyers").css({backgroundPosition:"227px -300px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"227px 100px"
      }, 500);
	},
	function() {
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"227px -300px"
      }, 500, function() {
		$("#slide_flyers").css({backgroundPosition:"0px 0px"});
	    $("#slide_flyers").css({backgroundImage:"url('')"});  
	  });
	}
  );
  
  $("#button_3").hover(
    function() {
      $("#slide_buttons").css({backgroundPosition:"0px -600px"});
	  
	  $("#slide_flyers").stop();
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/default/images/bg_flyers_3.png')"});
	  $("#slide_flyers").css({backgroundPosition:"425px -300px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"425px 100px"
      }, 500);
	},
	function() {
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"425px -300px"
      }, 500, function() {
		$("#slide_flyers").css({backgroundPosition:"0px 0px"});
	    $("#slide_flyers").css({backgroundImage:"url('')"});  
	  });
	}
  );
  
  $("#button_4").hover(
    function() {
      $("#slide_buttons").css({backgroundPosition:"0px -800px"});
	  
	  $("#slide_flyers").stop();
	  $("#slide_flyers").css({backgroundImage:"url('assets/templates/default/images/bg_flyers_4.png')"});
	  $("#slide_flyers").css({backgroundPosition:"637px -300px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"637px 100px"
      }, 500);
	},
	function() {
	  $("#slide_buttons").css({backgroundPosition:"0px 0px"});
	  $("#slide_flyers").animate({
	    backgroundPosition:"637px -300px"
      }, 500, function() {
		$("#slide_flyers").css({backgroundPosition:"0px 0px"});
	    $("#slide_flyers").css({backgroundImage:"url('')"});  
	  });
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