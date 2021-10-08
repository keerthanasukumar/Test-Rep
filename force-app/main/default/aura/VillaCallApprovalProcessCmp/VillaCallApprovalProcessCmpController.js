({
	callApprovalProcess : function(component, event, helper) {
		var action = component.get("c.submitAndProcessApprovalRequest");
        console.log('RecordId:', component.get("v.recordId"));
        
        action.setParams({
            'villaRecordId': component.get("v.recordId")
        });   
        action.setCallback(this, function(response) { 
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log("***storeResponse",JSON.parse(storeResponse))
                //component.set("v.historyPlacementApprovalList",JSON.parse(storeResponse).approvalPlacementList);
                //component.set("v.historyCaseApprovalList",JSON.parse(storeResponse).approvalCaseList);
            }
        });
        $A.enqueueAction(action);
	}
})