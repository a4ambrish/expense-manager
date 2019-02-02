
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemsDB } from '../../providers/items/itemsDB';
import { OrderIndent } from '../../models/OrderIndent';
import { OrderDB } from '../../providers/order/OrderDB';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {
 
  currentItems: Item[];
  allOrders: OrderIndent[];
  orderIndent: OrderIndent = new OrderIndent();
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,  public itemsDB: ItemsDB, public orderDB: OrderDB) {
    this.itemsDB.load().then(() => {
      //this.settingsReady = true;
      this.currentItems = this.itemsDB.allItems;
      
 this.orderIndent.orderItems =  Object.assign([], this.currentItems); 
 this.orderIndent.orderDate = new Date();
     //this._buildForm();
    });

    this.orderDB.load().then(() => {
          this.allOrders = this.orderDB.allItems;

    });

    
}

  onChangeQty(qty) {

    let tempOrderAmount = 0;

    for (let num = 0; num < this.orderIndent.orderItems.length; num++) {
      if (typeof this.orderIndent.orderItems[num].qty != 'undefined' && this.orderIndent.orderItems[num].qty && this.orderIndent.orderItems[num].qty > 0) {
        
          this.orderIndent.orderItems[num].amount=this.orderIndent.orderItems[num].qty *
          this.orderIndent.orderItems[num].rate;
          tempOrderAmount = tempOrderAmount + this.orderIndent.orderItems[num].amount;
      }
    }

    this.orderIndent.orderAmt = tempOrderAmount;
  }

  saveOrder() {
  console.log("before push")
    console.log(this.allOrders);
  console.log("******");
  console.log(this.orderIndent);



if (typeof this.allOrders != 'undefined' && this.allOrders ) {
  this.allOrders.push(this.orderIndent);
}else{
   this.allOrders = [this.orderIndent];
  // this.allOrders[0] = this.orderIndent;
}

  console.log("after push")
    console.log(this.allOrders);
    this.orderDB.setAll(this.allOrders);
    //this.orderDB.save();
  
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push("ContentPage").then(() => {
        this.navCtrl.remove(currentIndex);
    });
  }
}

