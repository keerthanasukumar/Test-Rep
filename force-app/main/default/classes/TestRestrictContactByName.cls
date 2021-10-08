@isTest
public class TestRestrictContactByName {
    @isTest static void testMethod1(){
        List<Contact> conList = new List<contact>();
     	contact con1 = new Contact(LastName = 'Mary');   
        contact con2 = new Contact(LastName = 'INVALIDNAME');
        conList.add(con1);
        conList.add(con2);
        Test.startTest();
        Database.SaveResult[] res =	Database.insert(conList, false);
        system.debug('res'+res);
        Test.stopTest();
    }
}