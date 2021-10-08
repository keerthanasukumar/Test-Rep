({
	onRecordSubmit: function(component, event, helper) {
		console.log('recordId**',component.get('v.recordId'));
        var eventFields = event.getParam("fields");
    	console.log('eventFields**',eventFields); 
    	eventFields["Field__c"] = "true";
    	event.setParam("fields", eventFields);
	},
    
	onRecordSuccess: function(component, event, helper) {
   		console.log('success');
	},
    
    onCheck:function(component,event,helper){
    	component.set('v.cpsHistory',true);
	},
    
    handleSave:function(component,event,helper){
		console.log('save');
        console.log('**',component.get('v.cpsHistory'));
        var action = component.get("c.saveRec");
        action.setParams({"acc":{'Id': component.get('v.recordId'),
                                 'booking__c': component.get('v.cpsHistory')}
        });
        action.setCallback(this, function(result) {
         	var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                console.log("resultData**",resultData);
                //location.reload();
                $A.get('e.force:refreshView').fire();
        	}
		});
        $A.enqueueAction(action);
    },
    handleChange: function(component,event,helper){
        var action = component.get("c.saveRec");
        action.setParams({"acc":{'Id': component.get('v.recordId'),
                                 'booking__c':event.getSource().get('v.checked')}
                         });
        
        action.setCallback(this, function(result) {
         	var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                console.log("resultData**",resultData);
                //location.reload();
                $A.get('e.force:refreshView').fire();
        	}
		});
        $A.enqueueAction(action);
    }
})