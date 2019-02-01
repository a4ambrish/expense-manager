import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class ItemsDB {
  private ITEMS_KEY: string = '_items';

  items: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
  }

  load() {
    return this.storage.get(this.ITEMS_KEY).then((value) => {
      if (value) {
        this.items = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.items = val;
        })
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.items)) {
        this.items[k] = defaults[k];
      }
    }
    return this.setAll(this.items);
  }

  merge(items: any) {
    for (let k in items) {
      this.items[k] = items[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.items[key] = value;
    return this.storage.set(this.ITEMS_KEY, this.items);
  }

  setAll(value: any) {
    return this.storage.set(this.ITEMS_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.ITEMS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.items);
  }

  get allItems() {
    return this.items;
  }
}
