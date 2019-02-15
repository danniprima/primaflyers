var richUploader = {
	
	container : '#rich-uploader', 
	fileCount : 0,

	imagesQueue : [],

	init : function($) {
		this.bindDropzone($);
		this.bindColorbox($);
	},

	bindDropzone : function($) {

		Dropzone.autoDiscover = false;

		var time = 0;
 		var self = this;

	    var dropzone = new Dropzone(self.container, {
	    

		    previewTemplate: document.getElementById('preview-template').innerHTML,

		    url: "/files/index/upload",
		    parallelUploads: 2,
		    createImageThumbnails : false, 
		    maxFilesize: 3,
		    filesizeBase: 1000,
		    dictDefaultMessage : '<h4>Drag & Drop your files here to upload them to our cloud</h4><p>or click <a href="#">here</a> to upload your files</p>',

		    totaluploadprogress : function (progressPercent, bytes, bytesSent) {
		        time = progressPercent / 2;
		        console.log(time);
		        progressJs(self.container).set(time);

		        if (progressPercent == 100) {
		           progressJs(self.container).autoIncrease(4, 800);
		        }
		    },

		    sending : function () {
		    	$("#rich-uploader-msg").removeClass('error');
		        progressJs(self.container).start()
		        //.autoIncrease(4, 700);
		        $(".dz-message").show();
		    },



		    success : function(fileObject, response) {
		    	$(".dz-message").show();
		      	self.imageUploaded($, fileObject, response);

		      //progressJs(self.container).set(progressPercent / 2);
		      //progressJs(self.container).autoIncrease(4, 700);

		    },

		    queuecomplete : function () {

		    	$(".dz-message").show();
		        self.showQueue($);
		    }

	  	});
	},
	
	

	imageUploaded : function ($, fileObject, response) {

	    var data = jQuery.parseJSON(response);

	    if (data.error) {
	    	$("#rich-uploader-msg")
	    		.addClass('error')
	    		.html(data.error)
	    	return false;
	    }

	    var self = this;
	     
	    data.each(function(file) {
	    	self.imagesQueue.push(file.target_file);
	    });

	    this.createImagesQueue($);

	}, 

	createImagesQueue : function ($) {

		var $div = $("#images_que");
		$div.empty();

		
	    var self = this;

	    self.imagesQueue.each(function(file, key) {

	    	var $outdiv = $('<div class="rich-images">');
	    	var $ul = $('<ul class="sortable">');
	    	
	        $li = $("<li>");
	        $li.append('<a href="' + file + '" target="_blank"> \
	        	<img src="' + file + '"> \
	        	</a>');

	        $ul.append($li);
	        $outdiv.append($ul);
	        $div.append($outdiv);

	        var $toolbar = self.getToolbar($);
	        $toolbar.insertBefore($ul);

	        $(".rich-toolbar .del").click(function(e) {
	        	e.preventDefault();
	        	self.deletePhoto(this, e, $);
	        	return false;
	        });
	    });
	},

	getToolbar : function($) {
		var template = 
			'<ul class="rich-toolbar"> \
				<li class="number">{number}</li> \
				<li class="close"> \
					<a href="#" class="del">X</a> \
				</li> \
			</ul>'

		return $(template.replace('{number}', this.fileCount));
	},

	showQueue : function ($) {
		this.showToolbar($);
        
        var totalImages = $("#images_que ul").length;
        
        if (this.fileCount > 2) {
        	$("#images_que").hide();
        	this.createColorbox($);
        } else if (totalImages) {
        	this.colorboxPreview($, 'hide');
        	$("#images_que").show();
        }

        this.refreshQueue($);
        this.bindSorting($);
	}, 


	showToolbar : function ($) {
		var $toolbar = $('<div class="rich-main-toolbar">');
		$ul = $("<ul>");
		$li = $("<li>");
		$a = $('<a class="button">Start Over</a>');
		
		var self = this;

		$a.on('click', function() {
			self.startOver($);
		});

		$li.append($a);
		$ul.append($li);
		$toolbar.append($ul);
		$(this.container).prepend($toolbar);
	},

	

	deletePhoto : function(a, e, $) {
		if (confirm("Are you sure to delete this image?")) {
			this.fileCount --;
			$(a).closest(".rich-images").remove();	
		}

		this.refreshQueue($);
	},

	//------------------------	NUMBERING IN QUEUE -----------------------------

	refreshQueue : function($) {
		$(".rich-toolbar .number:eq(0)").html('Front')
		$(".rich-toolbar .number:eq(1)").html('Back')
	},

	//---------------------------- 	COLORBOX -----------------------------------

	createColorbox : function($) {
		$.colorbox({
    		html: $("#images_que").html(),
    		width: '90%'
    	});

    	this.colorboxPreview($, 'hide');

	},

	bindColorbox : function($) {
		var self = this;
		$(document).bind('cbox_complete', function() {
	  	  //setTimeout($.colorbox.next, 1500);
		    progressJs(this.container).end();
		    self.bindSorting($);	
	  	});

	  	$(document).bind('cbox_cleanup', function() {
	  		self.colorboxPreview($, 'show');
	  	});
	},

	colorboxPreview : function($, opt) {
		$panel = $('.cbox-preview');
		var self = this;
		if (!$panel.length) {
			$panel = $('<div class="cbox-preview"></div>');
			$panel.append('<h2>Preview</h2>');
			self.createImagesQueue($);
			$panel.append($("#images_que").find("ul").clone());
    		$("body").append($panel);
    		$panel.on('click', function() {
    			//showcolorbox again
    			this.createImagesQueue($);
    			this.createColorbox($);
    		})
    	}

    	opt == 'show' ? $panel.show() : $panel.hide();
    	
        	
	},
	//---------------------------- 	SORTABLES -----------------------------------
	bindSorting : function($) {
		var self = this;
		$(".rich-images .sortable").sortable({
			helper: "clone",
	      	connectWith: ".rich-images .sortable",
	      	placeholder: "ui-state-highlight",
	      	stop: function( event, ui ) {
	      		//change the ordering of list here
	      		//get all lis and fetch img src and then add to list gain
	      		self.imagesQueue = [];
	      		 
	      		$(ui.item).parent().closest('#images_que').find(".ui-sortable-handle img").each(function(key, $img) {
	      			self.imagesQueue.push($(this).attr('src'));
	      		});

	      		return ui;

	      	}
	    }).disableSelection();

		
	},

	//-------------------- START OVER -------------------------------
	startOver : function($) {
		this.imagesQueue = [];
		this.fileCount = 0;
		$("#images_que").empty();
		$.colorbox.close();
		this.colorboxPreview($, 'hide');
	}
}

jQuery(function($) {
	richUploader.init($);	
});