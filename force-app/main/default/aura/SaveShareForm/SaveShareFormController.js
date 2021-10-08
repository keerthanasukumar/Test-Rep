({
    saveRecords : function(component, event, helper) {
        console.log("***saveRecords");
        var shareRecord = component.get("v.ShareRec");
        console.log("***kkkk",shareRecord);
        console.log("**shareRecord",shareRecord);
        var action = component.get("c.saveRec");
        action.setParams({ 
            "rec": shareRecord
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var name = a.getReturnValue();
                alert("hello from here"+name);
            }
        });
        $A.enqueueAction(action);
    },
})