public  class ContactTriggerHandler {
    public void afterInsertTrigger(List<contact> conList){
    Map<id,contact> ContactMap = new map<id,contact>();
   	Set<Id> accountId = new Set<id>();
        
        for(contact con :conList) {
            if(con.AccountId != Null && !ContactMap.containsKey(con.AccountId)){
            	ContactMap.put(con.AccountId,con);
            }
        }
        for(Id acc :ContactMap.keySet()){
            accountId.add(acc);
        }
       
        List<Account> accList = [SELECT id, Name, Primary_Contact__c FROM Account WHERE Id =:accountId ];
        system.debug('accList**'+accList);
        
        for(account acct :accList){
           system.debug('conmap'+ContactMap.get(acct.Primary_Contact__c));
            if(ContactMap.containsKey(acct.Id)){
            	acct.Primary_Contact__c =  ContactMap.get(acct.Id).Id;
            }
        }
        if(accList.size() > 0){
        	update accList;
        }
    }
    
    public void beforeInsertTrigger(List<Contact> contactList){
	Set<Id> accIdSet = new Set<Id>();
	Set<Id> contAccIdSet = new Set<Id>();
	  for(contact con :contactList) {
		if(con.AccountId != null){
            system.debug('accID**'+ con.AccountId);
	  		accIdSet.add(con.AccountId);
            con.Is_Primary__c = true;
		}
     }
	List<Contact> conList = [SELECT Id, Name, AccountId, Is_Primary__c  FROM Contact WHERE AccountId IN : accIdSet and 	Is_Primary__c = true];
	system.debug('conList**'+conList);
        for( Contact con :conList){
		contAccIdSet.add(con.AccountId);
	}
    if(!contAccIdSet.isEmpty()){
 		for(contact con :contactList ) {
           if(con.AccountId != null && contAccIdSet.contains(con.AccountId)){
				con.addError('Already Account selected to another primary contact');
           }
    	}
	}
	
	}
    
    public void beforeUpdate(Map<Id,Contact> oldConMap,List<Contact> newcontactList){
	system.debug('beforeUpdate***'+oldConMap);
        for(Contact con: newcontactList){
            system.debug('conisprim'+con.Is_Primary__c);
		if(con.AccountId!=null && oldConMap.get(con.Id).Is_Primary__c != true && con.Is_Primary__c == false){
			con.Is_Primary__c =true;
		}else if(con.AccountId!=null && oldConMap.get(con.Id).Is_Primary__c == true && con.Is_Primary__c == false){
			con.Is_Primary__c = false;
		}
            
	}
	}
}