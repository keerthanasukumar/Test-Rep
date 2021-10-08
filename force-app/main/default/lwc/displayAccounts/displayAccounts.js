import { LightningElement , wire } from 'lwc';
import Name_FIELD from '@salesforce/schema/Account.Name';
import AccountNumber_FIELD from '@salesforce/schema/Account.AccountNumber';
import AnnualRevenue_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import getAccounts from '@salesforce/apex/AccountRetriveRecordTypeController.getAccounts';
const COLUMNS = [
    { label: 'First Name', fieldName: Name_FIELD.fieldApiName, type: 'text' },
    { label: 'Account Name', fieldName: AccountNumber_FIELD.fieldApiName, type: 'text' },
    { label: 'Annual Revenue', fieldName: AnnualRevenue_FIELD.fieldApiName, type: 'text' }
];
export default class DisplayAccounts extends LightningElement {
    columns = COLUMNS;
    @wire(getAccounts)
        acc;
}