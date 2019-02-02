
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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public itemsDB: ItemsDB, public orderDB: OrderDB) {
    this.itemsDB.load().then(() => {
      //this.settingsReady = true;
      this.currentItems = this.itemsDB.allItems;

      this.orderIndent.orderItems = Object.assign([], this.currentItems);
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

        this.orderIndent.orderItems[num].amount = this.orderIndent.orderItems[num].qty *
          this.orderIndent.orderItems[num].rate;
        tempOrderAmount = tempOrderAmount + this.orderIndent.orderItems[num].amount;
      }
    }

    this.orderIndent.orderAmt = tempOrderAmount;
  }

  saveOrder() {


    //clean up - remove items which were not ordered
    for (let idx = 0; idx < this.orderIndent.orderItems.length; idx++) {
      if (typeof this.orderIndent.orderItems[idx].qty != 'undefined' && this.orderIndent.orderItems[idx].qty && this.orderIndent.orderItems[idx].qty > 0) {
        // do nothing as item has been ordered.
      } else {
        this.orderIndent.orderItems.splice(idx, 1);
      }
    }

    if (typeof this.allOrders != 'undefined' && this.allOrders) {
      this.allOrders.push(this.orderIndent);
    } else {
      this.allOrders = [this.orderIndent];
      // this.allOrders[0] = this.orderIndent;
    }



    this.orderDB.setAll(this.allOrders);
    //this.orderDB.save();

    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push("ContentPage").then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
}

