import { LightningElement, track } from 'lwc';
//import BaseUtilityElement from 'c/utilityLwc';

export default class ProjectLwc extends LightningElement {


    @track showToastMsg = false;    
    @track toastErrorMsg = '';
    @track toastErrorType = '';
    @track toastErrorTitle = '';
    @track toastErrorMode = 'dismissable';

    handleLoadProject(event) {

    
        this.showToastMsg = true;   
        //this.extendHandleMethod(); 
    }

    handleToastEvent(event) {

        this.showToastMsg = event.detail;
    }

    /*.catch(error =>{
        let errorMsg;
        
        this.toastErrorType = 'error';
        this.toastErrorTitle = 'Error!';
        if(error) {
            if (Array.isArray(error.body)) {
            errorMsg = error.body.map(e => e.message).join(', ');
            } 
            else if (typeof error.body.message === 'string') {
                errorMsg = error.body.message;
            }
            this.toastErrorMsg = errorMsg;
            this.showToastMsg = true;  
        } else {
            this.toastErrorMsg = 'Unknown Error';
            this.showToastMsg = true; 
        }
    })*/
}