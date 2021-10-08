public class CaseCalendarController {
    @AuraEnabled
    public static List<Event> getEvents(){
        List<Event> eventList = [SELECT AccountId,EndDateTime,Id,StartDateTime,Subject FROM Event];
        system.debug('eventList***@@@'+eventList);
        return [SELECT AccountId,EndDateTime,Id,StartDateTime,Subject FROM Event];
    }
}