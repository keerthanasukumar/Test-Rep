({
	afterScriptsLoaded: function(cmp,evt,helper){
     console.log("***");
     var events = cmp.get("v.events");
        console.log("events####",events);
        console.log("!events.length**",!events.length);
        if(!events.length)
        {
         	console.log("jkkd");
            helper.fetchEvents(cmp);
        }
    },

})