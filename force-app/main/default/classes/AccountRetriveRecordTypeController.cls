public with sharing class AccountRetriveRecordTypeController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT AccountNumber, Id, Type, Name,RecordTypeId FROM Account 
            WHERE recordtypeid in (Select Id From RecordType where sobjecttype = 'Account' and name in ('Normal','Special'))
        WITH SECURITY_ENFORCED
    ];
        
    }
}