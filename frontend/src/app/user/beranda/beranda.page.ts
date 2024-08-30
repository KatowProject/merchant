import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { MainService } from 'src/app/services/main.service';
@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})

export class BerandaPage implements OnInit {
  products: any;
  categories: any;

  constructor(
    private loadingController: LoadingController,
    private mainService: MainService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    loading.present();

    const res = [
      this.mainService.getProducts(),
      this.mainService.getCategories()
    ];

    const [products, categories] = await Promise.all(res);

    const productsJson = await products.json();
    const categoriesJson = await categories.json();

    this.products = productsJson;
    this.categories = categoriesJson;

    loading.dismiss();
  }

}
