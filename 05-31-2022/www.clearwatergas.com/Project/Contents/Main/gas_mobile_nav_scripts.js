/**
  *
  * jPanelMenu 1.3.0 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */
(function (e) {
    e.jPanelMenu = function (t) {
        if (typeof t == "undefined" || t == null) t = {}; var n = {
            options: e.extend({ menu: "#menu", trigger: ".menu-trigger", excludedPanelContent: "style, script", direction: "left", openPosition: "250px", animated: !0, closeOnContentClick: !0, keyboardShortcuts: [{ code: 27, open: !1, close: !0 }, { code: 37, open: !1, close: !0 }, { code: 39, open: !0, close: !0 }, { code: 77, open: !0, close: !0 }], duration: 150, openDuration: t.duration || 150, closeDuration: t.duration || 150, easing: "ease-in-out", openEasing: t.easing || "ease-in-out", closeEasing: t.easing || "ease-in-out", before: function () { }, beforeOpen: function () { }, beforeClose: function () { }, after: function () { }, afterOpen: function () { }, afterClose: function () { }, beforeOn: function () { }, afterOn: function () { }, beforeOff: function () { }, afterOff: function () { } }, t), settings: { transitionsSupported: "WebkitTransition" in document.body.style || "MozTransition" in document.body.style || "msTransition" in document.body.style || "OTransition" in document.body.style || "Transition" in document.body.style, shiftFixedChildren: !1, panelPosition: "relative", positionUnits: "px" }, menu: "#jPanelMenu-menu", panel: ".jPanelMenu-panel", fixedChildren: [], timeouts: {}, clearTimeouts: function () { clearTimeout(n.timeouts.open); clearTimeout(n.timeouts.afterOpen); clearTimeout(n.timeouts.afterClose) }, setPositionUnits: function () { var e = !1, t = ["%", "px", "em"]; for (unitID in t) { var r = t[unitID]; if (n.options.openPosition.toString().substr(-r.length) == r) { e = !0; n.settings.positionUnits = r } } e || (n.options.openPosition = parseInt(n.options.openPosition) + n.settings.positionUnits) }, checkFixedChildren: function () { n.disableTransitions(); var t = { position: e(n.panel).css("position") }; t[n.options.direction] = e(n.panel).css(n.options.direction) == "auto" ? 0 : e(n.panel).css(n.options.direction); e(n.panel).find("> *").each(function () { e(this).css("position") == "fixed" && e(this).css(n.options.direction) == "auto" && n.fixedChildren.push(this) }); if (n.fixedChildren.length > 0) { var r = { position: "relative" }; r[n.options.direction] = "1px"; n.setPanelStyle(r); parseInt(e(n.fixedChildren[0]).offset().left) == 0 && (n.settings.shiftFixedChildren = !0) } n.setPanelStyle(t) }, setjPanelMenuStyles: function () { var t = "#fff", r = e("html").css("background-color"), i = e("body").css("background-color"); i != "transparent" && i != "rgba(0, 0, 0, 0)" ? t = i : r != "transparent" && r != "rgba(0, 0, 0, 0)" ? t = r : t = "#fff"; e("#jPanelMenu-style-master").length == 0 && e("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:none;position:fixed;top:0;' + n.options.direction + ":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;" + n.options.direction + ":0;top:0;z-index:2;width:100%;min-height:100%;background:" + t + "}</style>") }, setMenuState: function (t) { var n = t ? "open" : "closed"; e("body").attr("data-menu-position", n) }, getMenuState: function () { return e("body").attr("data-menu-position") }, menuIsOpen: function () { return n.getMenuState() == "open" ? !0 : !1 }, setMenuStyle: function (t) { e(n.menu).css(t) }, setPanelStyle: function (t) { e(n.panel).css(t) }, showMenu: function () { n.setMenuStyle({ display: "block" }); n.setMenuStyle({ "z-index": "1" }) }, hideMenu: function () { n.setMenuStyle({ "z-index": "-1" }); n.setMenuStyle({ display: "none" }) }, enableTransitions: function (t, r) { var i = t / 1e3, s = n.getCSSEasingFunction(r); n.disableTransitions(); e("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all ' + i + "s " + s + "; -moz-transition: all " + i + "s " + s + "; -o-transition: all " + i + "s " + s + "; transition: all " + i + "s " + s + ";}</style>") }, disableTransitions: function () { e("#jPanelMenu-style-transitions").remove() }, enableFixedTransitions: function (t, r, i, s) { var o = i / 1e3, u = n.getCSSEasingFunction(s); n.disableFixedTransitions(r); e("body").append('<style id="jPanelMenu-style-fixed-' + r + '">' + t + "{-webkit-transition: all " + o + "s " + u + "; -moz-transition: all " + o + "s " + u + "; -o-transition: all " + o + "s " + u + "; transition: all " + o + "s " + u + ";}</style>") }, disableFixedTransitions: function (t) { e("#jPanelMenu-style-fixed-" + t).remove() }, getCSSEasingFunction: function (e) { switch (e) { case "linear": return e; case "ease": return e; case "ease-in": return e; case "ease-out": return e; case "ease-in-out": return e; default: return "ease-in-out" } }, getJSEasingFunction: function (e) { switch (e) { case "linear": return e; default: return "swing" } }, openMenu: function (t) { if (typeof t == "undefined" || t == null) t = n.options.animated; n.clearTimeouts(); n.options.before(); n.options.beforeOpen(); n.setMenuState(!0); n.setPanelStyle({ position: "relative" }); n.showMenu(); var r = { none: t ? !1 : !0, transitions: t && n.settings.transitionsSupported ? !0 : !1 }; if (r.transitions || r.none) { r.none && n.disableTransitions(); r.transitions && n.enableTransitions(n.options.openDuration, n.options.openEasing); var i = {}; i[n.options.direction] = n.options.openPosition; n.setPanelStyle(i); n.settings.shiftFixedChildren && e(n.fixedChildren).each(function () { var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"), i = t.replace(" ", "."), t = t.replace(" ", "-"); r.none && n.disableFixedTransitions(t); r.transitions && n.enableFixedTransitions(i, t, n.options.openDuration, n.options.openEasing); var s = {}; s[n.options.direction] = n.options.openPosition; e(this).css(s) }); n.timeouts.afterOpen = setTimeout(function () { n.disableTransitions(); n.settings.shiftFixedChildren && e(n.fixedChildren).each(function () { var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"), t = t.replace(" ", "-"); n.disableFixedTransitions(t) }); n.options.after(); n.options.afterOpen(); n.initiateContentClickListeners() }, n.options.openDuration) } else { var s = n.getJSEasingFunction(n.options.openEasing), o = {}; o[n.options.direction] = n.options.openPosition; e(n.panel).stop().animate(o, n.options.openDuration, s, function () { n.options.after(); n.options.afterOpen(); n.initiateContentClickListeners() }); n.settings.shiftFixedChildren && e(n.fixedChildren).each(function () { var t = {}; t[n.options.direction] = n.options.openPosition; e(this).stop().animate(t, n.options.openDuration, s) }) } }, closeMenu: function (t) { if (typeof t == "undefined" || t == null) t = n.options.animated; n.clearTimeouts(); n.options.before(); n.options.beforeClose(); n.setMenuState(!1); var r = { none: t ? !1 : !0, transitions: t && n.settings.transitionsSupported ? !0 : !1 }; if (r.transitions || r.none) { r.none && n.disableTransitions(); r.transitions && n.enableTransitions(n.options.closeDuration, n.options.closeEasing); var i = {}; i[n.options.direction] = 0 + n.settings.positionUnits; n.setPanelStyle(i); n.settings.shiftFixedChildren && e(n.fixedChildren).each(function () { var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"), i = t.replace(" ", "."), t = t.replace(" ", "-"); r.none && n.disableFixedTransitions(t); r.transitions && n.enableFixedTransitions(i, t, n.options.closeDuration, n.options.closeEasing); var s = {}; s[n.options.direction] = 0 + n.settings.positionUnits; e(this).css(s) }); n.timeouts.afterClose = setTimeout(function () { n.setPanelStyle({ position: n.settings.panelPosition }); n.disableTransitions(); n.settings.shiftFixedChildren && e(n.fixedChildren).each(function () { var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"), t = t.replace(" ", "-"); n.disableFixedTransitions(t) }); n.hideMenu(); n.options.after(); n.options.afterClose(); n.destroyContentClickListeners() }, n.options.closeDuration) } else { var s = n.getJSEasingFunction(n.options.closeEasing), o = {}; o[n.options.direction] = 0 + n.settings.positionUnits; e(n.panel).stop().animate(o, n.options.closeDuration, s, function () { n.setPanelStyle({ position: n.settings.panelPosition }); n.hideMenu(); n.options.after(); n.options.afterClose(); n.destroyContentClickListeners() }); n.settings.shiftFixedChildren && e(n.fixedChildren).each(function () { var t = {}; t[n.options.direction] = 0 + n.settings.positionUnits; e(this).stop().animate(t, n.options.closeDuration, s) }) } }, triggerMenu: function (e) { n.menuIsOpen() ? n.closeMenu(e) : n.openMenu(e) }, initiateClickListeners: function () { e(document).on("click", n.options.trigger, function () { n.triggerMenu(n.options.animated); return !1 }) }, destroyClickListeners: function () { e(document).off("click", n.options.trigger, null) }, initiateContentClickListeners: function () { if (!n.options.closeOnContentClick) return !1; e(document).on("click", n.panel, function (e) { if (n.menuIsOpen()) { n.closeMenu(n.options.animated); } }); e(document).on("touchend", n.panel, function (e) { if (n.menuIsOpen()) { n.closeMenu(n.options.animated); return false; } }) }, destroyContentClickListeners: function () { if (!n.options.closeOnContentClick) return !1; e(document).off("click", n.panel, null); e(document).off("touchend", n.panel, null) }, initiateKeyboardListeners: function () { var t = ["input", "textarea"]; e(document).on("keydown", function (r) { var i = e(r.target), s = !1; e.each(t, function () { i.is(this.toString()) && (s = !0) }); if (s) return !0; for (mapping in n.options.keyboardShortcuts) if (r.which == n.options.keyboardShortcuts[mapping].code) { var o = n.options.keyboardShortcuts[mapping]; o.open && o.close ? n.triggerMenu(n.options.animated) : o.open && !o.close && !n.menuIsOpen() ? n.openMenu(n.options.animated) : !o.open && o.close && n.menuIsOpen() && n.closeMenu(n.options.animated); return !1 } }) }, destroyKeyboardListeners: function () { e(document).off("keydown", null) }, setupMarkup: function () { e("html").addClass("jPanelMenu"); /*e("body > *").not(n.menu + ", " + n.options.excludedPanelContent).wrapAll('<div class="' + n.panel.replace(".", "") + '"/>');*/$(".sitewrapper").addClass('jPanelMenu-panel'); e(n.options.menu).clone().attr("id", n.menu.replace("#", "")).insertAfter("body > " + n.panel) }, resetMarkup: function () { e("html").removeClass("jPanelMenu"); $(".sitewrapper").removeClass('jPanelMenu-panel'); e(n.menu).remove() }, init: function () { n.options.beforeOn(); n.initiateClickListeners(); Object.prototype.toString.call(n.options.keyboardShortcuts) === "[object Array]" && n.initiateKeyboardListeners(); n.setjPanelMenuStyles(); n.setMenuState(!1); n.setupMarkup(); n.setMenuStyle({ width: n.options.openPosition }); n.checkFixedChildren(); n.setPositionUnits(); n.closeMenu(!1); n.options.afterOn() }, destroy: function () { n.options.beforeOff(); n.closeMenu(); n.destroyClickListeners(); Object.prototype.toString.call(n.options.keyboardShortcuts) === "[object Array]" && n.destroyKeyboardListeners(); n.resetMarkup(); var t = {}; t[n.options.direction] = "auto"; e(n.fixedChildren).each(function () { e(this).css(t) }); n.fixedChildren = []; n.options.afterOff() }
        }; return { on: n.init, off: n.destroy, trigger: n.triggerMenu, open: n.openMenu, close: n.closeMenu, isOpen: n.menuIsOpen, menu: n.menu, getMenu: function () { return e(n.menu) }, panel: n.panel, getPanel: function () { return e(n.panel) } }
    }
})(jQuery);


/*! jRespond.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */
!function (a, b, c) { "object" == typeof module && module && "object" == typeof module.exports ? module.exports = c : (a[b] = c, "function" == typeof define && define.amd && define(b, [], function () { return c })) }(this, "jRespond", function (a, b, c) { "use strict"; return function (a) { var b = [], d = [], e = a, f = "", g = "", i = 0, j = 100, k = 500, l = k, m = function () { var a = 0; return a = "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth }, n = function (a) { if (a.length === c) o(a); else for (var b = 0; b < a.length; b++) o(a[b]) }, o = function (a) { var e = a.breakpoint, h = a.enter || c; b.push(a), d.push(!1), r(e) && (h !== c && h.call(null, { entering: f, exiting: g }), d[b.length - 1] = !0) }, p = function () { for (var a = [], e = [], h = 0; h < b.length; h++) { var i = b[h].breakpoint, j = b[h].enter || c, k = b[h].exit || c; "*" === i ? (j !== c && a.push(j), k !== c && e.push(k)) : r(i) ? (j === c || d[h] || a.push(j), d[h] = !0) : (k !== c && d[h] && e.push(k), d[h] = !1) } for (var l = { entering: f, exiting: g }, m = 0; m < e.length; m++) e[m].call(null, l); for (var n = 0; n < a.length; n++) a[n].call(null, l) }, q = function (a) { for (var b = !1, c = 0; c < e.length; c++) if (a >= e[c].enter && a <= e[c].exit) { b = !0; break } b && f !== e[c].label ? (g = f, f = e[c].label, p()) : b || "" === f || (f = "", p()) }, r = function (a) { if ("object" == typeof a) { if (a.join().indexOf(f) >= 0) return !0 } else { if ("*" === a) return !0; if ("string" == typeof a && f === a) return !0 } }, s = function () { var a = m(); a !== i ? (l = j, q(a)) : l = k, i = a, setTimeout(s, l) }; return s(), { addFunc: function (a) { n(a) }, getBreakpoint: function () { return f } } } }(this, this.document));


(function () {
    var jPM = $.jPanelMenu({
        menu: '.mainnav',
        trigger: '.menu_trigger',
        duration: 300,
        openPosition: '90%',
        excludedPanelContent: 'style, script',
        afterOpen: function () { $('#jPanelMenu-menu').css('z-index', '2'); }, //to make the shadow show
        beforeClose: function () { $('#jPanelMenu-menu').css('z-index', '1'); }
    });

    var jRes = jRespond([
        {
            label: 'small',
            enter: 0,
            exit: 767
        }, {
            label: 'large',
            enter: 767,
            exit: 10000
        }
    ]);
    window.jPM = jPM;
    window.jRes = jRes;

    function mobileMenuOn() {

        //turn off desktop hover overs if on
        $('.mainnav > ul  li').unbind('mouseenter mouseleave');
        //find what menu is being used and what container to open and close
        if ($(document).find(' div.megamenu_container').length > 0) {
            $menu_target = '>div.megamenu_container, >ul';
            allMenuLevels = '.mainnav > ul > li > div.megamenu_container, .mainnav > ul > li li ul';
            $menuType = "megamenu";
        } else {
            $menu_target = '>ul';
            allMenuLevels = ' .mainnav > ul > li ul';
            $menuType = "dropdownmenu";
        }
        //remove desktop classes and hide menus
        var allMenus = $(allMenuLevels).css('display', 'none').removeClass('menu_open');
        var rootMenus = $('.mainnav > ul > li').removeClass('menu_active');
        //add the expand arrow for items that have dropdown menus.
        $(".mainnav > ul  li").each(
            function () {
                if ($(this).find($menu_target).length > 0) {
                    $(this).prepend("<span class=\"expand_link\">Expand/close</span>");
                }
            }
        );

        //click event on the expand arrow
        $('.mainnav > ul  li>span').unbind('click').click(function (event) {

            $this = $(this);
            $menu_level = "";
            if ($this.parent().parent().hasClass("dropdownmenu")) {
                $menu_level = "root";
            }
            $target = $this.parent().find($menu_target);

            if (!$target.hasClass('menu_open')) {
                //if it is not open already, close all other menus and open this one.
                if ($menu_level == "root") {
                    allMenus.css('display', 'none');
                    allMenus.parent().find('.menu_open').removeClass('menu_open').css('display', 'none');
                    allMenus.parent().not($this.parent()).removeClass('menu_active');
                }
                if ($menuType == "megamenu") {
                    $this.parents('.megamenu_container').find('.menu_open').removeClass('menu_open').css('display', 'none');
                    $this.parents('.megamenu_container').find('.menu_active').removeClass('menu_active');
                    $this.parentsUntil('.megamenu_container', 'ul:not(.megamenu_column)').css('display', 'block').addClass('menu_open');
                    $this.parentsUntil('.megamenu_container', 'li').addClass('menu_active');
                    $target.addClass('menu_open').css('display', "block");
                } else {
                    $this.parent().parent().find('.menu_open').removeClass('menu_open').css('display', 'none');
                    $this.parent().parent().find('.menu_active').removeClass('menu_active');
                    $this.parent().addClass('menu_active');
                    $target.addClass('menu_open').css('display', "block");
                }


            } else {
                //if it is open already, close it.
                $target.css('display', 'none').removeClass('menu_open');
                $target.find('.menu_open').parent().removeClass('menu_active');
                $target.find('.menu_open').removeClass('menu_open').css('display', 'none');
                $this.parent().removeClass('menu_active');
            }
            return false;
        });
    }

    function mobileMenuOff() {
        //clear added spans, classes and styles when switching to desktop view.
        $('.mainnav > ul  li>span').remove();
        $('.mainnav > ul  li>ul, .mainnav > ul > li>div.megamenu_container').removeClass('menu_open').css('display', '');
        $('.mainnav > ul  li').removeClass('menu_active');

    }

    //handles moving the topnav to the top of the menu, adding the tip to click on arrows to expand, and keeps the search on top of the important notice tab when focused.
    function miscMobileElements() {
        //add menu tip
        $('#jPanelMenu-menu').prepend('<p class="nav_tip">Touch the arrow to view sub pages or touch the title to go to the page.</p>');
        //move top nav
        $('#top_nav').clone().prependTo('#jPanelMenu-menu');
        $('.alert_container').prependTo('.jPanelMenu-panel');
        if ($('#top_bar').length > 0) { $('#top_bar').prependTo('.jPanelMenu-panel'); }
        //move Preview Mobile Wrapper
        if ($('.preview-wrapper-fixed-background').length > 0) {
            $('.preview-wrapper-fixed-background').prependTo('.jPanelMenu-panel');
            $('#preview-wrapper').prependTo('.jPanelMenu-panel');
        }
        //adjust search if important notice is closed so tab does not overlap search
        var alertClass = $('#alert_controls').attr("class");
        if (alertClass == "show") { $("#searchbox").addClass("right_adjust"); }
        //readjust search on open/close of important notice
        $('#alert_controls').click(function () {
            var alertClass = $('#alert_controls').attr("class");
            if (alertClass == "hide") {
                $("#searchbox").addClass("right_adjust");
            }
            else {
                $("#searchbox").removeClass("right_adjust");
            }
        });
    };

    //reverses changes made in miscMobileElements() when moving to desktop view
    function miscMobileElementsDelete() {
        $('#jPanelMenu-menu #top_nav').remove(); $('#jPanelMenu-menu .nav_tip').remove(); $("#searchbox").removeClass

        ("right_adjust"); if ($('#top_bar').length > 0) { $('#top_bar').prependTo('body'); $('.alert_container').insertAfter('#top_bar'); } else

        { $('.alert_container').prependTo('body'); }

        //move MPreview Mobile Wrapper back to body
        if ($('.preview-wrapper-fixed-background').length > 0) {
            $('.preview-wrapper-fixed-background').prependTo('body');
            $('#preview-wrapper').prependTo('body');
        }
    };

    $.extend($, {
        initializeResponsive: function () {
            if ($(".mainnav .dropdownmenu").length > 0) {
                jRes.addFunc({
                    breakpoint: 'small',
                    enter: function () {
                        jPM.on();
                        mobileMenuOn();
                        miscMobileElements();
                    },
                    exit: function () {
                        jPM.off();
                        mobileMenuOff();
                        miscMobileElementsDelete();
                    }
                });
            } else {
                $(".menu_trigger").css("visibility", "hidden");
            }
        }
    });
})();

$(document).ready(function () {
    $.initializeResponsive();
    $(".search_btn").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".search_container").fadeOut(20);
            $("body").removeClass("search_active");
            $(".mainnav").fadeIn(20);
        } else {
            $(this).addClass("active");
            $(".search_container").fadeIn(200);
            $("body").addClass("search_active");
            $(".mainnav").fadeOut(200);
        }

    })


    $(document).on("click", ".search_active", function () {
        $(".search_btn").removeClass("active");
        $(".search_container").fadeOut(20);
        $("body").removeClass("search_active");
        $(".mainnav").fadeIn(20);
        console.log("asd");
    });

    $('.search_container, .search_btn, .chromeperfectpixel-panel-container, .chromeperfectpixel-portal, .chromeperfectpixel-overlay').click(function (event) {
        event.stopPropagation();
    });
});

//clear desktop hover when moving to mobile view.
if ($(window).width() < 768) {
    $(window).load(function () {
        $('.mainnav > ul > li').unbind('mouseenter mouseleave');
    });
}