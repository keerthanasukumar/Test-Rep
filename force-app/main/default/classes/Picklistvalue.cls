public with sharing class Picklistvalue {
    @AuraEnabled
    public static map<String,String> getUserTypePicklist() {
        map<String,String> options = new map<String,String>();
                
           Schema.DescribeFieldResult fieldResult = User.UserType.getDescribe();
           system.debug('fieldResult**'+fieldResult);
           List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
           system.debug('ple**'+ple);
           for( Schema.PicklistEntry f : ple)
           {
              options.put(f.getLabel(),f.getValue());
           }       
           system.debug('options**'+options);
           return options;
        }
        
}