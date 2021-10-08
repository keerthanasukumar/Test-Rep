import {LightningElement, api } from 'lwc';
export default class displayAccountDetailsChild extends LightningElement {
   @api recid;
   @api objectname;
   @api rectype;
}