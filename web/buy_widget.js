var bw_domain, bw_affiliateid, bw_store_currency;
var inAdmin = location.href.indexOf('admin/product_edit.asp');
var widget3dLoadAttempts = 0;

function renderBuyWidget() {

	var product_id = '';
	var product_name = '';
	var product_image_url = '';
	var product_url = '';
	var product_price = '';
	var product_onsale = '';
	var product_saleprice = '';
	var product_stock = '';
	var inv_control = '';
	var inv_control_global = '';
	var product_optionsSet = '';
	var product_sku = '';
    var divOptionName = '';
    bw_affiliateid = '';

	var dataArray = new Array();

	jQuery('div[data-content-id]').each(function () {
		var buy_widgetid = jQuery(this).data('content-id');
		bw_store_currency = jQuery(this).data('currency');
		bw_affiliateid = jQuery(this).data('affiliate-id');
		if (bw_affiliateid == "") bw_affiliateid = "0";
	    bw_domain = jQuery(this).data('store-url'); //Remove http and https and leave only the //

		jQuery.ajax({
			url: bw_domain + 'frontapi.asp',
			dataType: 'json',
			type: 'GET',
			cache: false,
			async: false,
			data: {
				productid: buy_widgetid,
				limit: 1,
				module: 'products',
				offset: 1
			},
			success: function (data) {
				product_id = data.CatalogID;
				product_name = data.Name;
				product_image_url = data.ThumbnailFile;
				product_url = data.ProductLink;
				product_price = data.Price;
				product_onsale = data.OnSale;
				product_saleprice = data.SalePrice;
				product_stock = data.Stock;
				inv_control = (data.InventoryControl != '-1' ? data.InventoryControl : data.InventoryControlGlobal);
				product_optionsSet = data.OptionSetList;
				product_sku = data.SKU;
				product_categoryid = 0;
				product_quantity = 1;
				product_options = JSON.parse(product_optionsSet);
				divOptionName = '';

                if (product_options.length > 0) {
                    product_options.forEach(function (productoption) {

				        var strOptionType = productoption.OptionType;
				        var strOptionSetName = productoption.OptionSetName;
				        var strOptionName = productoption.OptionSetId + "-" + product_id;

				        switch (strOptionType) {
				            case "Dropdown":
				            	divOptionName = divOptionName + "<div class='buy-content-option'>";
				            	divOptionName = divOptionName + "<label>" + strOptionSetName + "</label>";
				            	divOptionName = divOptionName + "<select name='option-" + strOptionName + "' id='" + strOptionSetName + "'>";

				                productoption.OptionList.forEach(function (optionItem) {

				                    if (optionItem.OptionHide != '1') {
				                        divOptionName = divOptionName + "<option value='" + optionItem.OptionID + "'>" + optionItem.OptionName + "</option>";

				                        if (optionItem.OptionSelected == "1")
				                            divOptionName = divOptionName + " selected";
				                    }
				                });

				                divOptionName = divOptionName + "</select></div>";
				                break;

				            case "Radio":
				                divOptionName = divOptionName + "<div class='buy-content-option'>";

                                productoption.OptionList.forEach(function (optionItem) {
                                    if (optionItem.OptionHide != '1') {
                                        divOptionName = divOptionName + "<label><input type='radio' name='option-" + strOptionName + "' value='" + optionItem.OptionID + "'";

                                        if (optionItem.OptionSelected == "1")
                                            divOptionName = divOptionName + " checked";

                                        divOptionName = divOptionName + ">" + optionItem.OptionName + "</label>";
                                    }
    		                    });

				                divOptionName = divOptionName + "</div>";
				                break;

                            case "Checkbox":
                                divOptionName = divOptionName + "<div class='buy-content-option'>";

                                productoption.OptionList.forEach(function (optionItem) {
                                    if (optionItem.OptionHide != '1') {
                                        divOptionName = divOptionName + "<label><input type='checkbox' name='cb" + strOptionName + "' value='" + optionItem.OptionID + "'";

                                        if (optionItem.OptionSelected == "1")
                                            divOptionName = divOptionName + " checked";

                                        divOptionName = divOptionName + ">" + optionItem.OptionName + "</label>";
                                    }
				                });
				                divOptionName = divOptionName + "</div>";
                                break;

				            default:
                                break;
                        }
				    });
				}

			},
			error: function (objError) {
				jQuery('[data-content-id="' + buy_widgetid + '"]').remove();

				if (inAdmin) {
					alert('Error getting product details.');
					return;
				}

				if (objError.status == 404) {
					console.log('Product widget ID: ' + buy_widgetid + ' is not available.');
				}
				else if (objError.status == 404) {
					console.log('Product ID: ' + buy_widgetid + ' not found.');
				}
				else {
					console.log('Product ID: ' + buy_widgetid + ' is invalid.');
				}
				return;
			}
		});

		if (dataArray.indexOf(buy_widgetid)) {

			dataArray.push(buy_widgetid);
			jQuery('div[data-content-id="' + buy_widgetid + '"]').each(function () {
				var divBuy_content = jQuery('[data-content-id="' + buy_widgetid + '"]');
				var instock_msg = jQuery(divBuy_content).data('stock-text');
				var outstock_msg = jQuery(divBuy_content).data('nostock-text');
				var btnBkgColor = jQuery(divBuy_content).data('button_color');
				var btnTextColor = jQuery(divBuy_content).data('button_text_color');
				var bbwBgdColor = jQuery(divBuy_content).data('bgd_color');
				var bbwTextColor = jQuery(divBuy_content).data('text_color');

				if (product_onsale == '1')
					product_price = parseFloat(product_saleprice).toFixed(2);
				else
					product_price = parseFloat(product_price).toFixed(2);

				if (product_stock > 0 || inv_control == '2') {
					product_stock = instock_msg;
				}
				else if (inv_control == '0') {
					jQuery(divBuy_content).remove();
					console.log('Product widget ID: ' + buy_widgetid + ' is out of stock.');
				}
				else {
					product_stock = outstock_msg;
				}

				var divProduct_image = "<div class='buy-content-image'><a href='" + product_url + "' target='_blank'>" + "<img src='" + bw_domain + product_image_url + "' alt='" + product_name + "' />" + "</a></div>";
				var divProduct_name = "<div class='buy-content-itemname'>" + product_name + "</div>";
				var divProduct_price = "<div class='buy-content-itemprice'>" + bw_store_currency + product_price + "</div>";
				var divProduct_status = "<div class='buy-content-status'>" + product_stock + "</div>"
				var product_button_text = jQuery(divBuy_content).data('content-button_text');
				if (inAdmin < 0)
					var divProduct_button = '<button type="button" class="buy-content-buybtn" onclick="javascript:aniBtn(' + buy_widgetid + ');add_to_cart(' + buy_widgetid + ",'" + product_sku + "'," + product_categoryid + ',' + product_price + ',' + product_quantity + ',' + bw_affiliateid + ');">' + '<i class="w-checkmark"></i><span>' + product_button_text + '</span></button>';
				else
					var divProduct_button = '<button type="button" class="buy-content-buybtn">' + '<i class="w-checkmark"></i><span>' + product_button_text + '</span></button>';

				var divBuy_content_style = jQuery(divBuy_content).data('content-size');

				switch (divBuy_content_style) {
					case 'default':
						jQuery(divBuy_content).addClass('buy-content default');
						break;

					default:
						break;
				}

				var showDivProductName = jQuery(divBuy_content).data('product-name');
				if (showDivProductName ? divProduct_name = divProduct_name : divProduct_name = '');

				var showDivProductImage = jQuery(divBuy_content).data('product-thumb');
				if (showDivProductImage ? divProduct_image = divProduct_image : divProduct_image = '');

				var showDivProductPrice = jQuery(divBuy_content).data('product-price');
				if (showDivProductPrice ? divProduct_price = divProduct_price : divProduct_price = '');

				if (product_stock == undefined || product_stock == null)
					divProduct_status = '';

				if (jQuery(divBuy_content).html().trim().length != 0) {
					jQuery(divBuy_content).empty();
					jQuery(divBuy_content).append([divProduct_image, divProduct_name, divOptionName, divProduct_price, divProduct_status, divProduct_button]);
				}
				else {
					jQuery(divBuy_content).before('<link rel="stylesheet" href="' + bw_domain + 'buy_widget_styles.css" type="text/css" />');
				    jQuery(divBuy_content).append([divProduct_image, divProduct_name, divOptionName, divProduct_price, divProduct_status, divProduct_button]);
				}
					
				jQuery('button.buy-content-buybtn').css('background', btnBkgColor);

				jQuery('button.buy-content-buybtn').css('color', btnTextColor);

				jQuery(divBuy_content).css('background', bbwBgdColor);

				jQuery(divBuy_content).css('color', bbwTextColor);
					
			});
		}
	});
	if (inAdmin < 0)
	    checkBuyContentCart();
}

function aniBtn(bwId) {
	jQuery('div[data-content-id="' + bwId + '"] .buy-content-buybtn').addClass('animate');

	setTimeout(function () {
		jQuery('div[data-content-id="' + bwId + '"] .buy-content-buybtn').removeClass('animate');
	}, 1500);
}

function checkBuyContentCart() {

    if (getCookie('buywidgetincompleteorderid') == "") return;

	jQuery.ajax({
		url: bw_domain + 'frontapi.asp',
		dataType: 'json',
		type: 'GET',
		cache: false,
		async: false,
		data: {
		    module: 'cart',
		    incompleteorderid: getCookie('buywidgetincompleteorderid'),
		    hk: getCookie('hk'),
		    orderFromWidget: getCookie('orderFromWidget'),
		    affiliate: bw_affiliateid
		},
		success: function (data) {
		    var intIndex = 0;

			if (jQuery("#divBuyContentCart").length==0)
				jQuery("body").append("<div id='divBuyContentCart' class='buy-content-cart' style='display:none'><div class='widget-top'><h3>Checkout</h3><button type='button' onclick='ShowViewCart();'>+</button><div class='clear'></div></div><div class='widget-cart-form'><div class='widget-items-container'><form name='frmCart' id='frmCart' method='post'><div id='divBuyContentCartItems'></div></div></form></div><div class='widget-bottom'><div id='divBuyContentCartTotal' class='widget-cart-total'></div><button type='button' id='divBuyContentCheckoutButton' onclick='OpenCheckout();return false;'>Checkout</button></div></div>");

			jQuery("#divBuyContentCartItems").empty();

			var item_id, item_catalogid, divItem_name, divItem_image_url, divItem_price, item_optionsSet, item_catalogid, divItem_qty, item_orderitemid, divItem_lineitemprice, TotalQty;
			var dblCartTotal;

   			if (data.incompleteorderid != undefined && data.incompleteorderid.length == 0){
                removeBuyContentCart(true);
            }
            else if (data.ItemsInCart != undefined && data.ItemsInCart.length > 0) {
   			    TotalQty = 0;
                dblCartTotal = 0.00;
				for (intIndex = 0; intIndex < data.ItemsInCart.length; intIndex++) {

					item_orderitemid = data.ItemsInCart[intIndex].orderitemid;
					item_catalogid = data.ItemsInCart[intIndex].catalogid;
					item_id = data.ItemsInCart[intIndex].itemid;
					TotalQty += data.ItemsInCart[intIndex].qty;
					divItem_qty = "<div class='widget-qty'><input type='hidden' name='colid" + intIndex + "' value='" + item_orderitemid + "' /><div class='widget-cart-decr' onclick='changeAmount(" + item_orderitemid + ", -1)'>-</div><input type='text' class='widget-cart-qty' name='qty" + intIndex + "' id='qty" + item_orderitemid + "' value='" + data.ItemsInCart[intIndex].qty + "' size='3' onblur='changeAmount(" + item_orderitemid + ", 0)' maxlength='4' /><div class='widget-cart-incr' onclick='changeAmount(" + item_orderitemid + ", 1)'>+</div></div>";
					divItem_name = "<div class='widget-item-qty'><div class='widget-item-name'>" + data.ItemsInCart[intIndex].itemname + "</div>" + divItem_qty + "</div>";
					divItem_image_url = "<div class='buy-content-image'><img src='" + bw_domain + data.ItemsInCart[intIndex].thumbnail + "' /></div>";
					divItem_price = "<div class='buy-content-price'>" + bw_store_currency + data.ItemsInCart[intIndex].price.toFixed(2) + "</div>";
					divItem_lineitemprice = "<div class='buy-content-price' id='divPriceTotal" + "" + "'>" + bw_store_currency + data.ItemsInCart[intIndex].lineitemprice.toFixed(2) + "</div>"
					//item_optionsSet = data.OptionSetList;

					jQuery("#divBuyContentCartItems").append("<div class='widget-lineitem' id='divBuyContentLineItem_" + item_orderitemid + "'></div>");
					jQuery("#divBuyContentLineItem_" + item_orderitemid).append(divItem_image_url);
					jQuery("#divBuyContentLineItem_" + item_orderitemid).append(divItem_name);
					jQuery("#divBuyContentLineItem_" + item_orderitemid).append(divItem_price);
					jQuery("#divBuyContentLineItem_" +item_orderitemid).append(divItem_lineitemprice);
					jQuery("#divBuyContentLineItem_" + item_orderitemid).append("<div class='clear'></div>");

   			        dblCartTotal = dblCartTotal +parseFloat(data.ItemsInCart[intIndex].lineitemprice.toFixed(2));
   			        jQuery("#divBuyContentCartItems").append("<div class='clear'></div>");
				}

				jQuery("#divBuyContentCart").append("<div class='clear'></div>");
				jQuery("#divBuyContentCartTotal").html("<span class='widget-total-txt'>TOTAL</span> <span class='widget-total-amt'>" + bw_store_currency + dblCartTotal.toFixed(2) + "</span>");

				if (jQuery("#divBuyContentCartButton").length == 0)
					jQuery("body").append("<div id='divBuyContentCartButton' class='buy-content-cart-button' onclick='ShowViewCart();'><div id='divBuyContentCartButtonQty' class='buy-content-cart-button-qty'></div><i class='material-icons'>shopping_cart</i></div>");
				jQuery("#divBuyContentCartButtonQty").text(TotalQty);

				jQuery("#divBuyContentCart").append("<div class='clear'></div>");
			}
			else {
				removeBuyContentCart(false);
            }
		},
		error: function (objError) {
            //alert('Error');
			return;
		}
	});

}

function changeAmount(intOrderItemID, intChange) {
	if (intChange == 1 || intChange == -1)
		jQuery("#qty" + intOrderItemID).val(parseInt(jQuery("#qty" + intOrderItemID).val()) + parseInt(intChange));
	
	if (parseInt(jQuery("#qty" + intOrderItemID).val()) <= 0) {
		jQuery("#qty" + intOrderItemID).val(0);
		jQuery("#divBuyContentLineItem_" + intOrderItemID).slideUp();
		//remove from the cart
	}

	var dataq = 'module=updateqty&hk=' + getCookie('hk') + '&incompleteorderid=' + getCookie('buywidgetincompleteorderid') + '&' + jQuery("#frmCart").serialize();
	jQuery.ajax({
		url: bw_domain + 'frontapi.asp',
		dataType: 'text',
		type: 'POST',
		cache: false,
		async: true,
		data: dataq,
		success: function () {
			checkBuyContentCart();
		},
		error: function (objError) {
			//alert(objError.statusText);
		}
	});
}

function ShowViewCart() {
    if (jQuery("#divBuyContentCart").css("display") == 'none' || jQuery("#divBuyContentCart").length == 0) {
        checkBuyContentCart();
        jQuery("#divBuyContentCartButton").hide();
        jQuery("#divBuyContentCart").slideToggle();
    }
    else {
    	jQuery("#divBuyContentCart").slideToggle();
        jQuery("#divBuyContentCartButton").show();
    }
}

function PopupCenter(url, title, w, h) {

    //To call this function, add the code below on the onclick event of a button:
    //PopupCenter('https://storedomain/checkout_one.asp', '3dCheckout', 500, 775,true);

    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'menubar=0,fullscreen=0,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left, true);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

window.addEventListener('message', function (evt) {
    if (evt.data == "orderok")
        removeBuyContentCart(true);
});

function removeBuyContentCart(clearCookies) {	
	jQuery("#divBuyContentCart").remove();
	jQuery("#divBuyContentCartButton").remove();
	if (clearCookies) {
	    setCookie('orderFromWidget', "", -1);
	    setCookie('affiliate', "", -1);
	    setCookie('buywidgetincompleteorderid', "", -1);
	    setCookie('hk', "", -1);
	}
}

function OpenCheckout() {
    var qryStr = '?module=checkout&hk=' + getCookie('hk') + '&incompleteorderid=' + getCookie('buywidgetincompleteorderid') + '&orderFromWidget=' + getCookie('orderFromWidget') + '&affiliate=' + getCookie('affiliate');
    PopupCenter(bw_domain + 'frontapi.asp' + qryStr, '3dCheckout', 500, 775, true);
}

function getWidgetOptions(intCatalogID)
{
    var JsonOptions = [];

    jQuery('[data-content-id="' + intCatalogID + '"] :checked').each(function(){
        
        if(jQuery(this).is("option")){
            JsonOptions.push({
                "name": jQuery(this).parent().attr('name'),
                "id": jQuery(this).val()
            });
        }
        else{
            JsonOptions.push({
                "name": jQuery(this).attr('name'),
                "id": jQuery(this).val()
            });
        }
    
    });

    return JsonOptions;
}

function add_to_cart(intCatalogID, strSKU, intCategoryID, intPrice, intQuantity, intAffiliateID) {
    var JsonOptions = getWidgetOptions(intCatalogID);
    var formData = new FormData();
    formData.append('item_id', intCatalogID);
    formData.append('itemid', strSKU);
    formData.append('category_id', intCategoryID);
    formData.append('std_price', intPrice);
    formData.append('qty-0', intQuantity);
    for (var i = 0; i < JsonOptions.length; i++)
        formData.append(JsonOptions[i].name, JsonOptions[i].id);
    
    var qryStr = '?module=addcart&ajaxadd=1&widget=1&hk=' + getCookie('hk') + '&incompleteorderid=' + getCookie('buywidgetincompleteorderid') + '&orderFromWidget=' + getCookie('orderFromWidget') + '&affiliate=' + intAffiliateID;
    jQuery.ajax({
    	url: bw_domain + 'frontapi.asp' + qryStr,
        dataType: 'json',
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            if (data.AddedToCart == 1) {
                if (data.orderFromWidget != undefined) {
                    setCookie('orderFromWidget', data.orderFromWidget, 7);
                }
                if (data.hk != undefined) {
                	setCookie('hk', data.hk, 7);
                }
                else {
                	setCookie('hk', "0", 7);
                }
                if (data.affiliate != undefined) {
                    setCookie('affiliate', data.affiliate, 7);
                }
                if (data.incompleteorderid != undefined) {
                    setCookie('buywidgetincompleteorderid', data.incompleteorderid, 7);
                }

                if (jQuery("#divBuyContentCart").css("display") == 'none' || jQuery("#divBuyContentCart").length == 0) {
                    ShowViewCart();
                }
                else {
                    checkBuyContentCart();
                }
            }
            else // error
            {
                var strError = null;
                if (data.ErrorMessage.indexOf("!--") > 0 && data.errorurl != null && data.errorurl != undefined && data.errorurl.indexOf('error.asp') >= 0)
                    strError = getErrorMsgFromUrl(data.errorurl);
                if (strError == null)
                    strError = data.ErrorMessage;
                strError = strError.replace(/\r?\n|\r|\n/g, '');
                strError = strError.replace(/<!--[^>]*-->/g, "");        // remove html comments or blocks
                strError = strError.replace(/<[^>]*>/g, "");             // remove html syntax
                strError = strError.replace(/\[(.*?)\]/g, "");           // remove variables
                strError = data.ErrorName + '\n' + strError;
                alert(strError);
            }
        },
        error: function () {
            alert('An error has occurred adding item to cart.');
        }
    });
}

function getErrorMsgFromUrl(strErrorUrl)
{
    var errorMsg = null;
    jQuery.ajax({
        url: bw_domain + strErrorUrl + '&ajax=1',
        dataType: 'json',
        type: 'GET',
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            errorMsg = data.message;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return errorMsg;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function widgetAddLoadEvent(func) {
    //Add event to the onload stack
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

function initWidget() {
    if (inAdmin >= 0)
        return;
    if (window.jQuery) {
        renderBuyWidget();
        return;
    }
    if (widget3dLoadAttempts > 5) {
        console.log("3d product widget not loaded - required jquery library is missing on the page");
        return;
    }   
    widget3dLoadAttempts++;
    window.setTimeout(initWidget, 1000);
}

widgetAddLoadEvent(initWidget);