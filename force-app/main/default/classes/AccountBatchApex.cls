global class AccountBatchApex implements Database.Batchable<sobject>{
     
    global Database.Querylocator start(Database.BatchableContext bc){
        system.debug('start method**');
        String soqlQuery = 'SELECT Name, AccountNumber, Type, Delivery_Priority__c  From Account';
        system.debug('soqlQuery**'+soqlQuery);
        return database.getquerylocator(soqlQuery);
    }
     
    global void execute(Database.BatchableContext bc, List<Account> scope){
        for(Account acc: scope){
            system.debug('scope**'+scope);
            if(acc.Delivery_Priority__c == Null){
                 system.debug('acc.Delivery_Priority__c*'+acc.Delivery_Priority__c);
            	acc.Delivery_Priority__c = 'Normal';
            }
            
        }
        system.debug('scope11**'+scope);
        upsert scope;
    }
     
    Public void finish(Database.BatchableContext bc){ 
    }
}