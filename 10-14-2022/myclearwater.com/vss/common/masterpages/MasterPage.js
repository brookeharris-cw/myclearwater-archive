$(document).mouseup(function (e) {
    var container = $(".hide-on-click-elsewhere");
    if (!container.is(e.target) // if the target of the click isn't the container... 
    && container.has(e.target).length === 0) // ... nor a descendant of the container 
    {
        container.hide();
    }
});

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

$(function () {
    $('.expand-collapse').click(function () {
        var expanding = $(this).next().css('display') == 'none';
        $(this).next().toggle('slow');
        $(this).find(".caret").toggleClass('fa-angle-up', expanding);
        $(this).find(".caret").toggleClass('fa-angle-down', !expanding);
        if(expanding)
        {
            sessionStorage.setItem($(this).attr('id'), 'expanded');
        }
        else
        {
            sessionStorage.removeItem($(this).attr('id'));
        }

        $(".expand-collapse input, a").click(function (e) {
            e.stopPropagation();
        });

    });
});

$(function () {
    $('.expand-collapse').each(function () {
        var expanded = sessionStorage.getItem($(this).attr('id')) !== null;
        if (expanded) {
            $(this).next().css('display', '');
        }
        $(this).find(".caret").toggleClass('fa-angle-up', expanded);
        $(this).find(".caret").toggleClass('fa-angle-down', !expanded);

    });
});

$(function () {
    $('.slide-left').animate({ left: 0 });

    $(".expand-collapse input, .expand-collapse a").click(function (e) {
        e.stopPropagation();
    });
});


Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);

function EndRequestHandler(sender, args) {

    $(function () {
        $('.slide-left').animate({ left: 0 });

        $(".expand-collapse input, .expand-collapse a").click(function (e) {
            e.stopPropagation();
        });
    });

    $(function () {
        $('.expand-collapse').click(function () {
            var expanding = $(this).next().css('display') == 'none';
            $(this).next().toggle('slow');
            $(this).find(".caret").toggleClass('fa-angle-up', expanding);
            $(this).find(".caret").toggleClass('fa-angle-down', !expanding);
            if (expanding) {
                sessionStorage.setItem($(this).attr('id'), 'expanded');
            }
            else {
                sessionStorage.removeItem($(this).attr('id'));
            }

            $(".expand-collapse input, a").click(function (e) {
                e.stopPropagation();
            });
        });
    });

    $(function () {
        $('.expand-collapse').each(function () {
            var expanded = sessionStorage.getItem($(this).attr('id')) !== null;
            if (expanded) {
                $(this).next().css('display', '');
            }
            $(this).find(".caret").toggleClass('fa-angle-up', expanded);
            $(this).find(".caret").toggleClass('fa-angle-down', !expanded);

        });
    });
}