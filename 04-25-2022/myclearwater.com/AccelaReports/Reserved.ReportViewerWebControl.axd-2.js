//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------------------------

function ResizeVerticalTextBoxes() {
    if (window.$RSjQuery) {
        window.$RSjQuery(".canGrowVerticalTextBox").each(function() {
            var node = window.$RSjQuery(this);
            var child = node.children(":first");
            var td = node.parent();
            
            if (child.width() > node.width())
            {
                td.width(child.outerWidth());
                node.width(child.outerWidth());
            }
            else if (!node.hasClass("canShrinkVerticalTextBox"))
            {
                child.outerWidth(node.width());
            }
        });
        
        window.$RSjQuery(".canShrinkVerticalTextBox").each(function() {
            var node = window.$RSjQuery(this);
            var child = node.children(":first");
            var td = node.parent();
            
            if (child.width() < node.width())
            {
                td.width(child.outerWidth());
                node.width(child.outerWidth());
            }
            else
            {
                child.outerWidth(node.width());
            }
        });
    }
}

function ResizeTablixRows() {
    if (window.$RSjQuery) {
        MarkCanGrowRows();
        MarkCanShrinkRows();

        // Fix for slow code...
        // The original code here was querying the child and node height and setting the grandparent height in the same iteration.
        // This caused a layout reflow to occur with every iteration. Which was slow. 
        // The fix breaks the two operations apart so the layout reflow does not occur. 

        var elementsThatNeedHeightCleared = window.$RSjQuery(".cannotGrowTextBoxInTablix").map(function () {
            var node = window.$RSjQuery(this);
            var child = node.children().first();
            var childHeight = child.height();
            var grandparent = node.parent().parent();

            // Fix for Vertical Alignment not working when a tablix row contains a mix of CanGrow and CannotGrow
            // - node.height represents the height of the row after others have grown.
            // - childHeight represents the height that the text wants to achieve.
            // If the height that the child wants to achieve is smaller than the height of the row, we will take off 
            // the original height of the grandparent to allow vertical alignment.
            if (node.height() > childHeight) {
                return grandparent;
            } else {
                return null;
            }
        });

        elementsThatNeedHeightCleared.each(function (index, element) {
                element.css('height', '');
            });
    }
}

function MarkCanGrowRows() {
    if (window.$RSjQuery) {
        if (window.$RSjQuery(".cannotGrowTextBoxInTablix").length === 0 || window.$RSjQuery(".canGrowTextBoxInTablix").length === 0)
        {
            return;
        }
        
        window.$RSjQuery("tr > td > .canGrowTextBoxInTablix").parent().parent().each(function() {
            var row = window.$RSjQuery(this);
            if (row.find('.canGrowTextBoxInTablix').length === 0 || row.find('.cannotGrowTextBoxInTablix').length === 0)
            {
                return; //continue;
            }
            else {
                row.find('.cannotGrowTextBoxInTablix').each(function() {
                    window.$RSjQuery(this).parent().addClass("tdResizable");
                });
            }
        });		
    }
}

function MarkCanShrinkRows() {
    if (window.$RSjQuery) {
        if (window.$RSjQuery(".canShrinkTextBoxInTablix").length === 0)
        {
            return;
        }
        
        window.$RSjQuery("tr > td > .canShrinkTextBoxInTablix").parent().parent().each(function() {
            var row = window.$RSjQuery(this);
            if (row.find(".canShrinkTextBoxInTablix").length === 0)
            {
                return; //continue;
            }
            else if (row.find(".cannotShrinkTextBoxInTablix").length === 0) {
                row.find('td').each(function() {
                    window.$RSjQuery(this).addClass("tdResizable");
                });
            }
        });		
    }
}

function Resize100HeightElements() {
    if (window.$RSjQuery) {
        window.$RSjQuery(".resize100Height").each(function () {

            var self = window.$RSjQuery(this);
            var parent = self.parent();

            var parentHeight = parent.height();
            while (!(parent.is("div") || parent.is("td") || parent.is("tr")) || parentHeight === 0) {
                parent = parent.parent();
                parentHeight = parent.height();
            }

            self.height(parentHeight);
        });
    }
}

function Resize100WidthElements() {
    if (window.$RSjQuery) {
        window.$RSjQuery(".resize100Width").each(function () {

            var self = window.$RSjQuery(this);
            var parent = self.parent();

            var parentWidth = parent.width();
            while (!(parent.is("div") || parent.is("td") || parent.is("tr")) || parentWidth === 0) {
                parent = parent.parent();
                parentWidth = parent.width();
            }

            self.width(parentWidth);
        });
    }
}

function SetFocusOnReport(event) {
    if (event.data == 'SetFocusOnContent') {
        // Look for RVC from portal and from Sharepoint
        var reportViewer = window.$RSjQuery('div[id^="VisibleReportContentReportViewerControl_"],td[id^="m_sqlRsWebPartViewerCell"]');
        reportViewer.attr("tabindex", 1);
        reportViewer.focus();
        reportViewer.removeAttr("tabindex");
    }
}


function PostRenderActions() {
    Resize100HeightElements();
    Resize100WidthElements();
    ResizeVerticalTextBoxes();
    ResizeTablixRows();
}

// Note: Make sure this script follow RVC jquery in script registration.
window.$RSjQuery = window.jQuery.noConflict(true);
