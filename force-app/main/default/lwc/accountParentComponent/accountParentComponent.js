import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import RecordType_FIELD from '@salesforce/schema/Account.RecordType.Id';

export default class AccountParentComponent extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: [RecordType_FIELD]})
    acc;
    get type() {
        return getFieldValue(this.acc.data, RecordType_FIELD);
    }
}