var richUploader = {
	
	container : '#rich-uploader', 
	inputFieldName : 'text50514',
	dropzone : '',
	fileSelectionInput : '[name=option-26688-3877]',
	maxFiles : 3,

	imagesQueue : [],

	init : function($, filesSelection) {
		this.bindDropzone($, filesSelection);
		this.bindColorbox($);
	},

	bindDropzone : function($, filesSelection) {
		var self = this;
		//change max files on selection of upload files dropdown
		$(this.fileSelectionInput).on('change', function() {
			self.maxFiles = $(this).find('option:selected').text().match('I only have a front') ? 1 : 3;
			self.dropzone.options.maxFiles = self.maxFiles;
		});

		var time = 0;
 		var maxFiles = filesSelection.match('I only have a front') ? 1 : 3;

	    this.dropzone = new Dropzone(self.container, {
	    

		    previewTemplate: document.getElementById('preview-template').innerHTML,

		    url: "https://store.primaatlanta.com/files/upload.php?qty=" + $("input[name=qty-0]").val() + '&itemid=' + $("#itemid").val(),
		    //url: "http://www.primaflyers.com/upload.php",
		    headers : ["Access-Control-Allow-Headers", "Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control, X-File-Name"],
		    parallelUploads: 2,
		    createImageThumbnails : false, 
		    maxFilesize: maxFiles,
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

		    confirm : function(question, accepted, rejected) {
			  // Ask the question, and call accepted() or rejected() accordingly.
			  // CAREFUL: rejected might not be defined. Do nothing in that case.
			  if (this.files.length > self.maxFiles) {
					alert("Please select only one file");
					this.removeAllFiles(true);
			   		//this.removeFile(this.files[0]);
			   		return false;
			  } else {
			  	self.accept();
			  }
			},

			accept: function(file, done) {
			    if (file.name == "justinbieber.jpg") {
			      done("Naha, you don't.");
			    }
		    	else { done(); }
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
		    },

		    addedfile : function(fileObject, response) {
		    	
		    	console.log("files added: ", self.maxFiles);

				if (this.files.length > self.maxFiles) {
					alert("Please select only one file");
					this.removeAllFiles(true);
			   		//this.removeFile(this.files[0]);
			  	}
	        },

	        maxfilesexceeded : function (fileObject, response) {

	        	//if (myDropzone.files.length > 1) {
                    alert("Please select only one file");
                    //this.removeFile(file);
                    this.removeAllFiles(true);
                    //this.addFile(file);
                //}
                return false;
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
	   	var file = "";

	   	for (var i in data.images) {
	   		file = data.images[i];
	    	self.imagesQueue.push({'generated' : file.target_file, 'original' : data.original_file});
	   	}  
	    

	    this.createImagesQueue($);

	}, 

	createImagesQueue : function ($) {

		var $div = $("#images_que");
		$div.empty();

		
	    var self = this;
	    
	    var file = "";
	    var key = "";

	    var fileString = [];

	    for (var i in self.imagesQueue) {

	    	key = i;
	    	file = self.imagesQueue[i];

	    	fileString.push(file);

	    	var $outdiv = $('<div class="rich-images">');
	    	var $ul = $('<ul class="sortable">');
	    	
	        $li = $("<li>");

	        $li.append('<a href="' + file.generated + '" target="_blank"> \
	        	<img src="' + file.generated + '" data-original="' + file.original + '"> \
	        	</a>');

	        $ul.append($li);
	        $outdiv.append($ul);
	        $div.append($outdiv);

	        var $toolbar = self.getToolbar($, key + 1);
	        $toolbar.insertBefore($ul);

	        $(".rich-toolbar .del").click(function(e) {
	        	e.preventDefault();
	        	self.deletePhoto(this, e, $);
	        	return false;
	        });
	    }

	    $("input[name=" + self.inputFieldName + "]").val('{"orderfiles" : ' + JSON.stringify(fileString) + '}');

	    return $div;
	},

	getToolbar : function($, count) {
		var self = this;
		var template = 
			'<ul class="rich-toolbar"> \
				<li class="number">{number}</li> \
				<li class="close"> \
					<a href="#" class="del">X</a> \
				</li> \
			</ul>'

		return $(template.replace('{number}', count));
	},

	showQueue : function ($) {
		this.showToolbar($);
        
        var totalImages = $("#images_que ul").length;
        
        if (this.imagesQueue.length > 2) {
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
		
		console.log($("#images_que").html());
		//we are getting innerhtml of images_que so need to append this in colorbox
		$.colorbox({
    		html: ('<div id="images_que-colorbox">' + 
    			$("#images_que").html() + '</div>'),
    		width: '90%'
    	});
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
			$("body").append($panel);
			$panel.append('<h2>Preview</h2>');
			var $overlay = $('<div class="overlay"></div>');
			$overlay.on('click', function() {
				//showcolorbox again
				self.createImagesQueue($);
				self.createColorbox($);
			});
			$panel.append($overlay);

		} else {
			$panel.find("ul").remove();
		}

		var $div = self.createImagesQueue($);
		$panel.append($div.find("ul.sortable").clone());
		
    	opt == 'show' ? $panel.show() : $panel.hide();
        	
	},
	//---------------------------- 	SORTABLES -----------------------------------
	bindSorting : function($) {
		var self = this;
		var fileinfo;

		$(".rich-images .sortable").sortable({
			//helper: "clone",

			helper: function(event, ui){
				var $clone =  $(ui).clone();
				$clone .css('position','absolute');
				return $clone.get(0);
			},

	      	connectWith: ".rich-images .sortable",
	      	placeholder: "ui-state-highlight",
	      	
	      	stop: function( event, ui ) {
	      		//change the ordering of list here
	      		//get all lis and fetch img src and then add to list gain
	      		self.imagesQueue = [];
	      		var fileString = [];

	      		
	      		
	      		$parent = $(ui.item).parent();
	      		$copy = $parent.closest('#images_que-colorbox').length 
	      				? $parent.closest('#images_que-colorbox') 
	      				: $(ui.item).parent().closest('#images_que');

	      		$copy.find(".sortable img").each(function() {
	      			//console.log($(this))
	      			 
	      			fileinfo = {
	      				'generated' : $(this).attr('src'), 
	      				'original' : $(this).attr('data-original')
	      			};

	      			self.imagesQueue.push(fileinfo);
	      			fileString.push(fileinfo);
	      		});

	      		$("input[name=" + self.inputFieldName + "]").val('{"orderfiles" : ' + JSON.stringify(fileString) + '}');

	      		console.log(self.imagesQueue);

	      		return ui;

	      	}
	    }).disableSelection();

		
	},

	//-------------------- START OVER -------------------------------
	startOver : function($) {
		this.imagesQueue = [];
		$("#images_que").empty();
		$.colorbox.close();
		this.colorboxPreview($, 'hide');
	}
}
