public with sharing class SaveShareRecordController {
    @AuraEnabled
    public static List<Share__c> saveRec (List<Share__c> rec) {
        system.debug('rec**'+rec);
        if(rec.size() > 1){
            upsert rec;
        }
        return rec;
    }
    @AuraEnabled 
    public  static Share__c[] getShareRec(String conId) {
        system.debug('conId**'+conId);
        return [SELECT id, Name,Percentage__c  FROM Share__c where Contact__c =:conId];
    }
    
    @AuraEnabled
    public static String getPicklist(String pick) {
        Map<Object,List<String>> constructionPickList = new Map<Object,List<String>>();
        constructionPickList = DependentPicklist.getDependentPicklistValues(Share__c.Construction_Type__c);
        return  JSON.serialize(constructionPickList);
    }
}