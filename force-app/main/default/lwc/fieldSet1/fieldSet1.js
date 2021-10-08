/*eslint no-console: “error”*/
import { LightningElement, api, wire, track } from 'lwc';
import getfieldsbyObject from '@salesforce/apex/FieldsetSearchController.getfieldsbyObject';
import getFieldLabel from '@salesforce/apex/FieldsetSearchController.getFieldLabel';
export default class FieldSet1 extends LightningElement {
    @api objectApiName;
    @api fieldSetNAme;
    @track resultsofFieldSet;
    @track inputChangesOfObjectApiName = '';
    @track inputChangesOfFieldSetName = '';
    @track columnFields = '';
    @track items=[];
    handleChanges(event) {
        console.log('hello');
        this.inputChangesOfObjectApiName = event.detail.value;
        console.log('inputChangesOfObjectApiName;;>>>>',this.inputChangesOfObjectApiName);
    }
    handleChangesFieldSet(evt) {
        console.log('Helloooo');
        this.inputChangesOfFieldSetName = evt.detail.value;
        console.log('inputChangesOfFieldSetName;;>>>>',this.inputChangesOfFieldSetName);
    }
    handleSearch() {
        console.log('inputChangesOfObjectApiName;;;',this.inputChangesOfObjectApiName);
        console.log('inputChangesOfFieldSetName;;>>>>',this.inputChangesOfFieldSetName);
        console.log('testing>>');
        if(this.inputChangesOfObjectApiName != '' && this.inputChangesOfFieldSetName != '') {
            console.log('testing');
            getfieldsbyObject({
                objectApiName:this.inputChangesOfObjectApiName,
                fieldSetName:this.inputChangesOfFieldSetName
                
            })
            .then(result => {
                console.log('result;;;',result);
                this.resultsofFieldSet = result;
                console.log('resultsofFieldSet;;;',this.resultsofFieldSet);
            })
            getFieldLabel({
                objectApiName:this.inputChangesOfObjectApiName,
                fieldSetName:this.inputChangesOfFieldSetName    
            })
            .then(result => {
                this.items = '';
                result.map(element=>{
                    this.items = [...this.items,{fieldName:element,
                    label:element}];
                });
                this.columnFields = this.items;
                console.log('columnFields;;',this.columnFields);
                console.log('result>>>',result);
            })

        }
        

    }
}