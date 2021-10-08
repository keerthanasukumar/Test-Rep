({
 afterScriptsLoaded: function(cmp,evt,helper){
     console.log("***");
     var events = cmp.get("v.events");
        console.log(events);
     	console.log("!events.length**",events.length);
            helper.loadDataToCalendar(cmp);
    },
})