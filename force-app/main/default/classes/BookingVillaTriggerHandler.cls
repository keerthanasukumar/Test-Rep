public class BookingVillaTriggerHandler {

    public void beforeInsertTrigger(list<Booking__c> bookingList){
        Set<id> villaId = new set<id>(); 
        Map<Id,set<String>> oldbookingMap = new  Map<Id,set<String>>();
        set<String> olddates = new set<string>();
        
        for(Booking__c book :bookingList ){
            villaId.add(book.Villa__c);
        }
        system.debug('villaId'+villaId);
        
        List<Booking__c> oldbookList = [SELECT id,	From_Date__c, To_Date__c ,Villa__c FROM Booking__c 
                                        Where Villa__c IN : villaId];
        List<Booking__c> oldbookList1 = [SELECT id,	From_Date__c, To_Date__c ,Villa__c FROM Booking__c 
                                        ];
        system.debug('oldbookList**'+oldbookList);
        system.debug('oldbookList**'+oldbookList1);
        
        for(Booking__c oldbook :oldbookList){
            if(!oldbookingMap.containsKey(oldbook.Villa__c )){
                olddates.add(String.valueOf(oldbook.From_Date__c)+ '~' + String.valueOf(oldbook.To_Date__c));
                oldbookingMap.put(oldbook.Villa__c,olddates);
            }
            else{
                olddates.add(String.valueOf(oldbook.From_Date__c)+ '~' + String.valueOf(oldbook.To_Date__c));
                oldbookingMap.put(oldbook.Villa__c,olddates);
            }
        }
        system.debug('oldbookingMap**'+oldbookingMap);
        
        for(Booking__c book :bookingList ){
            if(oldbookingMap.containsKey(book.Villa__c)){ 
            	for(string dates :oldbookingMap.get(book.Villa__c)){
                	system.debug('dates**'+ dates);
                	List<String> fromdateandtodate = (dates.split('~'));
          	 		system.debug('fromdateandtodate**'+fromdateandtodate);
            		if(((DateTime.valueOfGmt(fromdateandtodate[0]) <= book.From_Date__c && DateTime.valueOfGmt(fromdateandtodate[1]) >= book.From_Date__c) 
                   	|| (DateTime.valueOfGmt(fromdateandtodate[0]) <=book.To_Date__c && DateTime.valueOfGmt(fromdateandtodate[1]) >= book.To_Date__c)) 
                       ){
                	   book.addError('already have booked for villa on that date,Please choose others date') ;
                }
            }
            }
        }
    }
    /*public void beforeInsertTrigger(list<Booking__c> bookingList){
        Set<id> villaIdSet = new set<id>(); 
        
        for(Booking__c book :bookingList ){
            villaIdSet.add(book.Villa__c);
        }
        if(villaIdSet.size() > 0 ){
			List<Booking__c> oldbookList1 = [SELECT id,	From_Date__c, To_Date__c ,Villa__c FROM Booking__c 
                                             WHERE Villa__c IN :villaIdSet  
                                        ];
        }	
    }*/
}