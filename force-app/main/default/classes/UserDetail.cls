public with sharing class UserDetail {
    @AuraEnabled
    public static Map<String,String> saveUser(User userRec)
    {
      Map<String,String> userResult = new  Map<String,String> ();
      system.debug('userrec***'+userRec);
        //insert userRec;
        Database.SaveResult userRecord = Database.insert(userRec, false);
        System.debug('userRecord'+userRecord);
        if (!userRecord.isSuccess()) {
          // Operation failed, so get all errors                
          for(Database.Error err : userRecord.getErrors()) {
            System.debug('The following error has occurred.');                    
            System.debug(err.getStatusCode() + ': ' + err.getMessage());
            String errors =  err.getMessage();
            userResult.put('error',errors);
            System.debug('userResult**'+ userResult);
            System.debug('errors**'+ errors);
            System.debug('Fields that affected this error: ' + err.getFields());
           }
      }
      else {
        userResult.put('success','inserted successfuly');
        System.debug('userResult**'+ userResult);
       }
       
       return userResult;
    }
}