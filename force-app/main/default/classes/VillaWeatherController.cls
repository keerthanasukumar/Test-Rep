public with sharing class VillaWeatherController {
  /*  public String city {get;set;}
	public String temp {get;set;}
	public String pressure {get;set;}
	public String humidity {get;set;}
	public String temp_min {get;set;}
	public String temp_max {get;set;}*/
	@AuraEnabled 
	public static Map<String,Object> getWeather(Id villaId,DateTime fromdate, Datetime todate) {
		
		Villa__c villa = [SELECT Id, city__c FROM Villa__c WHERE Id =:villaId];
		
		String VillaCity = villa.city__c;
		system.debug('VillaCity**'+VillaCity);
		String apiKey = '56f7d9bce34931a9b0fa7274a9fb5e4d';
		//https://api.openweathermap.org/data/2.5/forecast?q=${VillaCity}&appid=56f7d9bce34931a9b0fa7274a9fb5e4d0&units=imperial
		String requestEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
		requestEndpoint += '?q=' + VillaCity;
		requestEndpoint += '&APPID=' + apiKey;
		requestEndpoint += '&units=metric';
		
		
		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint(requestEndpoint);
		request.setMethod('GET');
		HttpResponse response = http.send(request);
 
		// If the request is successful, parse the JSON response.
		if (response.getStatusCode() == 200) {
 
		   // Deserialize the JSON string into collections of primitive data types.
		Map<String,Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
			system.debug('results**'+results);
	  	    String city = String.valueOf(results.get('list'));
			  system.debug('resultscity**'+city);
		   //Map<String,Object> mainResults = (Map<String,Object>)(results.get('list'));
		  // String  temp = String.valueOf(mainResults.get('temp'));
		   /*String   pressure = String.valueOf(mainResults.get('pressure'));
		   String	humidity = String.valueOf(mainResults.get('humidity')); 
		   String	temp_min = String.valueOf(mainResults.get('temp_min')); 
		   String	temp_max = String.valueOf(mainResults.get('temp_max'));*/
		   return results;
		} 
		else {
			return null;
		}

		}

}