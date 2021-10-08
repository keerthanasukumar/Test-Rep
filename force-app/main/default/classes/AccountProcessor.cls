public class AccountProcessor {
    @future
    public static void countContacts(List<ID> accIds){
        List<Account> listacc = [SELECT id,Number_of_Contacts__c,(SELECT id from contacts) from account where id in : accIds];
        for (account acc : listacc){
            List<Contact> con = acc.contacts;
            acc.Number_of_Contacts__c = con.size();
        }
        update listacc;
    }

}