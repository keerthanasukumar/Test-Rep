import { LightningElement,api,wire } from 'lwc';
import {fireEvent} from 'c/pubsub' ;
import { CurrentPageReference } from 'lightning/navigation';

const TILE_WRAPPER_SELECTED_CLASS = "tile-wrapper selected";
const TILE_WRAPPER_UNSELECTED_CLASS = "tile-wrapper";

export default class Villataile extends LightningElement {
    @api villa;
    @api villaIndex;
    @api selectedVillaId;
    bgclr  = false;
    clientX ;
    clientY; 
    selected = false;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        console.log('villa child **',JSON.stringify(this.villa));
      //console.log('@api selectedVillaId;',this.selectedVillaId);
        
    }
    handleVilla(event){
        console.log('event@@@',event);
        console.log('index**', this.villaIndex);
        event.stopPropagation();
        event.target.classList.toggle('selected');
        this.unselect(event.target);
        this.selected = event.target;
        fireEvent(this.pageRef,'villaEvent',this.villa);
        //this.selectedVillaId = this.villa.Id;
        /*console.log('@api selectedVillaId;',this.selectedVillaId);
        const selectedEvent = new CustomEvent('tileclick', { detail: {selectedVillaId: this.villa.Id }});
        this.dispatchEvent(selectedEvent);
        console.log('@api selectedVillaId;',this.selectedVillaId);*/
    }
    get tileClass() {
        return this.selectedVillaId ? TILE_WRAPPER_SELECTED_CLASS : TILE_WRAPPER_UNSELECTED_CLASS;
     }
    unselect(target){
        if (this.selected && this.selected !== target) {
            this.selected.classList.remove('selected');
            event.target.classList.toggle('tile-wrapper');
            this.selected = null;
        }
    }
}