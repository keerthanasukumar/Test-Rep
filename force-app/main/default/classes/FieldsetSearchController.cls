public with sharing class FieldsetSearchController {

    public static List<Schema.FieldSetMember> getFields(String obj, String fieldSetName) {
        
        System.debug('obj;;;'+obj);
        System.debug('fieldSetName;;;'+fieldSetName);
        System.debug('(SObject)Type.forName(obj).newInstance();;'+((SObject)Type.forName(obj).newInstance()).getSObjectType().getDescribe());
        System.debug('lastreturn;;'+((SObject)Type.forName(obj).newInstance()).getSObjectType().getDescribe().FieldSets.getMap().get(fieldSetName).getFields());
        return ((SObject)Type.forName(obj).newInstance()).getSObjectType().getDescribe().FieldSets.getMap().get(fieldSetName).getFields();
    }
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> getfieldsbyObject(String objectApiName,String fieldSetName) {
        
        System.debug('objectApiName;;;'+objectApiName);
        System.debug('fieldSetName;;;'+fieldSetName);
        String query = 'SELECT ';
        for(Schema.FieldSetMember f : FieldsetSearchController.getFields(objectApiName, fieldSetName )) {
            query += f.getFieldPath()+',';
        }
        System.debug('query;;;'+query);
        query +='Id From '+objectApiName+' LIMIT 5';
        System.debug('queryfinal;;;'+query);
        return Database.query(query);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<String> getFieldLabel(String objectApiName,String fieldSetName) {
        
        String labelString = '';
        List<String> labelList = new List<String>();
        System.debug('objectApiNameLabel;;;'+objectApiName);
        System.debug('fieldSetNameLabel;;;'+fieldSetName);
        for(Schema.FieldSetMember f : FieldsetSearchController.getFields(objectApiName, fieldSetName )) {
            labelString += f.getFieldPath()+',';
        }
        System.debug('labelString;;'+labelString);
        labelString = labelString.removeEnd(',');
        for(String sc : labelString.split(',')) {
            labelList.add(sc);  
        }
        System.debug('labelList;;'+labelList);
        return labelList;
    }
    

}