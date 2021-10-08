public with sharing class DisplayVilla {
@AuraEnabled(cacheable=true)
    public static List<Villa__c> getVillas(DateTime fromdate, Datetime todate) {
    set<Id> vilaIdSet = new set<Id> ();
   
    for(Booking__c b : [SELECT id,	From_Date__c, To_Date__c ,Villa__c FROM Booking__c
                        WHERE (From_Date__c <= :todate AND To_Date__c >= :fromdate)
                        ]){
        vilaIdSet.add(b.Villa__c);   
    }
    System.debug('vilaIdSet**'+vilaIdSet);
    System.debug('vilaIdSetSize**'+vilaIdSet.size());
    List<Villa__c> avlVillaList = [SELECT Id, Name, No_Of_Rooms__c, Max_Accommodation__c, Cost_Per_Day__c,city__c FROM Villa__c
                                   WHERE Id NOT IN :vilaIdSet
                                  ];
    System.debug('villaList**'+avlVillaList);
    System.debug('size()'+ avlVillaList.size());    
    return avlVillaList;
  }
  @AuraEnabled
    public static Booking__c saveBooking(Booking__c book)
    {
     	system.debug('booking***'+book);
        insert book;
        return book;
    }
}