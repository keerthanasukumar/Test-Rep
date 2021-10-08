public class TestRecordAcc {
	@AuraEnabled
    public static Account saveRec (Account acc) {
        system.debug('rec**'+acc);
        //system.debug('booking**'+acc);
        //List<Account> accList = [SELECT id,booking__c FROM Account WHERE id = :recordId];
        if(acc != null){
            //accList[0].booking__c = booking ;
            update acc ;
        }
        return acc;
    }
}