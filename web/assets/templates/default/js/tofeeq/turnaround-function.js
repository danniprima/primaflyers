//put this function in util.js in templates/defaults/ in get_
function getdate(timestamp){var _w=['Sun','Mon','Tues','Wednes','Thurs','Fri','Satur'];var _m=['January','February','March','April','May','June','July','August','September','October','November','December'];var d=((typeof(timestamp)=='undefined')?new Date():(typeof(timestamp)=='object')?new Date(timestamp):new Date(timestamp*1000));var w=d.getDay();var m=d.getMonth();var y=d.getFullYear();var r={};r.seconds=d.getSeconds();r.minutes=d.getMinutes();r.hours=d.getHours();r.mday=d.getDate();r.wday=w;r.mon=m+1;r.year=y;r.yday=Math.floor((d-(new Date(y,0,1)))/86400000);r.weekday=_w[w]+'day';r.month=_m[m];r['0']=parseInt(d.getTime()/1000,10);return r;}
function stripos(f_haystack,f_needle,f_offset){var haystack=(f_haystack+'').toLowerCase();var needle=(f_needle+'').toLowerCase();var index=0;if((index=haystack.indexOf(needle,f_offset))!==-1){return index;}
return false;}
function strpos(haystack,needle,offset){var i=(haystack+'').indexOf(needle,(offset||0));return i===-1?false:i;}
/**
* Get relative turnaround time as string
* 
* param: (string)url url of current page
* return: relative turnaround time as string
*/
function getTurnaround(url)
{
    if (stripos(url, "silk") !== false) return "Silk";
    else if (stripos(url, "TRIPLE-THICK-BUSINESS-CARDS") !== false) return "Three Day";
    else if (strpos(url, "posters-18x24-card-stock-same-day") !== false) return "18x24posters";
	else if (stripos(url, "YARD-SIGN") !== false) return "WideND";
	else if ( 
		   	   stripos(url, "banner-8x8") !== false 
			|| stripos(url, "banner-with-stand") !== false 
			|| stripos(url, "24X36-A-FRAME-SIGN") !== false 
		) return "Same Day";
	else if (stripos(url, "same-day") !== false) return "Same Day";
	else if (strpos(url, "SD") !== false) return "Same Day";
	else if (stripos(url, "next-day") !== false) return "Next Day";
	else if (strpos(url, "ND") !== false) return "Next Day";
    else if (strpos(url, "3D") !== false) return "Three Day";
    else if (stripos(url, "3-day") !== false) return "Three Day";
    else if (stripos(url, "five-day") !== false) return "Five Day";
	else if (stripos(url, "5-day") !== false) return "Five Day";
	
	
	else if (stripos(url, "banner") !== false) return "Banners";
	else if (stripos(url, "saturday") !== false) return "Saturday Fee";
	
	else return;
}

function fulldate(val) {
	if (val < 10) {
		val = "0" + val;
	}

	return val;
}

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
    
    console.log(turnaround);
    $("#estimate").html("Caluclating turnaround...");

    $.ajax({
	  url: "https://primaatlanta.com/auto/api/turnaround.php",
	  data: {"date" : datestr, "sku" : $("#itemid").val(), "turnaround" : $("[name=option-25791-3877] option:selected").text()},
	  success: function(json) {
	  	$("#estimate").html( json.dueDateFormatted );
	  },
	  dataType: 'json'
	});
}