// MouseWheel  (adds support for document zoom/scrolling)
// Pub / Sub (provides support for events)
// $get ( asp.net ajax document.getElementById shortcut)
// query string ( parses locatiion object for query string parameters)
// string formatter (python style string formatting, see http://code.google.com/p/jquery-utils/wiki/StringFormat#Basic_usage for details)
// json conversion (adds $.toJSON function)
// detect chrome

/*! Copyright (C) 2017 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ('onwheel' in document || document.documentMode >= 9) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function () {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function (elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function (elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.on('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function (fn) {
            return this.off('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
        if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
        if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
        if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) { delta = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            // Divide all the things by 40!
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

/*************************************
 * Events *
 --------------------------------------------------------
 On Visible Page Changed:
    PageChange : { newPage : int }
 On Displayed Annotations Changed
    AnnChange  : { AnnInnerHTML : string , Attachments : AttObj[] , StickyNotes : SNObj[] }
 On Zoom Level Changed
    ZoomChange : { newZoom : string ((hwp)int) }
 On Show Annotations State Changed
    ShowAnnChange : { newShowAnn : boolean }
 On Show Text/Image State Changed
    ShowTextChange : { newShowText : boolean }
 On Scroll Mode Change:
    ScrollModeChange : { newMode : string ('PAN', 'ZOOM') }

 // Control initialization messages    
 On Document Initialize (properties)
    DocInitProps : { pages : int, hasAnnotations : boolean, hasImages : boolean , hasVolRead : boolean }
    
 On Full Screen Toggle:
    FullScreenToggle : {}

 // Timeout detection
 Connection Error:
    ConnectionError : { reason : string }
 Connection Success:
    ConnectionSuccess : {}

 // Status text next to the full screen button    
 DisplayDimChange:
    DisplayDimChange : { widthString : string, heightString : string, hasImage : boolean, separator : string }

 // DocViewM     
 SetMaxZoom : 
    SetMaxZoom : { maxZoom : int }
    
 // Metadata-Thumbnails-Annotations
 TabChange : 
    TabChange : { tab : string }

 // Adjust z-index on dlg open/close    
 PDFDialogOpen : 
    PDFDialogOpen : {}
    
 PDFDialogClose :
    PDFDialogClose : {}
    
 **************************************/

// Pub Sub implementation
jQuery.subscribe = function (topic, scope, fnName) {
    var curryArgs = Array.prototype.slice.call(arguments, 3);
    $(window).on(topic, function () {
        var normalizedArgs = Array.prototype.slice.call(arguments, 1);
        scope[fnName].apply(topic, curryArgs.concat(normalizedArgs));
    });
    return jQuery;
};

jQuery.publish = function (topic, id, data) {
    if (typeof (data) == 'object') { data.topic = topic; }
    if (typeof (id) != 'string' || !id) { /* console.log('Trying to publish event without src id. Discarding'); */ return jQuery; }
    $(window).trigger(topic, Array.prototype.slice.call(arguments, 1));
    return jQuery;
};

// ASP.NET AJAX style shortcut to document.getElementById
$get = function (id) { return document.getElementById(id); };

// QueryString Engine v1.0.1
//By James Campbell
(function ($) {
    $.getQueryString = function (options) {
        defaults = { defaultvalue: "null" };
        options = $.extend(defaults, options);
        qs = location.search.substring(1, location.search.length);
        if (qs.length == 0) return options.defaultvalue;
        qs = qs.replace(/\+/g, ' ');
        var args = qs.split('&');
        for (var i = 0; i < args.length; i++) {
            var value;
            var pair = args[i].split('=');
            var name = unescape(pair[0]);

            if (pair.length == 2) {
                value = unescape(pair[1]);
            }
            else {
                value = name;
            }
            if (name == options.id || i == options.id - 1) {
                return value;
            }
        }
        return options.defaultvalue;
    };
})(jQuery);

// String format
/*
  jQuery strings - 0.1a
  http://code.google.com/p/jquery-utils/
 
  (c) Maxime Haineault <haineault@gmail.com>
  http://haineault.com  

  MIT License (http://www.opensource.org/licenses/mit-license.php)

  Implementation of Python3K advanced string formatting
  http://www.python.org/dev/peps/pep-3101/

  Documentation: http://code.google.com/p/jquery-utils/wiki/StringFormat
 
*/
(function ($) {
    var conversion = {
        // tries to translate any objects type into string gracefully
        __repr: function (i) {
            switch (this.__getType(i)) {
                case 'array': case 'date': case 'number':
                    return i.toString();
                case 'object':
                    var o = [];
                    for (x = 0; x < i.length; i++) { o.push(i + ': ' + this.__repr(i[x])); }
                    return o.join(', ');
                case 'string':
                    return i;
                default:
                    return i;
            }
        },
        // like typeof but less vague
        __getType: function (i) {
            if (!i || !i.constructor) { return typeof (i); }
            var match = i.constructor.toString().match(/Array|Number|String|Object|Date/);
            return match && match[0].toLowerCase() || typeof (i);
        },
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/string/pad [v1.0]
        __pad: function (str, l, s, t) {
            return s || (s = " "), (l -= str.length) > 0 ? (s = new Array(Math.ceil(l / s.length)
                + 1).join(s)).substr(0, t = !t ? l : t == 1 ? 0 : Math.ceil(l / 2))
                + str + s.substr(0, l - t) : str;
        },
        __getInput: function (arg, args) {
            var key = arg.getKey();
            switch (this.__getType(args)) {
                case 'object':
                    if (typeof (args[key]) != 'undefined') {
                        if (conversion.__getType(args[key]) == 'array') {
                            return arg.getFormat().match(/\.\*/) && args[key][1] || args[key];
                        }
                        return args[key];
                    }
                    else {
                        // TODO: try by numerical index
                    }
                    break;
                case 'array':
                    key = parseInt(key, 10);
                    if (arg.getFormat().match(/\.\*/) && typeof (args[key + 1]) != 'undefined') return args[key + 1];
                    else if (typeof (args[key]) != 'undefined') return args[key];
                    else return key;
                    break;
            }
            return '{' + key + '}';
        },
        __formatToken: function (token, args) {
            var arg = new Argument(token, args);
            return conversion[arg.getFormat().slice(-1)](this.__getInput(arg, args), arg);
        },

        // Signed integer decimal.
        d: function (input, arg) {
            var o = parseInt(input, 10); // enforce base 10
            var p = arg.getPaddingLength();
            if (p) return this.__pad(o.toString(), p, arg.getPaddingString(), 0);
            else return o;
        },
        // Signed integer decimal.
        i: function (input, args) {
            return this.d(input, args);
        },
        // Unsigned octal
        o: function (input, arg) {
            var o = input.toString(8);
            if (arg.isAlternate()) o = this.__pad(o, o.length + 1, '0', 0);
            return this.__pad(o, arg.getPaddingLength(), arg.getPaddingString(), 0);
        },
        // Unsigned decimal
        u: function (input, args) {
            return Math.abs(this.d(input, args));
        },
        // Unsigned hexadecimal (lowercase)
        x: function (input, arg) {
            var o = parseInt(input, 10).toString(16);
            o = this.__pad(o, arg.getPaddingLength(), arg.getPaddingString(), 0);
            return (arg.isAlternate()) ? '0x' + o : o;
        },
        // Unsigned hexadecimal (uppercase)
        X: function (input, arg) {
            return this.x(input, arg).toUpperCase();
        },
        // Floating point exponential format (lowercase)
        e: function (input, arg) {
            return parseFloat(input, 10).toExponential(arg.getPrecision());
        },
        // Floating point exponential format (uppercase)
        E: function (input, arg) {
            return this.e(input, arg).toUpperCase();
        },
        // Floating point decimal format
        f: function (input, arg) {
            return this.__pad(parseFloat(input, 10).toFixed(arg.getPrecision()), arg.getPaddingLength(), arg.getPaddingString(), 0);
        },
        // Floating point decimal format (alias)
        F: function (input, args) {
            return this.f(input, args);
        },
        // Floating point format. Uses exponential format if exponent is greater than -4 or less than precision, decimal format otherwise
        g: function (input, arg) {
            var o = parseFloat(input, 10);
            return (o.toString().length > 6) ? Math.round(o.toExponential(arg.getPrecision())) : o;
        },
        // Floating point format. Uses exponential format if exponent is greater than -4 or less than precision, decimal format otherwise
        G: function (input, args) {
            return this.g(input, args);
        },
        // Single character (accepts integer or single character string).      
        c: function (input, args) {
            var match = input.match(/\w|\d/);
            return match && match[0] || '';
        },
        // String (converts any JavaScript object to anotated format)
        r: function (input, args) {
            return this.__repr(input);
        },
        // String (converts any JavaScript object using object.toString())
        s: function (input, args) {
            return input.toString && input.toString() || '' + input;
        }
    };

    var Argument = function (arg, args) {
        this.__arg = arg;
        this.__args = args;
        this.__max_precision = parseFloat('1.' + (new Array(32)).join('1'), 10).toString().length - 3;
        this.__def_precision = 6;
        this.getString = function () {
            return this.__arg;
        };
        this.getKey = function () {
            return this.__arg.split(':')[0];
        };
        this.getFormat = function () {
            var match = this.getString().split(':');
            return (match && match[1]) ? match[1] : 's';
        };
        this.getPrecision = function () {
            var match = this.getFormat().match(/\.(\d+|\*)/g);
            if (!match) return this.__def_precision;
            else {
                match = match[0].slice(1);
                if (match != '*') return parseInt(match, 10);
                else if (conversion.__getType(this.__args) == 'array') {
                    return this.__args[1] && this.__args[0] || this.__def_precision;
                }
                else if (conversion.__getType(this.__args) == 'object') {
                    return this.__args[this.getKey()] && this.__args[this.getKey()][0] || this.__def_precision;
                }
                else return this.__def_precision;
            }
        };
        this.getPaddingLength = function () {
            if (this.isAlternate()) {
                var match = this.getString().match(/0?#0?(\d+)/);
                if (match && match[1]) return parseInt(match[1], 10);
            }
            var match = this.getString().match(/(0|\.)(\d+|\*)/g)
            return match && parseInt(match[0].slice(1), 10) || 0;
        };
        this.getPaddingString = function () {
            var o = '';
            if (this.isAlternate()) o = ' ';
            // 0 take precedence on alternate format
            if (this.getFormat().match(/#0|0#|^0|\.\d+/)) o = '0';
            return o;
        };
        this.getFlags = function () {
            var match = this.getString().match(/^(0|\#|\-|\+|\s)+/);
            return match && match[0].split('') || [];
        };
        this.isAlternate = function () {
            return !!this.getFormat().match(/^0?#/);
        };
    };

    var arguments2Array = function (args, shift) {
        var shift = shift || 0;
        var o = [];
        for (l = args.length, x = shift - 1; x < l; x++) o.push(args[x]);
        return o;
    }


    var format = function (str, args) {
        var end = 0;
        var start = 0;
        var match = false;
        var buffer = [];
        var token = '';
        var args = (typeof (arguments[1]) != 'object') ? arguments2Array(arguments, 2) : args || [];
        var tmp = str.split('');
        for (start = 0; start < tmp.length; start++) {
            if (tmp[start] == '{' && tmp[start + 1] != '{') {
                end = str.indexOf('}', start);
                token = tmp.slice(start + 1, end).join('');
                buffer.push(conversion.__formatToken(token, args));
            }
            else if (start > end || buffer.length < 1) buffer.push(tmp[start]);
        }
        return (buffer.length > 1) ? buffer.join('') : buffer[0];
    };

    var calc = function (str, args) {
        return eval(format(str, args));
    };

    $.extend({
        // Format/sprintf functions
        format: format,
        calc: calc,
        strConversion: conversion,
        repeat: function (s, n) { return new Array(n + 1).join(s); },
        UTF8encode: function (s) { return unescape(encodeURIComponent(s)); },
        UTF8decode: function (s) { return decodeURIComponent(escape(s)); }
    });

})(jQuery);

/*
 * jQuery JSON Plugin
 * version: 1.0 (2008-04-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris technically wrote this plugin, but it is based somewhat
 * on the JSON.org website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.  I really just cleaned it up.
 *
 * It is also based heavily on MochiKit's serializeJSON, which is 
 * copywrited 2005 by Bob Ippolito.
 */

(function ($) {
    function toIntegersAtLease(n)
        // Format integers to have at least two digits.
    {
        return n < 10 ? '0' + n : n;
    }

    Date.prototype.toJSON = function (date)
        // Yes, it polutes the Date namespace, but we'll allow it here, as
        // it's damned usefull.
    {
        return "\"\\/Date(" + this.getTime() + ")\\/\"";
    };

    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };

    $.quoteString = function (string)
        // Places quotes around a string, inteligently.
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
    {
        if (escapeable.test(string)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

    $.toJSON = function (o, compact) {
        var type = typeof (o);

        if (type == "undefined")
            return "undefined";
        else if (type == "number" || type == "boolean")
            return o + "";
        else if (o === null)
            return "null";

        // Is it a string?
        if (type == "string") {
            return $.quoteString(o);
        }

        // Does it have a .toJSON function?
        if (type == "object" && typeof o.toJSON == "function")
            return o.toJSON(compact);

        // Is it an array?
        if (type != "function" && typeof (o.length) == "number") {
            var ret = [];
            for (var i = 0; i < o.length; i++) {
                ret.push($.toJSON(o[i], compact));
            }
            if (compact)
                return "[" + ret.join(",") + "]";
            else
                return "[" + ret.join(", ") + "]";
        }

        // If it's a function, we have to warn somebody!
        if (type == "function") {
            throw new TypeError("Unable to convert object of type 'function' to json.");
        }

        // It's probably an object, then.
        var ret = [];
        for (var k in o) {
            var name;
            type = typeof (k);

            if (type == "number")
                name = '"' + k + '"';
            else if (type == "string")
                name = $.quoteString(k);
            else
                continue;  //skip non-string or number keys

            var val = $.toJSON(o[k], compact);
            if (typeof (val) != "string") {
                // skip non-serializable values
                continue;
            }

            if (compact)
                ret.push(name + ":" + val);
            else
                ret.push(name + ": " + val);
        }
        return "{" + ret.join(", ") + "}";
    };

    $.compactJSON = function (o) {
        return $.toJSON(o, true);
    };
})(jQuery);

// https://github.com/othree/jquery.rtl-scroll-type
/*MIT License */
/*global jQuery */
(function ($) {
    'use strict';
    var definer = $('<div style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>').appendTo('body')[0],
    type = 'reverse';

    if ($(definer).css("direction") == "rtl") {
        if (definer.scrollLeft > 0) {
            type = 'default';
        } else {
            definer.scrollLeft = 1;
            if (definer.scrollLeft === 0) {
                type = 'negative';
            }
        }
    }
    else
        type = null;

    $(definer).remove();
    $.support.rtlScrollType = type;

}(jQuery));

// http://stackoverflow.com/questions/24276619/better-way-to-get-the-viewport-of-a-scrollable-div-in-rtl-mode/24394376#24394376
// SCR 123839
(function ($) {
    // chrome implementation, 0 -> scrollMax
    $.fn.scrollLeftDefault = function (i) {

        if (i === undefined) {
            var value = this.scrollLeft.apply(this, arguments);

            switch (jQuery.support.rtlScrollType) {
                case "negative":
                    return value + this[0].scrollWidth - this[0].clientWidth;
                case "reverse":
                    return this[0].scrollWidth - this[0].clientWidth - value;
            }
            return value;
        }
        else {
            switch (jQuery.support.rtlScrollType) {
                case "negative":
                    i = i - (this[0].scrollWidth - this[0].clientWidth);
                    break;
                case "reverse":
                    i = this[0].scrollWidth - this[0].clientWidth - i;
                    break;
            }

            return this.scrollLeft.apply(this, [i]);
        }
    };

    // IE implementation, scrollMax -> 0
    $.fn.scrollLeftReverse = function (i) {

        if (i === undefined) {
            var value = this.scrollLeft.apply(this, arguments);

            switch (jQuery.support.rtlScrollType) {
                case "negative":
                    return -value;
                case "default":
                    return this[0].scrollWidth - this[0].clientWidth - value;
            }

            return value;
        }
        else {
            switch (jQuery.support.rtlScrollType) {
                case "negative":
                    i = -i;
                    break;
                case "default":
                    i = this[0].scrollWidth - this[0].clientWidth - i;
                    break;
            }

            return this.scrollLeft.apply(this, [i]);
        }
    };

    // FF implementation, -scrollMax -> 0
    $.fn.scrollLeftNegative = function (i) {

        if (i === undefined) {
            var value = this.scrollLeft.apply(this, arguments);

            switch (jQuery.support.rtlScrollType) {
                case "reverse":
                    return -value;
                case "default":
                    return this[0].scrollWidth - this[0].clientWidth + value;
            }

            return value;
        }
        else {
            switch (jQuery.support.rtlScrollType) {
                case "reverse":
                    i = -i;
                    break;
                case "default":
                    i = this[0].scrollWidth - this[0].clientWidth + i;
                    break;
            }

            return this.scrollLeft.apply(this, [i]);
        }
    };
}(jQuery));