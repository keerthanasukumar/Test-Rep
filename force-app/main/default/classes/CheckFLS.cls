public class CheckFLS {

    public enum CRUD_FLS_TYPE {
        ISACCESSIBLE,
        ISQUERYABLE,
        ISCREATEABLE,
        ISUPDATEABLE,
        ISDELETABLE
    }
    
    //The custom objects and fields should be appended with namespace prefix
    public static Map<String, Set<String>> ignoredFieldsFromFLSMap = new Map<String, Set<String>>();
    public static string accessFailedToField;
    public static String orgNamespace = ''; //Utility.getNameSpacePrefix();
    public static Set<String> systemFields = new Set<String> {'Id', 'CreatedDate', 'LastModifiedDate'};
        
    public Static boolean isAuthorizedToCreate(string sobjectAPIname, List<String> fieldNames) {
            
            Schema.DescribeSobjectResult[] results;
            Map<String,Schema.SObjectField> mapOfFields = new Map<String,Schema.SObjectField>();
            
            if(String.isNotBlank(sobjectAPIname) == TRUE && fieldNames != null && fieldNames.isEmpty() == FALSE) {
                
                String orgNamespace = '';
                orgNamespace = Utility.getNameSpacePrefix();
                
                /*Checking and concatenating namepsace prefix */
                    if(String.isNotBlank(orgNamespace) == TRUE && sobjectAPIname.startsWithIgnoreCase(orgNamespace) == FALSE
                       && sobjectAPIname.endsWithIgnoreCase('__c') == TRUE) {
                           
                           sobjectAPIname = orgNamespace + sobjectAPIname;
                       }
                results = Schema.describeSObjects(new list<string>{sobjectAPIname});
                Schema.DescribeSObjectResult objDesc = results.size()>0 ? results[0] : null;
                
                if(objDesc!=null ){
                    
                    if(!objDesc.isCreateable()){
                        
                        return false;
                    }
                    mapOfFields = objDesc.fields.getMap();
                    for (String f : fieldNames) {
                        
                        string mainField = f;
                        
                        /* Concatenating namespace prefix if field not having */
                            if (String.isNotBlank(orgNamespace) == TRUE && f.startsWithIgnoreCase(orgNamespace) == FALSE
                                && f.endsWithIgnoreCase('__c') == TRUE) {
                                    
                                    f = orgNamespace + f;
                                }
                        
                        if ((ignoredFieldsFromFLSMap.containsKey(sobjectAPIname) == True
                             && ignoredFieldsFromFLSMap.get(sobjectAPIname).contains(f)) == False) {
                                 
                                 Schema.SObjectField sObjectFld = mapOfFields.get(f.ToLowerCase());
                                 
                                 if (sObjectFld == null) {
                                     
                                     sObjectFld = mapOfFields.get(mainField);
                                 }
                                 
                                 if (sObjectFld == null) {
                                     
                                     accessFailedToField = 'Invalid field : '+f+' for an Object :'+sobjectAPIname;
                                     return false;
                                 } else if (!sObjectFld.getDescribe().isCreateable()){
                                     
                                     accessFailedToField = ' No Create Access for field : '+f+', On Sobject : '+sobjectAPIname;
                                     return false;
                                 }
                             }
                    }
                    return true;
                } else {
                    
                    return false;
                }
            } else {
                
                return false;
            }
        }
    
    /*To check the current user permission for update the sobject and their fieldValues */
    public static boolean isAuthorizedToUpdate(string sobjectAPIname, List<String> fieldNames) {
        
        Schema.DescribeSobjectResult[] results;
        Map<String,Schema.SObjectField> mapOfFields = new Map<String,Schema.SObjectField>();
        
        if(String.isNotBlank(sobjectAPIname) == TRUE && fieldNames != null && fieldNames.isEmpty() == FALSE) {
            
            String orgNamespace = '';
            orgNamespace = Utility.getNameSpacePrefix();
            
            /* Checking and concatenating namepsace prefix */
                if(String.isNotBlank(orgNamespace) == TRUE && sobjectAPIname.startsWithIgnoreCase(orgNamespace) == FALSE
                   && sobjectAPIname.endsWithIgnoreCase('__c') == TRUE) {
                       
                       sobjectAPIname = orgNamespace + sobjectAPIname;
                   }
            
            results = Schema.describeSObjects(new list<string>{sobjectAPIname});
            Schema.DescribeSObjectResult objDesc = results.size()>0 ? results[0] : null;
            
            if(objDesc!=null ){
                
                if(!objDesc.isUpdateable()){
                    
                    return false;
                }
                mapOfFields = objDesc.fields.getMap();
                
                for (String fieldApi : fieldNames) {
                    
                    /* Concatenating namespace prefix if field not having */
                        if (String.isNotBlank(orgNamespace) == TRUE && fieldApi.startsWithIgnoreCase(orgNamespace) == FALSE
                            && fieldApi.endsWithIgnoreCase('__c') == TRUE
                            && mapOfFields.containsKey(orgNamespace + fieldApi.ToLowerCase()) == TRUE) {
                                
                                fieldApi = orgNamespace + fieldApi;
                            }
                    
                    if ((ignoredFieldsFromFLSMap.containsKey(sobjectAPIname) == True
                         && ignoredFieldsFromFLSMap.get(sobjectAPIname).contains(fieldApi)) == False) {
                             
                             Schema.SObjectField sObjectFld = mapOfFields.get(fieldApi.ToLowerCase());
                             
                             if (sObjectFld == null) {
                                 
                                 accessFailedToField = 'Invalid field : '+fieldApi+' for an Object :'+sobjectAPIname;
                                 return false;
                             } else if (!sObjectFld.getDescribe().isUpdateable()){
                                 
                                 accessFailedToField = ' No Update Access for field : '+fieldApi+', On Sobject : '+sobjectAPIname;
                                 return false;
                             }
                         }
                }
                return true;
            } else {
                
                return false;
            }
        } else {
            
            return false;
        }
    }
    
    /*To check CRUD permission for Delete the sobject record */
    public static Boolean checkCRUD(String sObjectName, CRUD_FLS_TYPE methodType) {
        
        String orgNamespace = '';
        orgNamespace = Utility.getNameSpacePrefix();
        if(!sObjectName.contains(orgNamespace)){
            sObjectName = orgNamespace + sObjectName;
        }
        List<String> objects = new List<String>();
        objects.add(sobjectName);
        List<schema.DescribeSObjectResult> results = Schema.describeSObjects(objects);
        
        if (methodType == CRUD_FLS_TYPE.ISDELETABLE) {
            return results[0].isDeletable();
        }
        return false;
    }
    
    
}