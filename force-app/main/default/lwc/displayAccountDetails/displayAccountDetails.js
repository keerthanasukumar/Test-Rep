import { LightningElement, api , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getRecord} from 'lightning/uiRecordApi';
import RecordType_FIELD from '@salesforce/schema/Account.RecordType.Name';

export default class displayAccountDetails extends LightningElement {
    @api recordId;
    @api objectApiName;
    recordtype;
    isNormal = false;
    isSpecial = false;
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;
    account;
    @wire(getRecord, {recordId: '$recordId', fields: [RecordType_FIELD]})
        wiredaccounts({data,error}){
            console.log("data",data);
            console.log("error",error);
          if(data){
            this.account = data;
            if(this.account.fields.RecordType.displayValue === "Normal"){
                this.isNormal = true;
            }
            if(this.account.fields.RecordType.displayValue === "Special"){
                this.isSpecial = true;
            }
        }
    }
   

    
    
}