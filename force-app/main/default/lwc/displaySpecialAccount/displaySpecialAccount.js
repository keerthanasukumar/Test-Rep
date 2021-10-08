import { LightningElement, api  , wire, track} from 'lwc';
import { getRecord} from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Website_FIELD from '@salesforce/schema/Account.Website';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Site_FIELD from '@salesforce/schema/Account.Site';
import saveAccount from '@salesforce/apex/ShowAccountDetailsController.saveAccount';

export default class displaySpecialAccount extends LightningElement {
    @api recordId;
    @track resultData;
    isEditable = false;
    
    @track acc = {};
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, Website_FIELD,Phone_FIELD,Site_FIELD]})
    wiredaccounts({data,error}){
        console.log("data",data);
        console.log("error",error);
      if(data){
        console.log("data**",data.fields.Name.value);
        this.acc = {'Name' : data.fields.Name.value, 'Website' : data.fields.Website.value, 'Phone' : data.fields.Phone.value, 'Site' : data.fields.Site.value };
        console.log("namedata####@",this.acc.Name);
      }  
    }
    
    changeHandler(event) {
        console.log('event-->', event);
        console.log("event value***",event.target.value);
        if(event.target.name==='accName'){
          this.acc.Name = event.target.value;
          console.log("name**",this.acc.Name);
        }else  if(event.target.name ==='website'){
          this.acc.Website = event.target.value;
        }else  if(event.target.name.value ==='phone'){
          this.acc.Phone = event.target.value;
        }else  if(event.target.name ==='accSite'){
          this.acc.Site = event.target.value;
        }
      }
    editRecords(event){
        console.log("***Edit***");
        this.isEditable = true;
    }
    saveRecord(event) {
      console.log("accountlist"+JSON.stringify(this.acc));
      console.log('event', event);
      this.acc.Id = this.recordId;
      saveAccount({ account : this.acc})
      .then(result => {
             console.log("fdajf",JSON.stringify(this.acc));
             this.acc = {};
             console.log("fdajfooo",this.acc);
             this.acc = result;
             console.log("**saved**",result);
      })
      .catch(error => {
             console.log(error);
      });
    }
}