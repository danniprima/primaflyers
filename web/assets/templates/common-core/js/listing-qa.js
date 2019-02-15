/**
* qaLink
***********************/
function saveQuestion() {

	var name = jQuery.trim(jQuery('#productqa_name').val());
	var email = jQuery.trim(jQuery('#productqa_email').val());
	var question = jQuery.trim(jQuery('#productqa_question').val());

	var ramdomWord = jQuery.trim(jQuery('#productQa-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#productQa-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#productQa-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#productQa-modal  [name="g-recaptcha-response"]').val());

	var valid = true;
	var qaValidationMsg = "";

	if (name == '') { qaValidationMsg += "Please enter your Your Name or Alias. \n"; valid = false; }
	if (email == '' || !validateEmail(email)) { qaValidationMsg += "Please enter a valid email address. \n"; valid = false; }
	if (question == '') { qaValidationMsg += "Please enter value for question. \n"; valid = false; }
    
	if (jQuery("#gdpr_privacy_enforced").val() == "1") {
	    if (!jQuery('#productQa-modal input[name="privacy_accepted"]').is(':checked')) {
	        qaValidationMsg += GetLanguagItem('gdpr_privacy-policy-validation-message') + "\n";
	        valid = false;
	    }
	}

	if (!valid) {
		alert(qaValidationMsg);
		jQuery('#productQa-modal .loading-overlay').hide();
	}
	else {

		//Invisible captcha test
		if(jQuery('#productQa-recaptchaRobot').data('size') == 'invisible') {
			if(jQuery('#productQa-recaptchaRobot textarea').val() == '') {
				processCaptchaEexcute('productQa-modal', 'productQa_normal');
				return;
			}
		}

		jQuery.ajax({
			method: "POST",
			url: '/productqa.asp?action=ajax&catalogid=' + jQuery('#catalogid').val(),
			data: {
				ajaxAction: "saveqa",
				user_name: name,
				user_email: email,
				question: question,
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response
			},
			success: function (data) {
				if (data == 'ok') {
					jQuery('#productqa_question').val('');
					jQuery('#productQa-modal .modal-response').fadeIn(500);
					jQuery('#productqa_question').val('');
					refereshAllCaptchas();
				}
				else {
					alert(data);
					jQuery('#productQa-modal .loading-overlay').hide();
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#productQa-modal .loading-overlay').fadeOut(500);
			}
		});
	}
}


function saveAnswer() {

	var name = jQuery.trim(jQuery('#productqa_name').val());
	var email = jQuery.trim(jQuery('#productqa_email').val());
	var answer = jQuery.trim(jQuery('#productqa_answer').val());
	var qa_id = jQuery.trim(jQuery('#answerBlock_q_id').val());

	var ramdomWord = jQuery.trim(jQuery('#productQa-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#productQa-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#productQa-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#productQa-modal  [name="g-recaptcha-response"]').val());


	var valid = true;
	var qaValidationMsg = "";

	if (name == '') { qaValidationMsg += "Please enter your Your Name or Alias. \n"; valid = false; }
	if (email == '' || !validateEmail(email)) { qaValidationMsg += "Please enter a valid email address. \n"; valid = false; }
	if (answer == '') { qaValidationMsg += "Please enter value for answer. \n"; valid = false; }
    
	if (jQuery("#gdpr_privacy_enforced").val() == "1") {
	    if (!jQuery('#productQa-modal input[name="privacy_accepted"]').is(':checked')) {
	        qaValidationMsg += GetLanguagItem('gdpr_privacy-policy-validation-message') + "\n";
	        valid = false;
	    }
	}
	
	if (!valid) {
		alert(qaValidationMsg);
		jQuery('#productQa-modal .loading-overlay').hide();
	}
	else {

		//Invisible captcha test
		if(jQuery('#productQa-recaptchaRobot').data('size') == 'invisible') {
			if(jQuery('#productQa-recaptchaRobot textarea').val() == '') {
				processCaptchaEexcute('productQa-modal', 'productQa_normal');
				return;
			}
		}

		jQuery.ajax({
			method: "POST",
			url: '/productqa.asp?action=ajax&catalogid=' + jQuery('#catalogid').val(),
			data: {
				ajaxAction: "saveans",
				user_name: name,
				user_email: email,
				qa_id: qa_id,
				answer: answer,
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response
			},
			success: function (data) {
				if (data == 'ok') {
					jQuery('#productqa_question').val('');
					jQuery('#productQa-modal .modal-response').fadeIn(500);
					jQuery('#productqa_answer').val('');
					refereshAllCaptchas();
				}
				else {
					alert(data);
					jQuery('#productQa-modal .loading-overlay').hide();
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#productQa-modal .loading-overlay').hide();
			}
		});
	}
}


function productQa_normal() {}
function productQa_invisible() {
	action = jQuery('#productQa_action').val();

	if (action == 'saveqa') saveQuestion();
	else if (action == 'saveans') saveAnswer();
}

jQuery('.qaLink').click(function (e) {
	e.preventDefault();
	jQuery('#productqa-error').collapse('hide');
	jQuery('#productQa-modal .modal-response').hide();
	jQuery('#questionBlock').show();
	jQuery('#productQa-modal').addClass('question-modal').removeClass('answer-modal');
	jQuery('#productQa_action').val('saveqa');
	jQuery('#productQa-modal').modal('show');
});

jQuery('.qa-answer-btn').click(function (e) {
	e.preventDefault();
	jQuery('#productqa-error').collapse('hide');
	jQuery('#productQa-modal .modal-response').hide();

	jQuery('#productQa-modal').addClass('answer-modal').removeClass('question-modal');

	var q_id = jQuery(this).data('question');
	var question = jQuery('#question' + q_id).text();

	jQuery('#answerBlock_q_id').val(q_id);
	jQuery('#answer-question').text(question);

	jQuery('#productQa_action').val('saveans');
	jQuery('#productQa-modal').modal('show');
});

jQuery('#productQa_button').click(function (e) {
	jQuery('.productqa-error').hide();

	jQuery('#productQa-modal .loading-overlay').show();

	action = jQuery('#productQa_action').val();

	//if (action == 'saveqa') processCaptchaEexcute('productQa-modal', 'saveQuestion');
	//else if (action == 'saveans') processCaptchaEexcute('productQa-modal', 'saveAnswer');

	if (action == 'saveqa') saveQuestion();
	else if (action == 'saveans') saveAnswer();
});

jQuery('.modal-resclose').click(function () {
	jQuery(this).parents('.modal-response').hide();
});