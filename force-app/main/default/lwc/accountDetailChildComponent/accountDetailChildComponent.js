import { LightningElement , api , wire } from 'lwc';
import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
import RecordType_FIELD from '@salesforce/schema/Account.RecordType.Name'

const FIELDS = [
    'Account.Name',
    'Account.Website',
    'Account.Phone',
    'Account.Site',
];
export default class AccountDetailChildComponent extends LightningElement {
  @api recordid;
  @api recordType;
  @api FIELDS;
  @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
  account;
  get type() {
    return getFieldValue(this.account.data, RecordType_FIELD);
  }
}