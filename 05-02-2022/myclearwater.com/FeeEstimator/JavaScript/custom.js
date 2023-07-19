
var myClearwater = myClearwater || {}; 
myClearwater.SubmitValid = true;

myClearwater.valid = function () {
    myClearwater.checkValues();
    if (myClearwater.submit) {
        toastr.clear();
    }
    return myClearwater.SubmitValid;
};

$(window).ready(function () {
    var d = new Date();
    $('#Copyright').html('Copyright '.concat(d.getFullYear()).concat(' all rights reserved'));
    myClearwater.formatFees();
});



(myClearwater.setToastrGlobalOption = function() {
    window.toastr.options.positionClass = 'toast-top-right';
    window.toastr.options.fadeOut = 3000;
    window.toastr.options.fadeIn = 15000;
    window.toastr.options.preventDuplicates = true;
    return;
})();

myClearwater.formatFees = function() {

    function menuItem(label, cost) {
        return label + ':'.concat(cost.padStart(25 - label.length, " "));
    }

    window.$('<div id="lblEstimateTitle">Fee Estimates</div>').insertAfter('#lblEstimate');
    window.$('#lblEstimate').remove();

    const plansFee = window.$("#lblPlansFee");
    const plansFeeText = plansFee.text().split(":");
    if (plansFeeText.length > 1) {
        window.$('<div class="fees">' + menuItem(plansFeeText[0], plansFeeText[1]) + '</div>').insertAfter(plansFee);
        plansFee.remove();
    }

    const permitFee = window.$("#lblPermitFee");
    const permitFeeText = permitFee.text().split(":");
    if (permitFeeText.length > 1) {
        window.$('<div class="fees">' + menuItem(permitFeeText[0], permitFeeText[1]) + '</div>').insertAfter(permitFee);
        permitFee.remove();
    }


    const trades = window.$("#lblTrades");
    const tradesText = trades.text().split(":");
    if (tradesText.length > 1) {
        window.$('<div class="fees">' + menuItem(tradesText[0], tradesText[1]) + '</div>').insertAfter(trades);
        trades.remove();
    }

    const stateFee = window.$("#lblStateFee");
    const stateFeeText = stateFee.text().split(":");
    if (stateFeeText.length > 1) {
        window.$('<div class="fees feesUnderline">' + menuItem(stateFeeText[0], stateFeeText[1]) + '</div>').insertAfter(stateFee);
        stateFee.remove();
    }

    const total = window.$("#lblTotal");
    const totalText = total.text().split(":");
    if (totalText.length > 1) {
        window.$('<div class="fees feesBoldTotal">' + menuItem(totalText[0], totalText[1]) + '</div>').insertAfter(total);
        total.remove();
    }

}


$("#txtSubmit").click(function () {
        myClearwater.checkValues();
    }
);


$("#txtValue").focusout(function formatJobValue() {
    var jobValObj = window.$("#txtValue");
    var jobVal = jobValObj.val().trim().replace(',', '').replace('$', '');

    if (isNaN(jobVal) || jobVal < 0 || jobVal === '') {
        toastr["info"]("Please enter a valid dollar amount.");
    } else {
        jobValObj.val(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(jobVal));
    }

});

myClearwater.checkValues = function(){
    var jobValObj = $("#txtValue");
    var jobVal = jobValObj.val().trim().replace(',', '').replace('$', '');
    myClearwater.valid = true;
    if ($("#ddlPermitType option:selected").text().indexOf("Select") !== -1) {
        window.toastr["info"]("Please select a permit type.");
        myClearwater.SubmitValid = false;
    }

    if (isNaN(jobVal) || jobVal === 0 || jobVal.length === 0) {
        jobValObj.val(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(" "));
        window.toastr["info"]("Please enter a dollar amount.");
        myClearwater.SubmitValid = false;
    }

    if (jobVal.length > 11) {
        jobValObj.val(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(" "));
        window.toastr["info"]("Please enter a dollar amount less than 9 million dollars");
        myClearwater.SubmitValid = false;
    }
}



