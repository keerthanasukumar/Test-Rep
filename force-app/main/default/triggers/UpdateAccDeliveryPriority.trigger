trigger UpdateAccDeliveryPriority on Account (before insert,before update) {
	List<Account> accNewList = new List<Account>();
    AccountBatchApex objBatch = new AccountBatchApex();
    for(Account acc : trigger.new){
        if(acc.Delivery_Priority__c == Null){
            accNewList.add(acc);
        }
    }
    system.debug(accNewList+'accNewList**');
    if(accNewList.size() > 0){
      if(Trigger.isBefore && (Trigger.isUpdate || Trigger.isInsert)){
      	system.debug('objBatch**'+objBatch);
       	Database.executebatch(objBatch,200);
        }
    }          
}