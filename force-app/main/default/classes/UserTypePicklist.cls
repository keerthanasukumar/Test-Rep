public with sharing class UserTypePicklist {    
  public static map<String,String>  getActivePicklistFieldValues(String objName, String fieldName) {
    Set<String> picklistValueSet = new Set<String>();
    map<String,String> options = new map<String,String>();
    Map<String,Schema.SObjectField> fieldsMap = describeFields(objName);
    Schema.DescribeFieldResult fieldResult = fieldsMap.get(fieldName).getDescribe();
    System.debug('fieldResult**'+fieldResult);
    for (Schema.PicklistEntry pickListVal : fieldResult.getPicklistValues()) {
        if (pickListVal.isActive()) {
            picklistValueSet.add(pickListVal.getValue());
            options.put(pickListVal.getLabel(),pickListVal.getValue());
        }
    }
    System.debug('picklistValueSet**'+picklistValueSet);
    return options;
}

public static Map<String,Schema.SObjectField> describeFields(String objName) {
    Schema.DescribeSObjectResult objResult = Schema.getGlobalDescribe().get(objName).getDescribe();
    Map<String,Schema.SObjectField> fieldsMap = objResult.fields.getMap();
    return fieldsMap;
}
}