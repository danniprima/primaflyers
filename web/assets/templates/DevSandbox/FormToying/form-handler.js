const conLog = true;


function formSubmit() {
	//Parse form data

	//field IDs, edit here when adding fields
	var fieldIDs = ["school-name", "school-address", "contact-name", "phone", "mail"];
	var inDoc = [];
	for(var i = 0; i < fieldIDs.length; i++ ){
		inDoc.push( document.getElementById( fieldIDs[i] ).value );
	}
	if(conLog) console.log(inDoc);

	var validation = validateData(inDoc, fieldIDs);;
	if( validation[0] ) {

	}
	else{
		var problems = validation[1];
		alert("The following fields are invalid: " + problems);

		//repopulate fields
		for(var i = 0; i < fieldIDs.length; i++){
			document.getElementById( fieldIDs[i] ).innerHTML = inDoc[i];
		}
	}


}

function validateData(data, fields){
	var passed = true;
	var errorFields = [];

	for(var i = 0; i < data.length; i++){
		switch(fields[i]){
			case "school-name":
				if(data[i] == ""){
					passed = false;
					errorFields.push(fields[i]);
				}
				break;
			case "school-address":
				if(data[i] == ""){
					passed = false;
					errorFields.push(fields[i]);
				}
				break;
			case "contact-name":
				if(data[i] == ""){
					passed = false;
					errorFields.push(fields[i]);
				}
				break;
			case "phone":
				//RegEx for phone numbers of following formats:
				// (770) 321-4977
				// 770-321-4977
				// 7703214977
				// (770)-321-3777
				// 770.321.3777
				const phoneNumberRE = /\d{10}|\(\d{3}\)\-?\.?|\d{3}\-|\d{4}|\d{3}\./;
				if( phoneNumberRE.test(data[i])  && data[i] != "" ){
				}
				else{
					passed = false;
					if(conLog) console.log( data[i] + " " + phoneNumberRE.test(data[i]) );
					errorFields.push(fields[i]);	
				} 

				break;
			case "mail":

				//RegEx for email addresses of varied format. Such as blahblah@gmail.com, professor@college.school.edu or even optimus.prime@autobots.rule.decepticons.drool.at.this.point.im.just.showing.off.net
				const mailRE = /.+\@[a-z]+\.([a-z]*\.)*((com)|(co)|(app)|(net)|(org)|(club)|(design)|(shop)|(site)|(io)|(me)|(us)|(ca)|(ac)|(int)|(edu)|(gov)|(mil))/;

				if( mailRE.test(data[i] ) && data[i] != "" ){
				}
				else{
					passed = false;
					if(conLog) console.log( data[i] + " " + mailRE.test(data[i]) );
					errorFields.push(fields[i]);
					}	
				break;
				default:
				break;
		}

	}
	var retData = [passed, errorFields];
	return retData;
}