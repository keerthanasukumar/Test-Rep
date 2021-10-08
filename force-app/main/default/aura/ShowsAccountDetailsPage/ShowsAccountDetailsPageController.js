({
    doInit : function(component, event, helper) {
        console.log("recordid",component.get("v.recordId"));
        var action = component.get("c.getAccount");
        action.setParams({
            "recordId": component.get("v.recordId"),
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                console.log("result**",resultData);
                component.set("v.recordData",resultData[0]);
                if(resultData[0].RecordType.Name == "Normal"){
                    component.set("v.isNormal",true);
                }
                else if(resultData[0].RecordType.Name == "Special"){
                    component.set("v.isSpecial",true);
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    editRecords:function(component, event, helper) {
        component.set("v.isEditable",true);
    },
    saveRecords : function(component, event) {
        console.log("Save btn***");
        var newAcc = component.get("v.recordData");
        var action = component.get("c.saveAccount");
        action.setParams({ 
            "acc": newAcc
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                var res = a.getReturnValue();
                console.log("hello from here"+true);
            }
        });
        $A.enqueueAction(action);
        component.set("v.isEditable",false);
    },
    
    Cancel :function(component, event, helper) {
        component.set("v.isEditable",false);
    }
})