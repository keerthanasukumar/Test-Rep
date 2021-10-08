public with sharing class UserPicklists {
   @AuraEnabled
   public static Map<String, Map<String, String>> getUserPicklist(){
    map<String,String> options = new map<String,String>();
    map<String,String> options1 = new map<String,String>();
    map<String,String> options2 = new map<String,String>();
    map<String,String> options3 = new map<String,String>();
    map<String,String> options4 = new map<String,String>();
   
    Map<String, Map<String, String>> picklistOption = new Map<String, Map<String, String>>();   

    options = UserTypePicklist.getActivePicklistFieldValues('User','UserType');
    options1= UserTypePicklist.getActivePicklistFieldValues('User','EmailEncodingKey');
    options2= UserTypePicklist.getActivePicklistFieldValues('User','TimeZoneSidKey');
    options3= UserTypePicklist.getActivePicklistFieldValues('User','LocaleSidKey');
    options4= UserTypePicklist.getActivePicklistFieldValues('User','LanguageLocaleKey');
    
    picklistOption.put('UserType',options);
    picklistOption.put('EmailEncodingKey',options1);
    picklistOption.put('TimeZoneSidKey',options2);
    picklistOption.put('LocaleSidKey',options3);
    picklistOption.put('LanguageLocaleKey',options4);
    
    system.debug('***@@'+options);
    system.debug('***@@'+options1);
    system.debug('***@@'+options2);
    system.debug('***@@'+options3);
    system.debug('***@@'+options4);
   
    return picklistOption;
   }
}