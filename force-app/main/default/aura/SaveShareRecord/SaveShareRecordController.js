({
    doInit: function(component, event, helper) {
        console.log("recordId**",component.get("v.recordId"));
        var contactId = component.get("v.recordId");
        var title = component.get("v.title");
        var action = component.get("c.getShareRec");
        component.set("v.isRec",true);
        action.setParams({
            "conId": contactId,
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                console.log("resultData**",resultData);
                component.set("v.Share",resultData);
                console.log("resultlen**",resultData.length);
                var conString ='SHARE ('+title+resultData.length+')';
                component.set("v.title",conString);
            }
        });
        $A.enqueueAction(action);
    },
    showForm : function(component, event, helper) {
        console.log('show**',component.get("v.isShow"));
        component.set("v.isRec","false");
        component.set("v.isShow","true");
        var Share = component.get("v.Share");
        var instance  = {'sobjectType': 'Share__c',
                         'Name': '',
                         'Percentage__c':''
                        };
        Share.push(JSON.parse(JSON.stringify(instance))); 
        component.set("v.Share", Share);
    },
    cancel : function(component, event, helper) {
        console.log('show**',component.get("v.isShow"));
        component.set("v.isShow","false");
        component.set("v.isRec","true");
    },
    saveRecords : function(component, event, helper) {
        var shareRecord = component.get("v.Share");
        console.log("**shareRecord",shareRecord);
        component.set("v.isShow","false");
        component.set("v.isRec","true");
        var per=[];
        for(var i in shareRecord){
            var percent =shareRecord[i].Percentage__c;
            console.log("percent**"+percent);
            per.push(percent);
        }
        console.log("per**",per);
        var sumOfPec = 0;
        for(var i in per){
            sumOfPec  = sumOfPec+parseInt(per[i]);
        }
        console.log("sumOfPec**",sumOfPec)
        if(sumOfPec <= 100){
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
        }
        else{
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'warning',
                message: 'Percentage cannot be exceeded 100',
                duration:' 5000',
                key: 'info_alt',
                type: 'warning',
                mode: 'dismissible'
            });
            toastEvent.fire();
        }
    },
    
    viewPicklist: function(component, event, helper) {
        var action = component.get("c.getPicklist");
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                console.log("resultDatapicklist**",resultData);
            }
        });
        $A.enqueueAction(action);
    },
})