import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import AccountNumber_FIELD from '@salesforce/schema/Account.AccountNumber';
import AnnualRevenue_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import Site_FIELD from '@salesforce/schema/Account.Site';
import RecordType_FIELD from '@salesforce/schema/Account.RecordType.Name';
import saveAccount from '@salesforce/apex/ShowAccountDetailsController.saveAccount';

export default class DisplayAccountNormalDetail extends LightningElement {
    @api recordId;
    @track resultData;
    isEditable = false;
    showEditBtn = 'slds-float_right';
    showParagraph = 'slds-m-around_medium';
    showEdit = 'slds-text-heading_small slds-card_boundary';

    @track acc = {};
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, AccountNumber_FIELD,AnnualRevenue_FIELD,Site_FIELD,RecordType_FIELD]})
    wiredaccounts({data,error}){
        console.log("data",data);
        console.log("error",error);
      if(data){
        console.log("data**",data.fields.Name.value);
        this.acc = {'Name' : data.fields.Name.value, 'AccountNumber' : data.fields.AccountNumber.value, 'AnnualRevenue' : data.fields.AnnualRevenue.value, 'Site' : data.fields.Site.value };
        console.log("namedata####@",this.acc.Name);
      }  
    }
    
    changeHandler(event) {
        console.log('event-->', event);
        console.log("event value***",event.target.value);
        if(event.target.name==='accName'){
          this.acc.Name = event.target.value;
          console.log("name**",this.acc.Name);
        }else  if(event.target.name ==='accNo'){
          this.acc.AccountNumber = event.target.value;
        }else  if(event.target.name.value ==='accRev'){
          this.acc.AnnualRevenue = event.target.value;
        }else  if(event.target.name ==='accSite'){
          this.acc.Site = event.target.value;
        }
    }
    editRecords(event){
        console.log("***Edit***");
        this.isEditable = true;
        this.showEditBtn = 'slds-hide';
        this.showParagraph = 'slds-hide';
        this.showEdit = 'slds-text-heading_small slds-card_boundary';
    }
    saveRecord(event) {
      console.log("accountlist"+JSON.stringify(this.acc));
      console.log('event', event);
      //console.log('account name',this.account[0].Name);

      this.acc.Id = this.recordId;
      saveAccount({ account : this.acc})
      .then(result => {
             console.log("fdajf",JSON.stringify(this.acc));
             this.acc = {};
             console.log("fdajfooo",this.acc);
             this.acc = result;
             console.log("**saved**",result);
             this.showEditBtn = 'slds-float_right';
             this.showParagraph = 'slds-m-around_medium';
             this.showEdit = 'slds-hide';
      })
      .catch(error => {
             console.log(error);
      });
    }
    Cancel(event){
      console.log("**cancel**");
      this.showEdit = 'slds-hide';
      this.showParagraph = 'slds-m-around_medium';
    }
}