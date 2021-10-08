({
    
    loadDataToCalendar :function(data){        
      console.log("data&&&",data);
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: '2020-07-1',
            editable: true,
            eventLimit: true,
            events: data
        });    
    },
    tranformToFullCalendarFormat : function(component,events) {
        var eventArr = [];
        console.log("events.length***",events.length);
        for(var i = 0;i < events.length;i++){
            
            console.log('events[i].StartDateTime8888',$A.localizationService.formatDate(events[i].StartDateTime,"MMM dd yyyy, hh:mm:ss a"));
            eventArr.push({
                'id':events[i].Id,
                'start': $A.localizationService.formatDate(events[i].StartDateTime,"MMM dd yyyy, hh:mm:ss a"),
                'end':$A.localizationService.formatDate(events[i].EndDateTime,"MMM dd yyyy, hh:mm:ss a"),
                'title':events[i].Subject
            });
        }
        component.set("v.events",eventArr);
        console.log("@@@@",eventArr);
        return eventArr;
    },
    fetchEvents : function(component) {
        console.log("jkkd222");
        var action = component.get("c.getEvents"); 
        var self = this;
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("state**",state);
            if(component.isValid() && state === "SUCCESS"){
                var eventArr = self.tranformToFullCalendarFormat(component,response.getReturnValue());
                console.log("eventArr**",eventArr);
                self.loadDataToCalendar(eventArr);
                component.set("v.events",eventArr);
            }
        });
        $A.enqueueAction(action); 
    }, 
})