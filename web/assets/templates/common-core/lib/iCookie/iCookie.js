$.fn.iCookie = function (options) {
    // iCookie default settings
    var defaults = {
        container: 'body',
        theme: 'default',
        position: 'bottom',
        background: '#000',
        text: 'We use cookies to improve your online experience. If you continue on this website, you will be providing your consent to our use of cookies.',
        textColor: '#FFF',
        buttonText: 'OK',
        buttonColor: '#FFF',
        buttonBgColor: '#000',
        showButton: true,
        showCloseButton: false,
        html: false,
        distance: 20,
        moreButtonText: 'more information',
        moreButtonLink: '#',
        moreButtonColor: '#b2ee31',
        backgroundOpacity: 0.8,
        borderRadius: 4,
        fontSize: 14,
        cookieDays: 365
    };

    var settings = $.extend(defaults, options);

    var helper = {
        getCookie: function (name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },
        setCookie: function (name, value, days) {
            var d = new Date;
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        hexToRgbA: function (hex, opacity) {
            var c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
            }
            throw new Error('Bad Hex');
        },
        isMobileBrowser: function () {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        },
        decodeHtml:function(value) {
            var span = $("span#html-decoder");
            if (span.length == 0) {
                span = $("<span id='html-decoder'/>").appendTo(document.body).hide();
            }
            return span.html(value).text();
        }
    }

    if (helper.getCookie("iCookie") == "true") {
        return false;
    }

    //Create Cookie Container;
    var wrapper = $("<div />").addClass("iCookie iCookie-" + settings.theme);

    var css = {};
    css.background = helper.hexToRgbA(settings.background, settings.backgroundOpacity);
    css.fontSize = settings.fontSize;
    css.color = settings.textColor;

    switch (settings.position) {
        case "bottom-left":
            css.left = css.bottom = settings.distance;
            break;
        case "top-left":
            css.left = css.top = settings.distance;
            break;
        case "top-right":
            css.right = css.top = settings.distance;
            break;
        case "bottom-right":
            css.right = css.bottom = settings.distance;
            break;
        case "bottom":
            css.bottom = 0;
            settings.borderRadius = 0;
            wrapper.addClass("iCookie-b");
            break;
        case "top":
            css.top = 0;
            settings.borderRadius = 0;
            wrapper.addClass("iCookie-t");
            break;
        case "bottom-center":
            css.bottom = settings.distance;
            wrapper.addClass("iCookie-bc");
            break;
        case "top-center":
            css.top = settings.distance;
            wrapper.addClass("iCookie-tc");
            break;
        default:
            css.left = css.bottom = settings.distance;
            break;
    }
    wrapper.css(css);
    wrapper.css("border-radius", settings.borderRadius);


    var html = "<span class='iCookie-text'>";

    if (settings.html) {
        html += settings.text;
    } else {
        html += helper.decodeHtml(settings.text);
    }

    if (settings.moreButtonLink != "#") {
        html += " <a href='" + settings.moreButtonLink + "' target='_blank' class='iCookie-more-button'>" + settings.moreButtonText + "</a>";
    }
    html += "</span>";

    if (settings.showButton) {
        html += " <a href='javascript:void(0)' class='iCookie-button'>" + settings.buttonText + "</a>";
    }

    if (settings.showCloseButton) {
        html += '<a class="iCookie-close" href="javascript:void(0)"><svg height="64" version="1.1" width="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><desc>Created with Snap</desc><defs></defs><g><path fill="none" stroke="#fff" stroke-width="5" d="m 32,4.962098 0,53.893986" transform="matrix(0.7071,0.7071,-0.7071,0.7071,32,-13.2548)"></path><path fill="none" stroke="#fff" stroke-width="5" d="m 5.1127494,31.909091 53.8342436,0" transform="matrix(0.7071,0.7071,-0.7071,0.7071,32,-13.2548)"></path></g></svg></a>';
    }

    wrapper.css(css).appendTo(settings.container).html(html);



    //More button properties
    if (settings.moreButtonLink !== "#") {
        wrapper.find(".iCookie-more-button").css("color", settings.moreButtonColor);
    }

    if (settings.showButton) {
        wrapper.find(".iCookie-button").css("color", settings.buttonColor).css("background", settings.buttonBgColor);
    }

    if (settings.showCloseButton) {
        wrapper.find(".iCookie-close svg path").css("stroke", settings.textColor);
    }

    //Actions
    wrapper.find(".iCookie-button,.iCookie-close").on("click", function () {
        helper.setCookie("iCookie", "true", settings.cookieDays);
        wrapper.remove();
    });

    // For Responsive
    var setResponsive = function () {
        if (helper.isMobileBrowser() || $(window).width() <= 767) {
            if (settings.position.indexOf("bottom") > -1) {
                wrapper.addClass("iCookie-responsive-bottom");
            }
            if (settings.position.indexOf("top") > -1) {
                wrapper.addClass("iCookie-responsive-top");
            }
        } else {
            wrapper.removeClass("iCookie-responsive-bottom").removeClass("iCookie-responsive-top");
        }
    }

    setResponsive();
    $(window).resize(function () {
        setResponsive();
    });

};