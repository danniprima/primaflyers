(function($) {

	function get_container($a) {
		var href = $a.attr('href').replace("#", "");
		return $("#pw_orders_" + href);
	}

	

	$("div.pw_orders").each(function() {
		var $ctrl = $(this);

		var ws = $ctrl.attr('id').replace('pw_orders_', '');
		var id = $ctrl.attr('data-orderid');
		var request = $.ajax({
			url: "https://store.primaatlanta.com/files/pw_status.php",
			method: "GET",
			data: { invoiceNumber : ws, id : id },
			dataType: "html",
			beforeSend : function(xhr) {
				//xhr.setRequestHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Accept, Content-Type, Origin, Cache-Control');
			}
		});
		 
		request.done(function( msg ) {
		    $ctrl.html( msg );
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		    console.log( "Request failed: " + textStatus );
		});	
	});

	$("a.pw_status")
		.on('click', function(e) {
			get_container($(this)).toggle();
		})
		.on('mouseenter', function(e) {
			get_container($(this)).show();
		});

	$(".pw_orders")
		.on('mouseleave', function(e) {
			//$(this).hide();
		})
	;


	function getDueDate(dateArray, turnaround) {
		var datestr = dateArray['year'] + "-" + fulldate(dateArray['mon']) + "-" + fulldate(dateArray['mday']) 
			+ " " + fulldate(dateArray['hours']) + ":" + fulldate(dateArray['minutes'])
			+ ":" + fulldate(dateArray['seconds']);

		/*var xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "http://primaatlanta.com/auto/api/turnaround.php?date=" 
	    	+ datestr + "&turnaround=" + turnaround, false);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();
	    var response = JSON.parse(xhttp.responseText);*/
	    
	    $("#estimate").html("Caluclating turnaround...");

	    $.ajax({
		  url: "https://primaatlanta.com/auto/api/turnaround.php",
		  data: {"date" : datestr, "turnaround" : turnaround},
		  success: function(json) {
		  	$("#estimate").html( json.dueDateFormatted );
		  },
		  dataType: 'json'
		});

	}

})(jQuery);