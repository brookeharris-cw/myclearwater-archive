jQuery.extend({
    exists: function (element) {
        if (element == undefined || element == null) {
            return false;
        } else if ($.isEmptyObject(element)) {
            return false;
        } else {
            return ($(element).length > 0);
        }
    },

    ltrim: function (str) {
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) != " ") {
                break;
            }
        }

        str = str.substring(i, str.length);
        return str;
    },

    rtrim: function (str) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (str.charAt(i) != " ") {
                break;
            }
        }

        str = str.substring(0, i + 1);
        return str;
    },

    // More details: http://docs.jquery.com/Utilities/jQuery.browser
    uaMatch: function (ua) {
        ua = ua.toLowerCase();

        var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
            [];

        return { browser: match[1] || "", version: match[2] || "0" };
    },

    detectedBrowser: {}
});

browserMatch = jQuery.uaMatch(navigator.userAgent);

if (browserMatch.browser) {
    jQuery.detectedBrowser[browserMatch.browser] = true;
    jQuery.detectedBrowser.version = browserMatch.version;
}