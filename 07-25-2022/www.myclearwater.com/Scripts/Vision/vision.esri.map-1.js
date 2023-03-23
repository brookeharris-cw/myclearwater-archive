
function EsriMap() {
}

var ESRIGeolocationError = function (code) {
    code = code | ESRIGeolocationError.UNKNOWN_ERROR;
    this.code = code;
    switch (code) {
        case ESRIGeolocationError.PERMISSION_DENIED:
            this.message = "User denied the request for Geolocation.";
            break;
        case ESRIGeolocationError.POSITION_UNAVAILABLE:
            this.message = "Location information is unavailable.";
            break;
        case ESRIGeolocationError.TIMEOUT:
            this.message = "The request to get user location timed out.";
            break;
        case ESRIGeolocationError.BROWSER_NOT_SUPPORT:
            this.message = "Browser does not support Geolocation.";
            break;
        case ESRIGeolocationError.GOOGLE_GEAR_ERROR:
        case ESRIGeolocationError.GEOCODER_ERROR:
        case ESRIGeolocationError.UNKNOWN_ERROR:
        default:
            this.message = "An unknown error occurred.";
            break;
    };
};
ESRIGeolocationError.UNKNOWN_ERROR = 0;
ESRIGeolocationError.PERMISSION_DENIED = 1;
ESRIGeolocationError.POSITION_UNAVAILABLE = 2;
ESRIGeolocationError.TIMEOUT = 3;
ESRIGeolocationError.GOOGLE_GEAR_ERROR = 4;
ESRIGeolocationError.BROWSER_NOT_SUPPORT = 5;
ESRIGeolocationError.GEOCODER_ERROR = 6;

EsriMap.prototype = {
    _options: {        
    },
    setupOptions: function (options) {
        $.extend(this._options, options);
        return this;
    },
    getGeolocation: function (address, successFunc, errorFunc) {
        var url = this._options.url;
        var esriGeocode = {
            "async": false,
            "crossDomain": true,
            "url": url,
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json"
            },
            "data": {
                "address": address
            }, 
            success: successFunc,
            error: errorFunc
        }
        return $.ajax(esriGeocode);        
    },
    autoGeolocation: function (updateEle, throwErrorWhenTimeout) {
        if (typeof throwErrorWhenTimeout == "undefined")
            throwErrorWhenTimeout = true;
        var $this = this;        
        // Try W3C Geolocation (Preferred) - Begin
        if (navigator.geolocation) {                        
            navigator.geolocation.getCurrentPosition(function (position) {
                //console.log(updateEle);
                if (updateEle) {                    
                    updateEle.val("(" + position.coords.longitude + "," + position.coords.latitude + ")");
                }                
                return position;
            }, function (error) {
                //console.log(error);
                throw new Error(new ESRIGeolocationError(error.code));
            });            
        }        
        // Try W3C Geolocation (Preferred) - End
    }
};

; (function ($) {
    var _esriMap = new EsriMap();
    $.extend({
        esriMap: function (options) {
            return _esriMap.setupOptions(options);
        }
    });
})(jQuery);