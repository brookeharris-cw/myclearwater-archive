/*!
 * Accela ACA Digital Plan Room Component
 */
Accela = Accela || {};
Accela.ACA = Accela.ACA || {};
Accela.ACA.Dpr = {};

(function () {
    
    var componentPath;
    var baseApiUrl;
	
	var capId;
	var agencyCode;
	var tabName;
	var module;
    var permitNumber;
    var multiAgency;
    var customizationFolder;
    
    function init() {

        // Only enable for multi agencies, add enabled agencies here...
        // multiAgency = ['SPARKS'];
        // customizationFolder = 'ONE';
        
        agencyCode = getUrlParam('agencyCode');

        if (multiAgency && multiAgency.indexOf(agencyCode) === -1) {
            return;
        }

        var capId1 = getUrlParam('capID1');
        var capId2 = getUrlParam('capID2');
        var capId3 = getUrlParam('capID3');
        module = getUrlParam('Module');
        tabName = getUrlParam('TabName');

        if (!tabName) {
            tabName = module;
        }

        if (!agencyCode || !capId1 || !capId2 || !capId3 || !module || !tabName) {
            console.log('One or more required parameters missing for plan room.');
            return;
        }

        componentPath = '../Customization/' + (customizationFolder ? customizationFolder : getUrlParam('agencyCode')) + '/Dpr';
        baseApiUrl = componentPath + '/Handlers/Api.ashx';
		
		permitNumber = $("#ctl00_PlaceHolderMain_lblPermitNumber").text();
		capId = getCapIdFromParts(agencyCode, capId1, capId2, capId3);
        
		$.ajax({
			url: baseApiUrl + '/ab/records/' + capId + '/planroom',
			dataType: 'json',
			type: 'GET',
			cache: false,
			success: function(project, status) {

                var ieVersion = detectIE();
                if (ieVersion !== false && ieVersion < 11) {
                    window.showMessage4Popup('You are using a web browser that is not supported by the digital plan room. Current versions of Chrome, Firefox, Edge or Safari are recommended.', 'Error', true, 1, true);
                    return;
                }
                else {

                    modifyNativeAttachments();
                    createPlanRoomMenu();
                    createPlanRoomMenuItems();	
                }
			},
			error: function(request) {
				console.log('Error retrieving project state for record. Status code: ' + request.status);
				switch (request.status)
                {
                    case 404:
                        // No project exists for this record so we do not show the plan room.
                        break;
                    case 403:
                    case 401:
                        // Do not show the plan room if user is not logged in.
                        break;
                    default:
						window.showMessage4Popup('An error occurred starting the digital plan room. Please contact your agency administrator.', 'Error', true, 1, true);
						break;
				}
			}
		});
    }
	
    function modifyNativeAttachments() {
        $('#ctl00_PlaceHolderMain_attachmentEdit_btnBrowse').attr('onclick', '').unbind('click');
        $('#ctl00_PlaceHolderMain_attachmentEdit_btnBrowse').attr('href', getPageUrl('submittals'));
    }

	function createPlanRoomMenu() {
		var revMenu = getMenuTemplate();
		var recNav = $('.record-nav');
		$($('.nav-bar', recNav).children()[0]).after(revMenu);
	}
	
	function createPlanRoomMenuItems(){
		
		$('#dpr-menu').append(getMenuItemsTemplate());
        $('#menu_Submittals').click(function (){
            window.location = getPageUrl('submittals');
            return false;           
        });

        $('#menu_Issues').click(function (){
            window.location = getPageUrl('issues');
            return false;           
        });

        $('#menu_ApprovedPlans').click(function (){
            window.location = getPageUrl('approved');
            return false;           
        });

        $('#menu_Conditions').click(function (){
            window.location = getPageUrl('conditions');
            return false;           
        });

        $('#menu_Notes').click(function () {
            window.location = getPageUrl('notes');
            return false;
        });

        $('#menu_Summary1').click(function (){
            window.location = getPageUrl('summary');
            return false;           
        });
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
	
	function getPageUrl(page, submittalId){
        return componentPath + '/Component/PlanRoom.aspx?page=' + page + '&Module=' + module + '&TabName=' + tabName + '&recordId=' + capId + '&customId=' + permitNumber + (submittalId ? '&submittalId=' + submittalId : '') + (agencyCode ? '&agencyCode=' + agencyCode : ''); 
	}
    
	function getCapIdFromParts(agencyCode, capId1, capId2, capId3) {
		return agencyCode + '-' + capId1 + '-' + capId2 + '-' + capId3;
	}
		
	function getMenuTemplate(){
		return '<li id="dpr-menu">' +
		'<a href="#" onclick="return false;" class="par-menu NotShowLoading" title="Plan Room menu, press tab to expand" data-control="">Plan Room <span class="rec-downarrow "></span></a>' +
		'</li>';
	}
	
	function getMenuItemsTemplate() {
		return '<ul class="dropdown-menu">' +
            '<li><a id="menu_Summary1" href="#" title="Summary" class="NotShowLoading">Summary</a></li>' +
            '<li><a id="menu_Submittals" href="#" title="Upload plans and documents" class="NotShowLoading">Uploads</a></li>' +
            '<li><a id="menu_Issues" href="#" title="Issues" class="NotShowLoading">Issues</a></li>' +
            '<li><a id="menu_Conditions" href="#" title="Conditions" class="NotShowLoading">Conditions</a></li>' +
            '<li><a id="menu_Notes" href="#" title="Notes" class="NotShowLoading">Notes</a></li>' +
            '<li><a id="menu_ApprovedPlans" href="#" title="Approved" class="NotShowLoading">Approved</a></li>' +
		'</ul>';
	}

    function detectIE() {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …
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

    function loadCapDetailExt() {

        $.ajax({
            url: '../Customization/' + getUrlParam('agencyCode') + '/CAP/extCapDetail.js',
            dataType: "script",
            cache: true
        });
    }

    Accela.ACA.Dpr.initialize = init;
    Accela.ACA.Dpr.loadCapDetailExt = loadCapDetailExt;
})();

$(document).ready(function () { 
    Accela.ACA.Dpr.initialize();
});

// Only enable if you need to load more extensions to capdetail
// Accela.ACA.Dpr.loadCapDetailExt();