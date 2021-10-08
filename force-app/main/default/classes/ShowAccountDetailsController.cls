public with sharing class ShowAccountDetailsController {
    @AuraEnabled
    public static Account saveAccount(Account account)
    {
     	system.debug('acc***'+account);
        upsert account;
        return account;
    }
}