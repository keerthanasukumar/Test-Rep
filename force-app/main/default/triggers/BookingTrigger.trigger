trigger BookingTrigger on Booking__c (Before insert, before Update) {
    
    BookingVillaTriggerHandler bv = new BookingVillaTriggerHandler();
   /* if(Trigger.isBefore && (Trigger.isUpdate || Trigger.isInsert)){
        system.debug('isbefore and isinsert');
        bth.beforeUpdateTrigger(Trigger.new, Trigger.oldMap);
    }*/
    /*if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate )){
        bv.beforeInsertTrigger(Trigger.new, Trigger.oldMap);
    }*/}