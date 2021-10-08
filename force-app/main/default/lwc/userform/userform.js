import { LightningElement,track,wire } from 'lwc';
import getUserPicklist from '@salesforce/apex/UserPicklists.getUserPicklist';
import saveUser from '@salesforce/apex/UserDetail.saveUser';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
import {
    formToastPropertiesMap,
    filterErrors,
} from "c/utils";

export default class Userform extends LightningElement {
    @track value;
   @track userRec = {FirstName :'', LastName : '', Alias : '', Email : '', Username : '',CommunityNickname : '',
                      UserRoleId : '',ProfileId : '', UserType : '', EmailEncodingKey : '',TimeZoneSidKey :'',
                      LocaleSidKey:'',LanguageLocaleKey : '', UserPreferencesReceiveNotificationsAsDelegatedApprover : true};
   //@track userRec ={};
    picklist =[];
    usertype = [];
    EmailEncodingKey = [];
    TimeZoneSidKey = [];
    LocaleSidKey = [];
    LanguageLocaleKey =[];
    localUserRec ={};
    fieldErrorsMsg = [];
    errorMsg = '';
    variant = ''
    //EmaUserPreferencesReceiveNoNotificationsAsApproverilEncodingKey = [];

    @track userTypePicklist;
    @track roleName;  
    @track roleRecordId;  
    @track profileName;  
    @track profileRecordId;  
 
    onAccountSelection(event){  
        console.log('event.target.name',event.target.name);
        if(event.target.name==='Role'){
            this.roleName = event.detail.selectedValue;  
            this.roleRecordId = event.detail.selectedRecordId;  
            console.log('roleRecordId**',this.roleRecordId);
            this.userRec.UserRoleId = this.roleRecordId;
            console.log('this.userRec.UserRoleId**',this.userRec.UserRoleId);
        }
        if(event.target.name==='Profile'){
            this.profileName = event.detail.selectedValue;  
            this.profileRecordId = event.detail.selectedRecordId;
            console.log('profileRecordId**',this.profileRecordId);
            this.userRec.ProfileId = this.profileRecordId;
            console.log('this.userRec.ProfileId**',this.userRec.ProfileId);
        }
    }  
    handleChange(event) {
        let eventValue =  event.detail.value;
        console.log('userrec**',this.userRec);
        this.userRec[event.target.name] = eventValue;
        console.log('event.detail.name',event.target.name,'event.detail.value',event.detail.value);
        console.log('userrec**',this.userRec);
       
    }
    connectedCallback(){
        getUserPicklist()
        .then(result => {
        console.log("**result**",result);
        this.userTypePicklist = result;
        let usertypeOption= {};      
    
        for (const [key, value] of Object.entries(result)) {
            console.log(key ,value);
           let keys = key;
            usertypeOption = value;
            for(let [key,value] of Object.entries(usertypeOption)){
                let obj = {};
                console.log('val**',key,value);
                obj.label = key;
                obj.value = value;
                if(keys =='UserType'){
                    this.usertype.push(obj);
                    console.log('this.usertype**', this.usertype);
                }
                else if(keys =='EmailEncodingKey') {
                    this.EmailEncodingKey.push(obj);
                }
                else if(keys =='TimeZoneSidKey') {
                    this.TimeZoneSidKey.push(obj);
                }
                else if(keys =='LocaleSidKey') {
                    this.LocaleSidKey.push(obj);
                }
                else if(keys =='LanguageLocaleKey') {
                    this.LanguageLocaleKey.push(obj);
                }
            }
          }
    });
    }
    handleSave(event){
        console.log('event**',event);
        console.log('this.userRec**',this.userRec);
        saveUser({ userRec : this.userRec})
        .then(result => {
            //console.log("**inserted successfuly**");
            console.log('result**',result);
            for(let [key,value] of Object.entries(result)){
                console.log(key ,value);
                if(key == 'error'){
                    this.errorMsg = value;
                    this.variant = 'error';
                }
                else{
                    this.errorMsg = value;
                    this.variant = 'success';   
                }

            }
            const toastEvent = new ShowToastEvent({
                title: 'User',
                variant:this.variant,
                message : this.errorMsg
            });
            this.dispatchEvent(toastEvent);
        });
    }
    
    cancel(event){
        console.log("cancel**");
        let lightningInputCmps =  this.template.querySelectorAll("lightning-input");
        console.log('lightningInputCmps',lightningInputCmps);
        lightningInputCmps.forEach((input) =>{
          input.value= '';
        });
        let lightningcombobox =  this.template.querySelectorAll("lightning-combobox");
        console.log('lightningcombobox',lightningcombobox);
        lightningcombobox.forEach((input) =>{
          input.value= '';
        });
        let lwcLookupCmps = this.template.querySelectorAll("c-lwc-lookup");
      
        lwcLookupCmps.forEach((lookup) => {
          
        lookup.apiRemoveSelected();
      });
    }
}