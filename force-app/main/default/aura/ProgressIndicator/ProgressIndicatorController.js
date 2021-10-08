({
	stage1Action : function(component, event, helper) {
		console.log('event**',event);
        component.set("v.stage1",true);
        component.set("v.stage2",false);
        component.set("v.stage3",false);
        component.set("v.stage4",false);
        component.set("v.stage5",false);
	},
    
    stage2Action : function(component, event, helper) {
		console.log('event**',event);
        component.set("v.stage1",false);
        component.set("v.stage2",true);
        component.set("v.stage3",false);
        component.set("v.stage4",false);
        component.set("v.stage5",false);
	},
    
    stage3Action : function(component, event, helper) {
		console.log('event**',event);
        component.set("v.stage1",false);
        component.set("v.stage2",false);
        component.set("v.stage3",true);
        component.set("v.stage4",false);
        component.set("v.stage5",false);
	},
    
    stage4Action : function(component, event, helper) {
		console.log('event**',event);
        component.set("v.stage1",false);
        component.set("v.stage2",false);
        component.set("v.stage3",false);
        component.set("v.stage4",true);
        component.set("v.stage5",false);
	},
    
    stage5Action : function(component, event, helper) {
		console.log('event**',event);
        component.set("v.stage1",false);
        component.set("v.stage2",false);
        component.set("v.stage3",false);
        component.set("v.stage4",false);
        component.set("v.stage5",true);
	},
})