public with sharing class AccountDetailController {
    @AuraEnabled
    public static Account saveAccount(Account account)
    {
     	system.debug('acc***'+account);
        upsert account;
        return account;
    }
}