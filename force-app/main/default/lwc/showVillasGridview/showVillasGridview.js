import { LightningElement,track,api } from 'lwc';

import getVillas from '@salesforce/apex/DisplayAllVillaGridView.getVillas';
export default class ShowVillasGridview extends LightningElement {
    @track villa;
    @track  selectedVilla = '';
    connectedCallback(){
        getVillas()
        .then(result => {
           console.log("**saved**",result);
           this.villa = result;
        });
    }
    handleSelectedVilla(evt) {
        // This component wants to emit a productselected event to its parent
        console.log('parent**');
        console.log(evt.detail);
        console.log("evt.detail.selectedVillaId**",evt.detail.selectedVillaId)
        this.selectedVilla = evt.detail.selectedVillaId;
        console.log('this.selectedvilla**',this.selectedVilla);
        this.sendMessageService(this.selectedVilla);
       
    }
}