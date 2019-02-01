import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Tea",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Simple Tea",
    "rate":"7"
  };


  constructor() {
    let items = [
      {
        "name": "Cofee",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Cofee",
        "rate":"7"
      },
      {
        "name": "मीनीरल पानी 1/2 लीटर बोतल",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "मीनीरल पानी 1/2 लीटर बोतल",
        "rate":"12"
      },
      {
        "name": "पकोड़ा/मठी/समोसा/आलू-बोण्डा आदि",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "पकोड़ा/मठी/समोसा/आलू-बोण्डा आदि",
        "rate":"7"
      },
      {
        "name": "बिस्कुट पैकेट 10",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "बिस्कुट पैकेट 10",
        "rate":"10"
      },
      {
        "name": "बिस्कुट पैकेट 20",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "बिस्कुट पैकेट 20",
        "rate":"20"
      },
      {
        "name": "Cake",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Cake",
        "rate":"20"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
