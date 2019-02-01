import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class OrderDB {
  private ORDER_KEY: string = '_orders';

  orders: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
    console.log('Order DB Initialized.');
  }

  load() {
    return this.storage.get(this.ORDER_KEY).then((value) => {
      if (value) {
        this.orders = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.orders = val;
        })
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.orders)) {
        this.orders[k] = defaults[k];
      }
    }
    return this.setAll(this.orders);
  }

  merge(items: any) {
    for (let k in items) {
      this.orders[k] = items[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.orders[key] = value;
    return this.storage.set(this.ORDER_KEY, this.orders);
  }

  setAll(value: any) {
    return this.storage.set(this.ORDER_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.ORDER_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.orders);
  }

  get allItems() {
    return this.orders;
  }
}
