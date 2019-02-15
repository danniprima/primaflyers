/**
 * Payment methods accepted by your gateway
 *
 * @todo confirm support for both payment methods with your gateway
 */
var allowedPaymentMethods = ['CARD', 'TOKENIZED_CARD'];

/**
 * Card networks supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/payments/web/object-reference#CardRequirements|CardRequirements}
 * @todo confirm card networks supported by your site and gateway
 */
var allowedCardNetworks = ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'];

/**
 * Identify your gateway and your site's gateway merchant identifier
 *
 * The Google Pay API response will return an encrypted payment method capable of
 * being charged by a supported gateway after shopper authorization
 *
 * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/payments/web/object-reference#Gateway|PaymentMethodTokenizationParameters}
 */
var tokenizationParameters = {
    tokenizationType: 'PAYMENT_GATEWAY',
    parameters: {
        'gateway': 'stripe',
        'stripe:version': '5.0.0',
        'stripe:publishableKey': stripeGooglePayKey
    }
}

/**
 * Initialize a Google Pay API client
 *
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
function getGooglePaymentsClient() {
    return (new google.payments.api.PaymentsClient({ environment: 'PRODUCTION' }));
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 */
function onGooglePayLoaded() {
    var paymentsClient = getGooglePaymentsClient();
    paymentsClient.isReadyToPay({ allowedPaymentMethods: allowedPaymentMethods })
        .then(function (response) {
            if (response.result) {
                addGooglePayButton();
                prefetchGooglePaymentData();
            }
        })
        .catch(function (err) {
            // show error in developer console for debugging
            console.error(err);
        });
}

/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/payments/brand-guidelines|Google Pay brand guidelines}
 */
function addGooglePayButton() {
    document.getElementById('google-pay-button').style.display = 'block';
    document.getElementById('google-pay-button').addEventListener('click', onGooglePaymentButtonClicked);
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/payments/web/object-reference#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
function getGooglePaymentDataConfiguration() {
    return {
        // @todo a merchant ID is available for a production environment after approval by Google
        // @see {@link https://developers.google.com/payments/web/test-and-deploy|Test and deploy}  		
        merchantId: merchantID,
        paymentMethodTokenizationParameters: tokenizationParameters,
        allowedPaymentMethods: allowedPaymentMethods,
        cardRequirements: {
            allowedCardNetworks: allowedCardNetworks,
            billingAddressRequired: true,
            billingAddressFormat: 'FULL'
        },
        phoneNumberRequired: true,
        emailRequired: true,
        shippingAddressRequired: true,
        shippingAddressRequirements: {
            allowedCountryCodes: ['US']
        }
    };
}

/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/payments/web/object-reference#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
function getGoogleTransactionInfo() {
    var initialTotal;
    jQuery.ajax({
        url: '/checkout_googlepay.asp',
        type: 'POST',
        dataType: 'text',
        data: 'action=orderdetail&hdnSecurityToken=[securityToken]',
        cache: false,
        async: false,
        success: function (strResponse) {
            console.log(strResponse);
            var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
            initialTotal = jsonResponse.TotalLine;
        },
        error: function (xhr, status, error) {
            alert("Something went wrong. Please try again. (code 102)");           
            updateErrorDescription("Error getting order details. (code 102). Error Details: " + error);
            return;
        }
    });

    return {
        currencyCode: initialTotal.amount.currency,
        totalPriceStatus: 'ESTIMATED',
        // set to cart total
        totalPrice: initialTotal.amount.value
    };
}


/**
 * Prefetch payment data to improve performance
 */
function prefetchGooglePaymentData() {
    var paymentDataRequest = getGooglePaymentDataConfiguration();
    // transactionInfo must be set but does not affect cache
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
        currencyCode: 'USD'
    };
    var paymentsClient = getGooglePaymentsClient();
    paymentsClient.prefetchPaymentData(paymentDataRequest);
}

/**
 * Show Google Pay chooser when Google Pay purchase button is clicked
 */
function onGooglePaymentButtonClicked() {

    //Add item to cart only for the product detail page	
    if (jQuery("#add").length > 0) {
        var myForm = new FormData(jQuery("#add")[0]);
        var isItemAdded = false;
        jQuery.ajax({
            url: '/add_cart.asp?applepay=1',
            type: 'POST',
            data: myForm,
            cache: false,
            async: false,
            processData: false,
            contentType: false,
            success: function (strResponse, status, xhr) {
                var strCurrentUrl = xhr.getResponseHeader("CurrentURL");
                console.log(strCurrentUrl);
                isItemAdded = true;
                if (strCurrentUrl == "/error.asp" || strCurrentUrl == "message.asp") {
                    isItemAdded = false;
                    return;
                }
            },
            error: function (xhr, status, error) {
                console.log("error: " + error);
                isItemAdded = false;
                return;
            }
        });

        if (!isItemAdded) {
            return;
        }
    }

    var paymentDataRequest = getGooglePaymentDataConfiguration();

    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

    var paymentsClient = getGooglePaymentsClient();

    paymentsClient.loadPaymentData(paymentDataRequest)
	  .then(function (paymentData) {
	      // handle the response
	      processPayment(paymentData);
	  })
	  .catch(function (err) {
	      if (err.statusCode != "CANCELED") {
	          var error = "Status Code: " + err.statusCode;
	          if (err.statusMessage != undefined && err.statusMessage != 'undefined')
	              error = error + ", Status Message: " + err.statusMessage;
	         
	          alert("Something went wrong. Please try again. (code 100)");
	          updateErrorDescription("Google Pay Payment Request API Error (code 100). Error Details: " + error);
	      }
	  });
}

/**
 * Process payment data returned by the Google Pay API
 *
 * @param {object} paymentData response from Google Pay API after shopper approves payment
 * @see {@link https://developers.google.com/payments/web/object-reference##paymentdata|PaymentData object reference}
 */
function processPayment(paymentData) {
    // show returned data in developer console for debugging
    console.log(paymentData);
    // @todo pass payment data response to gateway to process payment

    // TODO: Process payment 
    jQuery.ajax({
        url: '/checkout_googlepay.asp',
        type: 'POST',
        dataType: 'text',
        data: 'action=checkout&pm=' + isStripe + '&hdnSecurityToken=[securityToken]&checkout=' + encodeURIComponent(JSON.stringify(paymentData)),
        cache: false,
        async: false,
        success: function (strResponse) {            	  
            var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
            if (jsonResponse.k == null)
                alert('No response from GooglePay. Try again or use another payment method.');
            else {
                window.location = 'checkout_one.asp?k=' + jsonResponse.k + '&wid=' + jsonResponse.wid;
            }           
        },
        error: function (xhr, status, error) {            
            alert(GetErrorMessage("error.asp?error=14") + " (code 101)");
            updateErrorDescription("Error when charging credit card (code 101). " + error);
        }
    });

}

//old approach (please keep this code)
/*
if (window.PaymentRequest) {
    var ua = navigator.userAgent;
    //SamsungBrowser/([0-9]*.[0-9]*)
    //Version/([0-9]*.[0-9]*)
    if (ua.match(/Android/i) && ua.match(/Chrome/i) && !ua.match(/SamsungBrowser/i) && !ua.match(/Version/i)) {
        document.getElementById('google-pay-button').style.display = 'block';
        document.getElementById('google-pay-button').addEventListener('click', beginGooglePay);
    }
}
function beginGooglePay()
{	
	if(isStripe){
		
		 var supportedInstruments = [  	
		 {
		  'supportedMethods': ['https://google.com/pay'],
		  'data': {
			'merchantId': merchantID,
			'environment': 'PRODUCTION',
			'apiVersion': 1,
			'allowedPaymentMethods': ['CARD','TOKENIZED_CARD'],
			'paymentMethodTokenizationParameters': {
			  'tokenizationType': 'PAYMENT_GATEWAY',         
			  'parameters': {            
				'gateway': 'stripe',  
				'stripe:publishableKey': stripeGooglePayKey,  
				'stripe:version': '5.0.0'  
			  }
			},
			'cardRequirements': {
			  'allowedCardNetworks': ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
			  'billingAddressRequired': true,
			  'billingAddressFormat': 'MIN'
			},
			'phoneNumberRequired': true,
			'emailRequired': true,
			'shippingAddressRequired': false
		   
			}
		 }
		 ];
	}	 
	else
	{		
		if(isVantiv)
		{			
		 var supportedInstruments = [
		 {
		  'supportedMethods': ['https://google.com/pay'],
		  'data': {
			'merchantId': merchantID,
			'environment': 'PRODUCTION',
			'apiVersion': 1,
			'allowedPaymentMethods': ['CARD','TOKENIZED_CARD'],
			'paymentMethodTokenizationParameters': {
			  'tokenizationType': 'PAYMENT_GATEWAY',
			  'parameters': {     
				'gateway': 'vantiv',
				'vantiv:merchantPayPageId': vantivPayPageId,
				'vantiv:merchantOrderId': vantivOrderId,
				'vantiv:merchantTransactionId': vantivTransactionId,
				'vantiv:merchantReportGroup': vantivReportGroup
			  }
			},
			'cardRequirements': {
			  'allowedCardNetworks': ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
			  'billingAddressRequired': true,
			  'billingAddressFormat': 'MIN'
			},
			'phoneNumberRequired': true,
			'emailRequired': true,
			'shippingAddressRequired': false			   
			}
		 }
		 ];
		}		
		
	}	
	
	if(supportedInstruments==null || supportedInstruments==undefined || supportedInstruments=="undefined"){		
		console.error('There is not any supported instruments defined');		  
		return;
	}
  		
	//Add item to cart only for the product detail page	
	if (jQuery("#add").length > 0) {
        var myForm = new FormData(jQuery("#add")[0]);
        var isItemAdded = false;
        jQuery.ajax({
            url: '/add_cart.asp?applepay=1',
            type: 'POST',
            data: myForm,
            cache: false,
            async: false,
            processData: false,
            contentType: false,
            success: function (strResponse, status, xhr) {
                var strCurrentUrl = xhr.getResponseHeader("CurrentURL");
                console.log(strCurrentUrl);
                isItemAdded = true;
                if (strCurrentUrl == "/error.asp" || strCurrentUrl == "message.asp") {
                    isItemAdded = false;
                    return;
                }
            },
            error: function (xhr, status, error) {
                console.log("error: " + error);
                isItemAdded = false;
                return;
            }
        });

        if (!isItemAdded) {
            return;
        }
    }		
		
	var initialLines;
    var initialTotalLine;

    jQuery.ajax({
        url: '/checkout_googlepay.asp',
        type: 'POST',
        dataType: 'text',
        data: 'action=orderdetail&hdnSecurityToken=[securityToken]',
        cache: false,
        async: false,
        success: function (strResponse) {
            console.log(strResponse);
            var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
            initialLines = jsonResponse.LineItems;
            initialTotalLine = jsonResponse.TotalLine;
        },
        error: function (xhr, status, error) {
            updateErrorDescription("Error when start Google Pay.");
        }
    });

	const paymentDetails = {  
	  total: initialTotalLine,
	  displayItems: initialLines
	};  
	// Options isn't required.  
	const options = {  	 
	  requestShipping: true
	};
	
	const paymentRequest = new PaymentRequest(supportedInstruments, paymentDetails, options);
		  
	var myShippingContact; 
		  
	paymentRequest.addEventListener('shippingaddresschange', (event) => {  
		// TODO: Handle the event  
		myShippingContact = paymentRequest.shippingAddress;
		console.log(myShippingContact);  
		
		jQuery.ajax({
            url: '/checkout_googlepay.asp',
            type: 'POST',
            dataType: 'text',
            data: 'action=shipping&hdnSecurityToken=[securityToken]&shippingAddressJson=' + encodeURIComponent(JSON.stringify(myShippingContact)),
            cache: false,
			async: false,
            success: function (strResponse) {
				console.log(strResponse);
				var jsonResponse = JSON.parse(strResponse.replace("\\", ""));
                				
				//if address is not valid				
				const paymentDetails = {  
				  total: jsonResponse.TotalLine,
				  displayItems: jsonResponse.LineItems,
				  shippingOptions: jsonResponse.ShippingMethods, 
				}; 				
				event.updateWith(paymentDetails);  		
            },
            error: function (xhr, status, error) {
								
				//if address is not valid				
				const paymentDetails = {  
				  total: initialTotalLine,
				  displayItems: initialLines,
				  shippingOptions: [], 
				}; 
				updateErrorDescription("Error when selecting shipping address.");
				event.updateWith(paymentDetails);  
            }
        });				
		
	});	  
	  
	paymentRequest.addEventListener('shippingoptionchange', (event) => {  
	// TODO: Select a shipping option,  update total and display items.  
	
		// Step 1: Get the payment request object.  
		const prInstance = event.target;
		// Step 2: Get the ID of the selected shipping option.  
		const selectedId = prInstance.shippingOption;		
	
		jQuery.ajax({
            url: '/checkout_googlepay.asp',
            type: 'POST',
            dataType: 'text',
            data: 'action=shipping&hdnSecurityToken=[securityToken]&shippingAddressJson=' + encodeURIComponent(JSON.stringify(myShippingContact)) + "&shippingMethodSelected=" + selectedId,
            cache: false,
			async: false,
            success: function (strResponse) {
                console.log(strResponse);
                var jsonResponse = JSON.parse(strResponse.replace("\\", ""));				
				
               //if address is not valid				
				const paymentDetails = {  
				  total: jsonResponse.TotalLine,
				  displayItems: jsonResponse.LineItems,
				  shippingOptions: jsonResponse.ShippingMethods, 
				}; 				
				event.updateWith(paymentDetails);  	
            },
            error: function (xhr, status, error) {
                
				const paymentDetails = {  
				  total: initialTotalLine,
				  displayItems: initialLines,
				  shippingOptions: [], 
				}; 				
                updateErrorDescription("Error when selecting shipping method.");
				
				event.updateWith(paymentDetails);  
				
            }
        });		
	});	  
	  
	paymentRequest.show()
	.then((paymentResponse) => {  
	  // Close the payment request UI.  
		return paymentResponse.complete()		
		.then(() => {
			// TODO: Get the payment details from paymentResponse object.  
			// TODO: Process payment 
			jQuery.ajax({
				  url: '/checkout_googlepay.asp',
				  type: 'POST',
				  dataType: 'text',
				  data: 'action=oldcheckout&pm='+isStripe+'&hdnSecurityToken=[securityToken]&checkout=' + encodeURIComponent(JSON.stringify(paymentResponse)),
				  cache: false,
				  async: false,
				  success: function (strResponse) {                  	
					  paymentResponse.complete('success');				  
					  var jsonResponse = JSON.parse(strResponse.replace("\\", ""));                 
					  window.location.href = jsonResponse.RedirectUrl;
				  },
				  error: function (xhr, status, error) {  
					  alert(GetErrorMessage("error.asp?error=14") + " (code 101)");              
					  paymentResponse.complete('fail');
					  updateErrorDescription("Error when charging credit card. " + error);
				  }
			  });		 
		});  
	})  
	.catch((err) => {
		if(err.code!=20 && err.name!="AbortError")
		{
		  //alert("Error processing your request. Try again.");
		  console.error('Payment Request API error: ', err);		  
		  updateErrorDescription("Javascript Error: " + err.message);
			
		}	 	  	  
	});				
	
}
*/

function Abort(paymentRequest) {
    paymentRequest.abort()
	  .then(() => {
	      // Successfully aborted payment request 		
	      console.log('abort() OK');
	  })
	  .catch((err) => {
	      // Unable to abort payment request  
	      console.log('abort() Error: ', err);
	  });
}

function updateErrorDescription(strErrorDescription) {
    jQuery.ajax({
        url: '/checkout_googlepay.asp',
        type: 'POST',
        dataType: 'text',
        data: 'action=error&errordescription=' + encodeURIComponent('[Google Pay] ' + strErrorDescription) + '&hdnSecurityToken=[securityToken]'
    });
}

function GetErrorMessage(errorUrl) {
    var errorMsg = "";
    jQuery.ajax({
        url: errorUrl + '&ajax=1&hdnSecurityToken=',
        type: 'POST',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (objResponse) {
            console.log(objResponse);
            errorMsg = removeMarkupTags(objResponse.message);
        },
        error: function (objResponse) {
            errorMsg = "Something went wrong. Please try again.";
        }
    });
    return errorMsg;
}

function removeMarkupTags(strString) {
    var strInputCode = strString;
    strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
        return (p1 == "lt") ? "<" : ">";
    });
    var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
    strTagStrippedText = strTagStrippedText.replace(/\u00a0/g, '');
    strTagStrippedText = strTagStrippedText.replace(/&nbsp;/gi, '');
    return strTagStrippedText;
}