public class ContactSearch {
    public static List<contact> searchForContacts(String name, String MailingPostalCode){
        List<contact>  cont = [SELECT Id, lastname,MailingPostalCode FROM Contact WHERE lastname= :name and MailingPostalCode= :MailingPostalCode];
        system.debug('record'+cont);
        return[SELECT Id, lastname,MailingPostalCode FROM Contact WHERE lastname= :name and MailingPostalCode= :MailingPostalCode ];
    }
}