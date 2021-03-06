import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { OrderDB } from '../../providers/order/OrderDB';
import { OrderIndent } from '../../models/OrderIndent';
import { Settings } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  budgetAlloted: number;
  budgetConsumed: number = 0;
  budgetPercentUsed:number = 0;
  allOrders: OrderIndent[];

  // Our local settings object
  options: any;
 
  constructor(public navCtrl: NavController, public orderDB: OrderDB, public settings: Settings) {
    this.orderDB.load().then(() => {
      this.allOrders = this.orderDB.allItems;
      this.budgetAlloted = this.allOrders.length;
      for(let idx=0; idx< this.allOrders.length;idx++){
this.budgetConsumed += this.allOrders[idx].orderAmt;

      }

//       this.settings.load().then(() => {
         
  
//         }
 });
 this.settings.load().then(() => {
 
  this.options = this.settings.allSettings;
this.budgetAlloted = this.options.option2;
this.budgetPercentUsed = this.budgetConsumed / this.budgetAlloted ;
 
});
 

  }

}
