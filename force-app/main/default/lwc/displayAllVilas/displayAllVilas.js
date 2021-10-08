import { LightningElement, api, track } from 'lwc';
import getVillas from '@salesforce/apex/DisplayVilla.getVillas';
import  {NavigationMixin } from 'lightning/navigation'; ///Navigation
import saveBooking from '@salesforce/apex/DisplayVilla.saveBooking';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
import villaWeatherController from '@salesforce/apex/VillaWeatherController.getWeather'
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/MyTableCSS';

const COLUMNS = [
    { label: 'Villa Name',fieldName:'url', type:'url', typeAttributes: {label: { fieldName:'Name' }},target: '_top'
     },
    { label: 'No of Rooms', fieldName:'No_Of_Rooms__c' , type: 'number' },
    { label: 'Max Accommodation ', fieldName:'Max_Accommodation__c', type: 'number' },
    { label: 'Cost PerDay', fieldName:'Cost_Per_Day__c', type: 'Currency' }
];

export default class DisplayAllVilas extends NavigationMixin (LightningElement) {
  
    columns = COLUMNS;
    fromDate;
    toDate;
    villasFillter;
    recordPageUrl;
    bookingPageUrl;
    showBookingModel = false;
    villaRecord;
    @track booking = {Confirming_Date__c: '',From_Date__c:'' , To_Date__c: '',Contact__c : '',No_of_People__c: '',Villa__c :''};
    @api header = 'Booking';
    @track loading = false;
    @track loadingModel = false;
    weather = '';
    temp = '';
    description ='';
    humidity ='';
    pressure ='';
    main ='';
    showWeatherModel =  false;


    connectedCallback() {
		loadStyle(this, ursusResources);
	}
    changeHandler(event) {
        console.log('event-->', event);
        console.log("event value***",event.target.value);
        if(event.target.name==='FromDate'){
          this.fromDate = event.target.value;
          console.log("this.fromDate**",this.fromDate);
        }
        if(event.target.name==='ToDate'){
            this.toDate = event.target.value;
            console.log("this.toDate**",this.toDate);
          }
    }

    searchVilla(event){
        console.log('event', event);
        console.log("this.fromDate**",this.fromDate);
        console.log("this.toDate**",this.toDate);
        this.loading = true; 
        getVillas({ fromdate : this.fromDate, todate : this.toDate })
        .then(result => {
            console.log("**saved**",result);
            let Villas = [];
            for(let i=0;i<result.length;i++){
                console.log('result[i].Name',result[i].Name);
                console.log('result[i].No_Of_Rooms__c',result[i].No_Of_Rooms__c);
                let obj = {};
                obj.id = result[i].Id;
                obj.url = `/lightning/r/Villa__c/${result[i].Id}/view`;
                obj.Name = result[i].Name;
                obj.noofroom = result[i].No_Of_Rooms__c;
                obj.Max_Accommodation__c = result[i].Max_Accommodation__c;
                obj.Cost_Per_Day__c = result[i].Cost_Per_Day__c;
                obj.city = result[i].city__c;
                console.log('obj**',obj);
                Villas.push(obj);
            }            
            console.log(' this.Villas**', Villas);
            
            this.villasFillter = Villas;
            this.loading = false;
        })
        console.log('villas**',this.villasFillter);
    }
    getweather(event){
        console.log('getweatherevent', event);
        console.log('recordid**',event.target.accessKey);
        let index = event.target.accessKey;
        console.log('currentRow**',this.villasFillter[index].id);
        villaWeatherController({villaId:this.villasFillter[index].id,fromdate : this.fromDate, todate : this.toDate})
        .then(result => {
            console.log("**saved**",result);  
            console.log('***',result.list[0].dt_txt);
            console.log('weathertemp**',result.list[0].main.temp);
            this.weather = result;
            console.log('***this.weather',this.weather);
            this.showWeatherModel = true;
            this.temp = this.weather.list[0].main.temp;
            this.humidity = this.weather.list[0].main.humidity;
            this.pressure = this.weather.list[0].main.pressure;
            this.description = this.weather.list[0].weather[0].description;
            this.main = this.weather.list[0].weather[0].main;
            
        }).catch(error => {
            console.log('error**',error);
        });
    }

    openVilla(event){
        console.log('event', event);
        console.log('recordid**',event.target.accessKey);
       
       let index = event.target.accessKey;
        console.log('id....**',this.villasFillter[index].id);
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId:this.villasFillter[index].id,
                objectApiName : 'Villa__c',
             actionName: 'view'
            }
        }).then(url => {
            this.recordPageUrl = url;
        });
       console.log('this.recordPageUrl**', this.recordPageUrl);
        
    }
    handleBooking(event){
        console.log('recordid**',event.target.accessKey);
        this.showBookingModel = true;
        let index = event.target.accessKey;
        this.villaRecord = this.villasFillter[index];
        console.log('currentRow**',villaRecord);
        
    }
    closeEventModal(event){
        this.showBookingModel = false;
        this.showWeatherModel = false;
    }
    handleChange(event){
        console.log('event-->', event);
        console.log("event value***",event.target.value);
        if(event.target.name==='confrimdate'){
         this.booking.Confirming_Date__c = event.target.value;
          console.log("Confirming_Date__c**", this.booking.Confirming_Date__c);
        }
          if(event.target.name==='con'){
            this.booking.Contact__c = event.target.value;
            console.log("this.booking.Contact__c**",this.booking.Contact__c);
          }
          if(event.target.name==='noofPeople'){
            this.booking.No_of_People__c = event.target.value;
            console.log("this.booking.No_of_People__c**",this.booking.No_of_People__c);
          }
    }
    handleSave(event){
        console.log('event**',event);
        console.log("booking**",this.booking);
        this.booking.Villa__c = this.villaRecord.id;
        this.booking.From_Date__c = this.fromDate;
        this.booking.To_Date__c = this.toDate;
        
        console.log("booking**",JSON.stringify(this.booking));
        saveBooking({book : this.booking}).then(result => {
            console.log("**inserted successfuly**");
            this.showBookingModel = false;
            console.log('result**',result);
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId:result.Id,
                    objectApiName : 'Booking__c',
                 actionName: 'view'
                }
            }).then(url => {
                this.bookingPageUrl = url;
                window.open(url);
            });
        }).catch(error => {
            console.log('error**',error);
            this.loadingModel = false;
            let errorMsg;
            if(error.body.fieldErrors.From_Date__c){
                if(error.body.fieldErrors.From_Date__c.length > 0){
                    errorMsg = error.body.fieldErrors.From_Date__c[0].message;
                }
            }
           if(error.body.fieldErrors.No_of_People__c){
            if(error.body.fieldErrors.No_of_People__c.length > 0){
                errorMsg = error.body.fieldErrors.No_of_People__c[0].message;
            }
           }
           if(error.body.fieldErrors.Confirming_Date__c){
            if(error.body.fieldErrors.Confirming_Date__c.length > 0){
                errorMsg = error.body.fieldErrors.Confirming_Date__c[0].message;
            }
           }
            const toastEvent = new ShowToastEvent({
                title: errorMsg,
                variant: "Error"
            });
            this.dispatchEvent(toastEvent);
            //this.showBookingModel = false;
        });
    }
    cancel(event){
        console.log("cancel**");
        this.showBookingModel = false;
        this.showWeatherModel = false;
        
    }
}