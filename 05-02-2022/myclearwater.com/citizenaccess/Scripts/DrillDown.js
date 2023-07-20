﻿/**
 * <pre>
 * 
 *  Accela
 *  File: DrillDown.js
 * 
 *  Accela, Inc.
 *  Copyright (C): 2009-2013
 * 
 *  Description:
 * 
 *  Notes:
 * $Id: DrillDown.js 253656 2013-07-09 12:07:04Z ACHIEVO\alan.hu $.
 *  Revision History
 *  &lt;Date&gt;,    &lt;Who&gt;,    &lt;What&gt;
 *
 * </pre>
 */
 
var nextControlIds;
var seriesIds;
var sortedControls;

//at firstly open page, To trig drill down onchenge event.
function TrigDrillDownOnChange(){
    var ctlArray = document.getElementsByTagName("select");
    if (ctlArray != null){
        for(var i =0; i<ctlArray.length; i++){
            var ctl = ctlArray[i];
            if (ctl != null && ctl.attributes["IsAutoTrig"] != null && ctl.attributes["IsAutoTrig"].value == 'true'){
                if (ctl.options !=  null && ctl.options.length == 1 && typeof(defaultSelectText) != 'undefined' && ctl.options[0].text !=defaultSelectText && ctl.options[0].value != ''){
                    if (!IsSelectedValueForNextCtl(ctl)){
                        GetNextDrillDown(ctl);
                    }
                }
            }
        }
    }
}

//whether selected item for next control?
function IsSelectedValueForNextCtl(parcentCtl){
    if (parcentCtl){
        if (parcentCtl.attributes["NextControlIDs"] != null && parcentCtl.id != null){
            
            //get the control prefix which is be generated by specify regulation. 
            var ctlPrefixList = parcentCtl.id.split("_");
            var ctlPrefix = "";
            
            for(var i = 0 ; i < ctlPrefixList.length - 3 ; i++)
            {
                ctlPrefix = ctlPrefix + ctlPrefixList[i] + "_";
            }
            
            if (ctlPrefix != ""){   
                var nextCtl = document.getElementById(ctlPrefix + parcentCtl.attributes["NextControlIDs"].value);
                if (nextCtl != null && nextCtl.value != "" && nextCtl.disabled == false){
                    return true;
                }
            }
        }
    }
    
    return false;
}

function GetNextDrillDown(obj)
{
    //NextColumnNames
    if(obj.attributes["NextControlIDs"] == null || obj.attributes["SeriesIds"] == null || obj.attributes["AgencyCode"] == null
       || obj.attributes["GroupName"] == null || obj.attributes["SubGroupName"] == null)
    {
        return;
    }
    nextControlIds = obj.attributes["NextControlIDs"].nodeValue; 
    seriesIds = obj.attributes["SeriesIds"].nodeValue;
    var sortedControls = obj.attributes["SortedControls"].nodeValue;
    var parentClientID = obj.id;
    var selectedValue=obj.options[obj.selectedIndex].value;
    
    //get the control prefix which is be generated by specify regulation. 
    var controlPrefixList = parentClientID.split("_");
    controlPrefix = "";
    
    for(var i = 0 ; i < controlPrefixList.length - 3 ; i++)
    {
        controlPrefix = controlPrefix + controlPrefixList[i] + "_";
    }
    
    if(selectedValue == null || selectedValue == '' || selectedValue == 'undefined ')
    {
        ChangeControlStatus(false, sortedControls);
    }
    else
    {
        ChangeControlStatus(true, sortedControls);
        var agencyCode = obj.attributes["AgencyCode"].nodeValue;
        var groupName = obj.attributes["GroupName"].nodeValue;
        var subGroupName = obj.attributes["SubGroupName"].nodeValue;

        Accela.ACA.Web.WebService.DrillDownService.GetNextDrillDown(agencyCode, groupName, subGroupName, seriesIds, selectedValue, CallbackDrillDown, null);
    }
}

function CallbackDrillDown(result)
{
    if(result == null || result == '' || result == 'undefined ')
    {
        return;
    }
    
    var valueList = eval(result);        
    var nextControlIdList = nextControlIds.split(String.fromCharCode(18));
    var seriesIdList = seriesIds.split(String.fromCharCode(18));
    
    for(var i = 0 ; i < seriesIdList.length ; i++)
    {
        var seriesID = seriesIdList[i];
        var controlID = nextControlIdList[i];
        var curDDL = document.getElementById(controlPrefix + controlID);
        curDDL.options.length=0;
        var AvailableOptionNum = 0;
        
        for(var j = 0 ; j < valueList.length ; j++)
        {
            var tmpSeriesID = JsonDecode(valueList[j].seriesID);
            var tmpListValue = JsonDecode(valueList[j].ListValue);
            var tmpListText = JsonDecode(valueList[j].ListText);

            if (seriesID == tmpSeriesID)
            {
                if (tmpListValue == '')
               {
                   if (!(IsRequired(curDDL) && valueList.length == 2))
                   {
                       curDDL.options.add(new Option(defaultSelectText, ''));
                   }
               }
               else
               {
                   curDDL.options.add(new Option(tmpListText, tmpListValue));
                   AvailableOptionNum ++;                
               }

            }
        }
        
        if (IsRequired(curDDL) && AvailableOptionNum == 1){
            GetNextDrillDown(curDDL);
        }
    }
}

///Get flag for whether control is required?
function IsRequired(ctl){
    if (ctl != null && ctl.attributes["Required"] != null && ctl.attributes["Required"].value == 'true'){
        return true;
    }

    //get flag for express required.
    if (ctl != null){
        var requiredExpression = document.getElementById("strRequiredMK_" +ctl.id);
        if (requiredExpression != null)
        {
            return true;
        }
    }
    
    return false;
}

function ChangeControlStatus(isSelected, sortedControls)
{
    var sortedControlArray = sortedControls.split(splitChar);
    var nextControlIdList = nextControlIds.split(String.fromCharCode(18));
    
    for( var i = 0 ; i < sortedControlArray.length ; i++)
    {
       var  subSortedControls = sortedControlArray[i].substring(0, sortedControlArray[i].length - 1).split(String.fromCharCode(18));
       var isChildControl = false;

       for(var j = 0 ; j < subSortedControls.length ; j++)
       {
            var curControlId = subSortedControls[j];
               
            if(ArrayContain(nextControlIdList, curControlId) || isChildControl)
            {
                var curDDL = document.getElementById(controlPrefix + curControlId);
                
                curDDL.options.length = 0;
                
                if(isChildControl || !isSelected)
                {
                    curDDL.options.add(new Option(defaultSelectText, ''));
                    curDDL.selectedIndex = 0;
                    SetFieldToDisabled(curDDL.id, true);
                }
                else
                {
                    SetFieldToDisabled(curDDL.id, false);
                }
                isChildControl = true;
            }
       }
    }
    
}

function ArrayContain(nextControlIds, curControlId) 
{
    var isChildControl = false;
    
    for( var i = 0 ; i < nextControlIds.length ; i++)
    {
    
        if(nextControlIds[i] == curControlId)
        {
            isChildControl = true;
            break;
        }
    }
    
    return isChildControl;
    
}
