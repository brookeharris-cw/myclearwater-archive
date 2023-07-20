/*!
 * Accela ACA Digital Plan Room Component
 */
Accela = window.Accela || {};
Accela.ACA = Accela.ACA || {};
Accela.ACA.Dpr = {};

(function () {

    var currentScript = getCurrentScript();
    var currentDirIndex = currentScript.indexOf('/cap/');
    var componentPath = currentScript.substring(0, currentDirIndex) + '/Dpr';

    var baseApiUrl = componentPath + '/Handlers/Api.ashx';
    var multiAgency;

    function init() {

        // Only enable for multi agencies, add enabled agencies here...
        // multiAgency = ['SPARKS'];

        refresh();

        var target = $('#ctl00_PlaceHolderMain_divMyPermitList')[0];
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var newNodes = mutation.addedNodes; // DOM NodeList
                if (newNodes !== null) { // If there are new nodes added
                    var $nodes = $(newNodes); // jQuery set
                    $nodes.each(function () {
                        var $node = $(this);
                        if ($node.hasClass('ACA_Grid_OverFlow')) {
                            refresh();
                            console.log('refreshed');
                        }
                    });
                }
            });
        });

        var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        };

        if (target) {
            observer.observe(target, config);
        }
    }

    function refresh() {
        
        var numberAnchors = $('table tr a[id*="hlPermitNumber"]');
        var records = $.map(numberAnchors, function (a, i) {
            var text = $(a).find('span[id*="_lblPermitNumber1"]')[0].innerText;
            var url = a.href;
            var agency = getUrlParam('agencyCode', url);
            return { number: text, agency: agency };
        });

        if (!records.length) {
            return;
        }

        var groups = groupByAgency(records, multiAgency);
        for (var group in groups) {
            if (groups.hasOwnProperty(group)) {
                setupAnchors(groups[group], numberAnchors, group);
            }
        }

        function groupByAgency(records, agencies) {
            var groups = {};
            $.each(records, function () {
                if (!agencies || agencies.indexOf(this.agency) !== -1) {
                    if (groups.hasOwnProperty(this.agency)) {
                        groups[this.agency].push(this);
                    }
                    else {
                        groups[this.agency] = [this];
                    }
                }
            });

            return groups;
        }

        function setupAnchors(records, numberAnchors, agencyCode) { 

            var numbers = [];
            $.each(records, function () {
                numbers.push(this.number);
            });

            $.ajax({
                url: baseApiUrl + '/ab/records/projects?numbers=' + numbers.join(',') + '&agencyCode=' + agencyCode,
                dataType: 'json',
                type: 'GET',
                cache: false,
                success: function (projects) {
                    if (projects.length) {

                        var ieVersion = detectIE();
                        if (ieVersion !== false && ieVersion <= 11) {
                            window.showMessage4Popup('You are using a web browser that is not supported by the Digital Plan Room. Current versions of Chrome, Firefox, Edge or Safari are recommended.', 'Error', true, 1, true);
                            return;
                        }
                    
                        numberAnchors.each(function (index) {
                            var a = $(this);
                            var recordUrl = a[0].href;
                            var agency = getUrlParam('agencyCode', recordUrl);
                            if (agency === agencyCode) {
                                var spanText = a.find('span[id*="_lblPermitNumber1"]')[0].innerText;
                                var project = findProjectByNumber(projects, spanText);
                                if (project && (project.status === 'intake' || project.status === 'notapproved')) {

                                    var lastActionDiv = a.closest('tr').find('div[id*="_Panel5"]');
                                    var noActions = true;
                                    /*lastActionDiv.siblings('div').each(function (index) {
                                        var actionDiv = $(this);
                                        if (actionDiv.find('a').length) {
                                            noActions = false;
                                        }
                                    });*/

                                    if (noActions) {

                                        var newAction = $('<div><a class="NotShowLoading" title="Upload Plans and Documents" href="#">Upload Plans</a></div>');
                                        var newButton = $('a', newAction);
                                        newButton.click(function () {

                                            var p = new ProcessLoading();
                                            p.showLoading(false);

                                            $.ajax({
                                                url: baseApiUrl + '/projects/' + project.id + '/submittals' + '?agencyCode=' + agencyCode,
                                                type: 'GET',
                                                contentType: 'application/json',
                                                success: function (result, status) {
                                                    if (result.length > 0) {

                                                        var submittals = result;
                                                        submittals.sort(function (a, b) {
                                                            return new Date(b.createdDate) - new Date(a.createdDate);
                                                        });

                                                        // Pick the last one
                                                        var last = submittals[0];
                                                        if (isOpen(last)) {
                                                            var capId = project.id;
                                                            var submittalId = last.id;
                                                            var tabName = getUrlParam("TabName", recordUrl);
                                                            var module = getUrlParam("Module", recordUrl);

                                                            if (project.status === 'intake') {
                                                                window.location = getPageUrl('wizard', module, tabName, capId, submittalId) + '&agencyCode=' + agencyCode;
                                                            }
                                                            else {
                                                                window.location = getPageUrl('submittals', module, tabName, capId, submittalId) + '&agencyCode=' + agencyCode;
                                                            }
                                                        }
                                                        else {
                                                            p.hideLoading();
                                                            console.log('Last submittal is closed');
                                                            window.showMessage4Popup('An error occurred navigating to the digital plan room. Please contact your agency administrator.', 'Error', true, 1, true);
                                                        }
                                                    }
                                                    else {
                                                        p.hideLoading();
                                                        console.log('No submittals for this project');
                                                        window.showMessage4Popup('An error occurred navigating to the digital plan room. Please contact your agency administrator.', 'Error', true, 1, true);
                                                    }
                                                },
                                                error: function (request, status, httpCode) {
                                                    p.hideLoading();
                                                    console.log('Error retrieving initial submittal: ' + request.status);

                                                    switch (request.status) {
                                                        default:
                                                            window.showMessage4Popup('An error occurred navigating to the digital plan room. Please contact your agency administrator.', 'Error', true, 1, true);
                                                            break;
                                                    }

                                                }
                                            });

                                            return false;
                                        });

                                        lastActionDiv.after(newAction);
                                    }
                                }
                            }
                        });
                    }
                },
                error: function (request) {
                    console.log('Retrieving projects. Status code: ' + request.status);
                    // Do not show anything if plan room init fails
                    switch (request.status) {
                        case 403:
                        case 401:
                        default:
                            break;
                    }
                }
            });
        }

        function isOpen(submittal) {
            return (submittal &&
                (submittal.status !== 'Submitted' &&
                 submittal.status !== 'Submitting' &&
                 submittal.status !== 'Accepted' &&
                 submittal.status !== 'Accepting'
                ));
        }

        function findProjectByNumber(projects, number) {
            var found;
            $.each(projects, function (index) {
                if (number === this.number) {
                    found = this;
                    return false;
                }
            });

            return found;
        }

        function getPageUrl(page, module, tab, capId, submittalId) {
            return componentPath + '/Component/PlanRoom.aspx?page=' + page + '&Module=' + module + '&TabName=' + tab + '&recordId=' + capId + '&submittalId=' + submittalId;
        }
    }

    function getCurrentScript() {

        if (document.currentScript) {
            return document.currentScript.src;
        } else {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1].src;
        }
    }

    function getUrlParam(name, url) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = url ? regex.exec(url) : regex.exec(window.location.href);
        if (results === null)
            return "";
        else
            return results[1];
    }

    function detectIE() {
        var ua = window.navigator.userAgent;

        // Test values

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    Accela.ACA.Dpr.initialize = init;
})();

angular.element(document).ready(function () {
    
    angular.element($('#ctl00_PlaceHolderMain_divMyPermitList').find('> div')).scope().$watch('$viewContentLoaded', function () {
        console.log('loaded table');
    });

    Accela.ACA.Dpr.initialize();
});

//$(document).ready(function () {
//    Accela.ACA.Dpr.initialize();
//});