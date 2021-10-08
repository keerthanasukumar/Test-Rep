({
    getAccounts : function(component, pageNumber, helper) {
        var displayRecords = component.get("v.displayRecords");
        var pageNumber = pageNumber;
        console.log("pageNumber***",pageNumber);
        console.log("recordToDisplay**",displayRecords);
        var action = component.get("c.getAccount");
        action.setParams({
            "displayLimits": displayRecords,
            "pageno":pageNumber
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                console.log("result**",resultData.length);
                component.set("v.acctList",resultData);
            }
        });
        $A.enqueueAction(action);
    }
})