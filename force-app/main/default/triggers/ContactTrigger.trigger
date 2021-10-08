trigger ContactTrigger on Contact (before insert, after insert, after update, before update ) {
    ContactTriggerHandler conTH = new ContactTriggerHandler();
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
        system.debug('Trigger.new'+Trigger.new);
        conTH.afterInsertTrigger(Trigger.new);
   }
    if(Trigger.isBefore && Trigger.isInsert){
		system.debug('isbefore and isinsert');
        conTH.beforeInsertTrigger(Trigger.new);
    }
    if(Trigger.isBefore && Trigger.isUpdate){
        system.debug('isBeforeisUpdate old'+Trigger.oldMap);
        system.debug('isBeforeisUpdate new'+Trigger.new);
        conTH.beforeUpdate(Trigger.oldMap,Trigger.new);
    }
}