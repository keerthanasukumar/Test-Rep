({
	doInit: function(component, event, helper) { 
      var pageNumber = component.get("v.PageNumber");
        
      helper.getAccounts(component,pageNumber,helper); 
	},
    getSelected: function (cmp, evt, helper) {
        let selected = cmp.find('select').get('v.value');
        var pageNumber = cmp.get("v.PageNumber");
        console.log("selected**",selected);
        cmp.set("v.displayRecords",selected);
        helper.getAccounts(cmp,pageNumber,helper);
	},
    handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        pageNumber++;
        helper.getAccounts(component, pageNumber,helper);
    },
     
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.find("pageSize").get("v.value");
        pageNumber--;
        helper.getAccounts(component, pageNumber, pageSize);
    },
     
})