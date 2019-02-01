webpackJsonp([0],{

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPageModule", function() { return OrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OrderPageModule = /** @class */ (function () {
    function OrderPageModule() {
    }
    OrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order__["a" /* OrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__order__["a" /* OrderPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__order__["a" /* OrderPage */]
            ]
        })
    ], OrderPageModule);
    return OrderPageModule;
}());

//# sourceMappingURL=order.module.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_items_itemsDB__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_OrderIndent__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_order_OrderDB__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrderPage = /** @class */ (function () {
    function OrderPage(navCtrl, modalCtrl, itemsDB, orderDB) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.itemsDB = itemsDB;
        this.orderDB = orderDB;
        this.orderIndent = new __WEBPACK_IMPORTED_MODULE_3__models_OrderIndent__["a" /* OrderIndent */]();
        this.itemsDB.load().then(function () {
            //this.settingsReady = true;
            _this.currentItems = _this.itemsDB.allItems;
            _this.orderIndent.orderItems = Object.assign([], _this.currentItems);
            _this.orderIndent.orderDate = new Date();
            //this._buildForm();
        });
        this.orderDB.load().then(function () {
            _this.allOrders = _this.orderDB.allItems;
        });
    }
    OrderPage.prototype.onChangeQty = function (qty) {
        var tempOrderAmount = 0;
        for (var num = 0; num < this.orderIndent.orderItems.length; num++) {
            if (typeof this.orderIndent.orderItems[num].qty != 'undefined' && this.orderIndent.orderItems[num].qty && this.orderIndent.orderItems[num].qty > 0) {
                this.orderIndent.orderItems[num].amount = this.orderIndent.orderItems[num].qty *
                    this.orderIndent.orderItems[num].rate;
                tempOrderAmount = tempOrderAmount + this.orderIndent.orderItems[num].amount;
            }
        }
        this.orderIndent.orderAmt = tempOrderAmount;
    };
    OrderPage.prototype.saveOrder = function () {
        console.log("before push");
        console.log(this.allOrders);
        console.log("******");
        console.log(this.orderIndent);
        if (typeof this.allOrders != 'undefined' && this.allOrders) {
            this.allOrders.push(this.orderIndent);
        }
        else {
            this.allOrders = [this.orderIndent];
            // this.allOrders[0] = this.orderIndent;
        }
        console.log("after push");
        console.log(this.allOrders);
        this.orderDB.setAll(this.allOrders);
        //this.orderDB.save();
    };
    OrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order',template:/*ion-inline-start:"/home/ambrish/source_code/mobiletesting/expensemanager2/src/pages/order/order.html"*/'<!--\n  Generated template for the OrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>New Order @ {{orderIndent.orderDate  | date: \'dd-MMM-yyyy hh:MM\' }}</ion-title>\n    \n  </ion-navbar>\n  \n  <button ion-button color="primary" block round (click)=\'saveOrder();\'>Save Order ( Amount  {{orderIndent.orderAmt}} /-) \n      \n\n  </button>\n  \n</ion-header>\n\n\n<ion-content padding>\n   \n  <ion-list *ngFor="let item of orderIndent.orderItems">\n  \n    <!-- <ion-card>\n        <ion-avatar item-start>\n          <img [src]="item.profilePic" />\n        </ion-avatar>\n        <h2>{{item.name}}</h2>\n        <p>{{item.about}}</p>\n        <p>{{item.rate | currency:"&#8377;"}}</p>\n        <ion-note item-end *ngIf="item.note">{{item.note}}</ion-note>\n      </ion-card> -->\n      <ion-card>\n        <ion-card-header>\n          <ion-avatar item-start>\n            <!-- <img [src]="item.profilePic" />  -->\n          </ion-avatar>\n          <ion-card-title> <h2>{{item.name}} @ {{item.rate | currency:"&#8377;"}} </h2> </ion-card-title>\n        </ion-card-header>\n      \n        <ion-card-content>\n            <!-- <ion-input type="text" class="scoreboardus" [(ngModel)]=\'text\' \n              (input)=\'onInputTime($event.target.value)\' \n              (ionChange)=\'onChangeTime($event.target.value)\'> -->\n         <ion-input type="number" placeholder="Qty" [(ngModel)]="item.qty"\n         (ionChange)=\'onChangeQty(item.qty)\' min="0"\n         ></ion-input>\n         Amount : {{item.amount}}\n        </ion-card-content>\n      </ion-card>\n      \n\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/ambrish/source_code/mobiletesting/expensemanager2/src/pages/order/order.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_items_itemsDB__["a" /* ItemsDB */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_items_itemsDB__["a" /* ItemsDB */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_order_OrderDB__["a" /* OrderDB */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_order_OrderDB__["a" /* OrderDB */]) === "function" && _d || Object])
    ], OrderPage);
    return OrderPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=order.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderIndent; });
var OrderIndent = /** @class */ (function () {
    function OrderIndent() {
    }
    return OrderIndent;
}());

//# sourceMappingURL=OrderIndent.js.map

/***/ })

});
//# sourceMappingURL=0.js.map