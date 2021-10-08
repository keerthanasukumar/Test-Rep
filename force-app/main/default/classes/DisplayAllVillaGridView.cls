public with sharing class DisplayAllVillaGridView {
    @AuraEnabled
    public static List<Villa__c> getVillas() {
       return[SELECT Id, Name, No_Of_Rooms__c, Max_Accommodation__c, Cost_Per_Day__c,city__c FROM Villa__c Limit 20];
    }
}