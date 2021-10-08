public class BookingTriggerHandler {
	
    public void beforeUpdateTrigger(list<Booking__c> bookingList, Map<Id,Booking__c> bookingoldMap){
        system.debug('bookingList**'+bookingList);
        Set<id> villaId = new set<id>();     
    	Map<Id,String> bookingMap = new  Map<Id,String>();
                
        for(Booking__c book :bookingList ){
            villaId.add(book.Villa__c);
            if(book.Villa__c != Null && !bookingMap.containsKey(book.Villa__c )){
                String bookValue = String.valueOf(book.From_Date__c)+ '~' + String.valueOf(book.To_Date__c);
                bookingMap.put(book.Villa__c,bookValue);
            }
        }
       	system.debug('bookingMap***'+bookingMap); 
        
       	List<DATETIME> fromdate = new List<DATETIME>(); 
        List<DATETIME> Todate=new List<DATETIME>();
        for(String str :bookingMap.values()){
            system.debug(str.split('~'));
           List<String> fromdateandtodate = (str.split('~'));
           system.debug('fromdateandtodate**'+fromdateandtodate);
            fromdate.add(DateTime.valueOfGmt(fromdateandtodate[0]));
            Todate.add(DateTime.valueOfGmt(fromdateandtodate[1]));
        }  
        system.debug('fromdate**'+fromdate);
        system.debug('Todate**'+Todate);
        system.debug('villaId**'+villaId);
        system.debug('bookingMap**'+bookingMap);
        List<Booking__c> bookList = [SELECT id,	From_Date__c, To_Date__c ,Villa__c FROM Booking__c 
                                     Where Villa__c IN : villaId 
                                     AND ((From_Date__c = :fromdate OR To_Date__c =:Todate) OR To_Date__c >:fromdate)]; 
        system.debug('oldbookList'+bookList);
        set<id> vilaidset = new set<id>();
        if(bookList.size() > 0){
            for(Booking__C b :bookList) {
               vilaidset.add( b.Villa__c);
       		 }
        }
        
        if(!vilaidset.isEmpty() && vilaidset.size() >0){
       		
            for (Booking__c b :bookingList){
                if(vilaidset.contains(b.Villa__c)){
                b.addError('already have booked for villa on that date,Please choose others date');
            }
        }
    }
    }
}