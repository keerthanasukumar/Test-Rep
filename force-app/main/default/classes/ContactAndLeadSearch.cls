public class ContactAndLeadSearch {
    public static List<List< SObject>> searchContactsAndLeads(String searchkey){
        List<List< SObject>> searchList = [FIND :searchkey IN ALL FIELDS
                   RETURNING Contact(LastName,FirstName ),Lead(FirstName,LastName)];
        
        List<Contact> conList = (Contact[])searchList[0];
        List<Lead> leadList = (Lead[])searchList[1];
        for(Contact con :conList){
            system.debug('Contact List');
            system.debug('lastname'+con.LastName);
            system.debug('FirstName'+con.FirstName);
        }
         for(Lead con :leadList){
             system.debug('LEAD List');
            system.debug('lastname'+con.LastName);
            system.debug('FirstName'+con.FirstName);
        }
        return searchList;
    }
}