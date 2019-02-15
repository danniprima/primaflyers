


/**
Gets additionaldays if a user selects a certain option
**/
function getAddiontalDays () {
	var additional = 0;
	
	var selected = $("option").filter(":selected");
	for (var i = 0; i < selected.length; i++){
		var text = $(selected[i]).html();
		if (text.indexOf("adds one day to turnaround") > 0 || text.indexOf("adds 1 day to turnaround") > 0){
			additional++;
		}
	}

	return additional;
}

/**
* Gets number of days until given day of the week
* 
* param: (string)$day Given day of the week
*/
function daysUntil(day)
{
	for (i=0; i<6; ++i)
	{
		var days = "+"+i+" day";
		var check = date("l", strtotime(days, getdate()['0']));
		if (check == day) return i;
	}
}





function wideOrderSaturdayFix(dayStr, hour){
	
	var turnaroundDays;
	
	console.log(dayStr+ " panda "+hour);
	//hour = 15;
	if (strpos(dayStr, "Friday") !== false && hour >= 15) { //after 3pm local time on Friday
		turnaroundDays = 2;
	} else {
		turnaroundDays = 0;
	}

	
	return turnaroundDays;
	
}

/**
* Get date order is due
*
* param: (arr)$dateArr getDate() or time() like object/array
* param: (string)$turnaround relative due date ("Same Day", "Next Day", "Five Day");
* return: absolute due date string
*/
function old_getDueDate(dateArr, turnaround)
{
	var openingTime = 10; //10am
	var closingTime = 19; //7pm
	var cutoffTime = 15; //3pm
	var cutoffTimeSD = 15; //3pm
	var cutoffTimeND = 0; //12am
	var cutoffTimeSat = 14; //2pm
	var turnaroundHours = 4; //In-shop time from notification to production completion
	
	/*Current time, from param*/
	var minute = dateArr['minutes'];
	var hour = dateArr['hours'];
	var day = dateArr['mday'];
	var dayStr = dateArr['weekday'];
	var dateNum = dateArr['0'];
	var year = dateArr['year'];
	
	var readyMinute, readyHour, readyDay, turnaroundDays, note;
	
	/*Parse delivery time, from param*/
	switch(turnaround)
	{
		case "18x24posters": //before 3, then estimate 4 to 6 hours but not before 7
		
			turnaroundDays = 0;
			console.log("what is up "+turnaroundDays);
			break;
		case "Same Day": 
			turnaroundDays = 0; 
			break;

		case "Next Day": 
            turnaroundDays = 1;
            break;

        case "Three Day": 
            turnaroundDays = 2; 
            break;

        case "Five Day":
            turnaroundDays = 4; 
            break;

        case "Silk":
            turnaroundDays = 1;
            break;
	
	case "WideND":
	    turnaroundDays = 1;
	    console.log("hello man");
	    break;
	    
	case "Banners":
	    turnaroundDays = 0;
	    console.log("yo" + " " + turnaroundDays);
            break;

	case "Saturday Fee": 
	    return "Saturday by 6pm. It will be left outside for pickup.";
	}
	console.log(turnaroundDays);
	
	turnaroundDays+=getAddiontalDays();
	console.log(turnaroundDays + " hi");
	
	//if (turnaround == "Saturday Fee") return "nope";
	/*if ("Friday" == dayStr | "Saturday" == dayStr | "Sunday" == dayStr)
    {
        return "end of day Monday, February 4";
    }*/
	
	
	if (turnaroundDays == 0) //same day
	{
		console.log(turnaroundDays + " hi 2");
		if (dayStr == "Friday" && turnaround == "18x24posters" && hour >= cutoffTime) {
			dateNum += 3;
		}
		if (dayStr != "Saturday" & dayStr != "Sunday") //biz day
		{
			console.log(turnaroundDays + " hi 5");
			if (hour < openingTime) //before op hours
			{
				console.log("chicken nugget " + hour);
				readyMinute = 0; //on the hour
				readyHour = openingTime + turnaroundHours; //2pm
				readyDay = date("l, F j", dateNum); //today
			}
			else if (openingTime<=hour && hour<cutoffTime) //during op hours
			{
				console.log("panda time");
				readyMinute = minute;
				readyHour = hour + turnaroundHours; //4 hours from order sub
				readyDay = date("l, F j", dateNum); //today
			}
			else //if (hour>closingTime) //after op hours
			{
				readyMinute = 0;
				readyHour = openingTime + turnaroundHours; //2pm
				readyDay = date("l, F j", nextBizDay(dateNum)); //next business day (Monday)
				if (dayStr == "Friday")
			    {
			        note = "<br />The Prima office is closed Saturday and Sunday, however we do offer a Saturday pick-up option.  If you would like to pick up your product on Saturday, please request this in the comments section when ordering.  Your order will then be placed out back in the loading dock area after 6pm on Saturday.  Thank You!";
			    }
			}
		}
		else if (dayStr == "Saturday")
		{
			if (hour < openingTime) //before op hours
			{
				readyMinute = 0; //on the hour
				readyHour = openingTime + turnaroundHours; //2pm
				readyDay = date("l, F j", dateNum); //today
			}
			else if (openingTime <= hour && hour < cutoffTimeSat) //during op hours
			{
				readyMinute = minute;
				readyHour = hour + turnaroundHours; //4 hours from order sub
				readyDay = date("l, F j", dateNum); //today
                
			}
			else //if (hour >= cutoffTimeSat) //after op hours
			{
				readyMinute = 0;
				readyHour = openingTime + turnaroundHours; //2pm
				readyDay = date("l, F j", nextBizDay(dateNum)); //next business day (Monday)
			}
		}
		else //weekend, sunday
		{
			console.log(turnaroundDays + " hi 3");
			readyMinute = 0;
			readyHour = openingTime + turnaroundHours; //2pm
			readyDay = date("l, F j", nextBizDay(dateNum)); //next business day (Monday)
		}
	}
	else if (turnaroundDays == 1) //next day
	{
        if (turnaround == "Silk")
        {
            readyMinute = 0;
            readyHour = closingTime;
            readyDay = date("l, F j", nextBizDay(dateNum));
        } else if (dayStr == "Friday" && turnaround == "WideND") {
		
		readyMinute = 0;
		readyHour = closingTime;
		readyDay = date("l F j", strtotime("+3 day", dateNum));
	}
        else if (dayStr == "Friday")
		{
			readyMinute = 0;
			readyHour = closingTime;
			readyDay = date("l F j", strtotime("+1 day", dateNum)); //Saturday, special case
			note = "<br />The Prima office is closed Saturday and Sunday, however we do offer a Saturday pick-up option.  If you would like to pick up your product on Saturday, please request this in the comments section when ordering.  Your order will then be placed out back in the loading dock area after 6pm on Saturday.  Thank You!";
		}
        else if (0 == cutoffTimeND || hour < cutoffTimeND) //account for midnight cutoff
        {
            readyMinute = 0;
            readyHour = closingTime;
            readyDay = date("l, F j", nextBizDay(dateNum));
        }
        else
        {
            readyMinute = 0;
            readyHour = closingTime;
            readyDay = date("l, F j", nextBizDay(nextBizDay(dateNum)));
        }
	}
    else if (turnaroundDays == 2) //three day
    {
        readyMinute = 0;
        readyHour = 18; //6pm
        readyDay = date("l F j", nextBizDay(nextBizDay(nextBizDay(dateNum))));
    }
	else if (turnaroundDays == 4) //five day
	{
		if (dayStr=="Saturday")
		{
			readyMinute = 0; 
			readyHour = closingTime; //by closing time
			readyDay = date("l F j", strtotime("+1 week 2 day", dateNum)); //next Monday
		}
		else if (dayStr=="Sunday")
		{
			readyMinute = 0;
			readyHour = closingTime; //by closing time
			readyDay = date("l F j", strtotime("+1 week 1 day", dateNum)); //next Monday
		}
		else
		{
			readyMinute = 0;
			readyHour = closingTime; //by closing time
			readyDay = date("l F j", strtotime("+1 week", dateNum)); //next [current day]
		}
	}
	else //undefined turnaround (usually 7-10 days)
	{
	    return "[cannot estimate at this time].";
	}

	
	
	/*Return example: "Monday, May 21, 2:02 pm (EDT)"*/
	if (readyMinute<10) readyMinute = "0"+readyMinute;
	var newDate = readyDay+", "+year+" "+readyHour+":"+readyMinute;
	var formattedDate;
	
	if (turnaroundDays == 0) {
		var end, endReadyMinute;
		console.log(readyHour + " <-- ready hour");
		if ( readyHour + 2 >= 19){
			end = 12 + 7;
			console.log("hi there!");
		}
		else { 
			end = readyHour + 2;
			console.log("tralalala");
		}
		console.log("end hour!!: "+end);
		if (end == 12 + 7){
			endReadyMinute = 0;
		} else {
			endReadyMinute = readyMinute;
		}
		console.log(end + ":" + endReadyMinute);
		console.log(date("g:i a", strtotime(end + ":" + endReadyMinute))+"hello");
		formattedDate = date("l, F j, g:i a", strtotime(newDate)) + " to " + date("g:i a", strtotime(readyDay+", "+year+" "+end + ":" + endReadyMinute));
		console.log(formattedDate);
	} else {
		formattedDate  =  date("l, F j, g:i a", strtotime(newDate));
	}
	if (note) return formattedDate + " " + note;
	return formattedDate;
}


function getDueDate(dateArray, turnaround) {
	var datestr = dateArray['year'] + "-" + dateArray['mon'] + "-" + dateArray['mday'] 
		+ " " + dateArray['hours'] + ":" + dateArray['minutes']
		+ ":" + dateArray['seconds'];

	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://primaatlanta.com/auto/api/turnaround.php?date=" 
    	+ datestr + "&turnaround=" + turnaround, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
}
/**
* Get next business day
*
* param: (string)curDay current day (strtotime-parseable object)
* return: next business day string
*/
function nextBizDay(curDay)
{
	var curDayStr = date("l", curDay); //get name of day
	switch (curDayStr)
	{
		case "Friday": return strtotime("+3 day", curDay); break; //accounts for weekends
		case "Saturday": return strtotime("+2 day", curDay); break; //accounts for weekends
		default: return strtotime("+1 day", curDay);
	}
}


/**
* Get relative turnaround time as string
* 
* param: (string)url url of current page
* return: relative turnaround time as string
*/
function getTurnaround(url)
{
    if (stripos(url, "silk") !== false) return "Silk";
    else if (strpos(url, "posters-18x24-card-stock-same-day") !== false) return "18x24posters";
	else if (stripos(url, "banner-8x8") !== false || stripos(url, "banner-with-stand") !== false || stripos(url, "banner-with-stand") !== false || stripos(url, "NEXT-DAY-24X36-A-FRAME-SIGN") !== false || stripos(url, "YARD-SIGN") !== false) return "WideND";
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


function removeAffiliate()
{
	$("a[href*='affiliate.asp']").first().attr("href") = "#";
}


/**
 * Everything below is for formatting phone numbers in My Account
 * 
 * This script is based on the javascript code of Roman Feldblum (web.developer@programmer.net)
 * Original script : http://javascript.internet.com/forms/format-phone-number.html
 * Original script is revised by Eralper Yilmaz (http://www.eralper.com)
 * Revised script : http://www.kodyaz.com
 */
var zChar = new Array(' ', '(', ')', '-', '.');
var maxphonelength = 13;
var phonevalue1;
var phonevalue2;
var cursorposition;

function ParseForNumber1(object){
	phonevalue1 = ParseChar(object.value, zChar);
}
function ParseForNumber2(object){
	phonevalue2 = ParseChar(object.value, zChar);
}
function backspacerUP(object,e) {
	if(e){
		e = e
	} else {
		e = window.event
	}
	if(e.which){
		var keycode = e.which
	} else {
		var keycode = e.keyCode
	}

	ParseForNumber1(object)

	if(keycode >= 48){
		ValidatePhone(object)
	}
}
function backspacerDOWN(object,e) {
	if(e){
		e = e
	} else {
		e = window.event
	}
	if(e.which){
		var keycode = e.which
	} else {
		var keycode = e.keyCode
	}
	ParseForNumber2(object)
}
function GetCursorPosition(){
	var t1 = phonevalue1;
	var t2 = phonevalue2;
	var bool = false
	for (i=0; i<t1.length; i++)
	{
		if (t1.substring(i,1) != t2.substring(i,1)) {
			if(!bool) {
				cursorposition=i
				bool=true
			}
		}
	}
}
function ValidatePhone(object){
	var p = phonevalue1
	p = p.replace(/[^\d]*/gi,"")
	if (p.length < 3) {
	object.value=p
	} else if(p.length==3){
	pp=p;
	d4=p.indexOf('(')
	d5=p.indexOf(')')
	if(d4==-1){
	pp="("+pp;
	}
	if(d5==-1){
	pp=pp+")";
	}
	object.value = pp;
	} else if(p.length>3 && p.length < 7){
	p ="(" + p;
	l30=p.length;
	p30=p.substring(0,4);
	p30=p30+")"
	p31=p.substring(4,l30);
	pp=p30+p31;
	object.value = pp;
	} else if(p.length >= 7){
		p ="(" + p;
		l30=p.length;
		p30=p.substring(0,4);
		p30=p30+")"
		p31=p.substring(4,l30);
		pp=p30+p31;
		l40 = pp.length;
		p40 = pp.substring(0,8);
		p40 = p40 + "-"
		p41 = pp.substring(8,l40);
		ppp = p40 + p41;
		object.value = ppp.substring(0, maxphonelength);
	}
	GetCursorPosition()
	if(cursorposition >= 0){
		if (cursorposition == 0) {
			cursorposition = 2
		} else if (cursorposition <= 2) {
			cursorposition = cursorposition + 1
		} else if (cursorposition <= 5) {
			cursorposition = cursorposition + 2
		} else if (cursorposition == 6) {
			cursorposition = cursorposition + 2
		} else if (cursorposition == 7) {
			cursorposition = cursorposition + 4
			e1=object.value.indexOf(')')
			e2=object.value.indexOf('-')
			if (e1>-1 && e2>-1){
				if (e2-e1 == 4) {
					cursorposition = cursorposition - 1
				}
			}
		} else if (cursorposition < 11) {
			cursorposition = cursorposition + 3
		} else if (cursorposition == 11) {
			cursorposition = cursorposition + 1
		} else if (cursorposition >= 12) {
			cursorposition = cursorposition
		}
		var txtRange = object.createTextRange();
		txtRange.moveStart( "character", cursorposition);
		txtRange.moveEnd( "character", cursorposition - object.value.length);
		txtRange.select();
	}
}
function ParseChar(sStr, sChar)
{
	if (sChar.length == null)
	{
		zChar = new Array(sChar);
	}
	else zChar = sChar;
	for (i=0; i<zChar.length; i++)
	{
		sNewStr = "";
		var iStart = 0;
		var iEnd = sStr.indexOf(sChar[i]);
		while (iEnd != -1)
		{
			sNewStr += sStr.substring(iStart, iEnd);
			iStart = iEnd + 1;
			iEnd = sStr.indexOf(sChar[i], iStart);
		}
		sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);
		sStr = sNewStr;
	}
	return sNewStr;
}

