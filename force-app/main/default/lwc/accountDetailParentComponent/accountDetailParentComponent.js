import { LightningElement, api , wire } from 'lwc';
import RecordType_FIELD from '@salesforce/schema/Account.RecordType.Name'
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';


export default class AccountDetailParentComponent extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, AccountNumber_FIELD,AnnualRevenue_FIELD,Site_FIELD,RecordType_FIELD]})
    account;

    get type() {
        return getFieldValue(this.account.data, RecordType_FIELD);
    }
}