import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { ItemsDB } from '../../providers/items/itemsDB';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,  public itemsDB: ItemsDB) {
   // this.currentItems = this.items.query();
   this.itemsDB.load().then(() => {
    //this.settingsReady = true;
    this.currentItems = this.itemsDB.allItems;

    //this._buildForm();
  });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.currentItems.push(item);
        this.itemsDB.save();
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
   const  index = this.currentItems.findIndex(obj => obj.name === item.name);
   this.currentItems.splice(index,1);
   this.itemsDB.save();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
