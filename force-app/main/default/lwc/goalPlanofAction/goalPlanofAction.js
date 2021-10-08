import { LightningElement , track, api} from 'lwc';

export default class GoalPlanofAction extends LightningElement {

    @track planofaction={};
    @track planActionList = [];
    @track planofActionRec = {}
    
    addPlqnofAction(event){
        let plan = {'Plan_of_action__c':''};
        this.planActionList.push(plan);
        console.log('****list****',this.planActionList);
    }
    handleChance(event){

        console.log('*',event.target.value);
        let value = event.target.value;
        let name = event.target.name;
        this.planActionList[name].push(value);
        //let collateralMulti = value.join(';');
        console.log('gg',this.planActionList);
    }
}