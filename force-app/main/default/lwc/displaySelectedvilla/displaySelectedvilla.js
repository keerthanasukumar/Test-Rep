import { LightningElement,api, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class DisplaySelectedvilla extends LightningElement {
    @api selectedVilla;
    @api selectedVillaId;
    chooseVilla;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        console.log('event fried **');
        registerListener('villaEvent', this.handleEvent, this)
        console.log("selectedvilla**",this.selectedVilla);
    }
    handleEvent(villa){
        console.log('eveng**',villa);
        this.selectedVilla=villa;
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
}