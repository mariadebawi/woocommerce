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

  }

}


