import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Woocommerce: any;
  products: any[];
  productsMore: any[];
  page: number;
  @ViewChild('productSlides') productSlides: Slides ;

  constructor(public nav: NavController , public toast : ToastController) {
    this.page = 2;
    this.Woocommerce = WC({
      url: 'https://artizone.tn/',
      consumerKey: 'ck_b0ce7005aa26ef1ccc1e74d69e52e2b602b291f0',
      consumerSecret: 'cs_73b960c1f315c28a3651a9f78bfcfa49aa06bde3',
      wpAPI: true,
      version: 'wc/v2',
      queryStringAuth: true
    });

    this.Woocommerce.getAsync('products').then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err);
    });

    this.loadMoreProducts(null);
  }

  ionViewDidLoad() {
    setInterval(() => {
      if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
        this.productSlides.slideTo(0);
      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts(event) {
    console.log(event);
    if (event == null) {
      this.page = 2;
      this.productsMore = [];
    }
    else
      this.page++;

    this.Woocommerce.getAsync('products?page=' + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.productsMore = this.productsMore.concat(JSON.parse(data.body));
      if (event != null) {
        event.complete();
      }
      if (JSON.parse(data.body).length < 10) {
        event.enable(false);
        this.toast.create({
         message : 'no more products' ,
         duration : 3000
        }).present() ;
      }
    }, (err) => {
      console.log(err);
    });
  }
}


