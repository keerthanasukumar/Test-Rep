public with sharing class AccountHandler {
    public static Account insertNewAccount(String str){
        try{
            Account acc=new Account(Name=str);
            insert acc;      
            return(acc);
            
        }
        catch(DMLException ex){
            system.debug('Error Message thrown::'+ex.getMessage());
            return(null);
            
        }
    }
}