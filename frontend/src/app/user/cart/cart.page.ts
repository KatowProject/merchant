import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';
import { ViewWillEnter } from '@ionic/angular';

interface Cart {
  carts: any[];
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, ViewWillEnter {
  data!: Cart;

  constructor(
    private mainService: MainService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }


  ionViewWillEnter(): void {
    // update data
    console.log('ionViewWillEnter');
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    loading.present();

    const res = await this.mainService.getCart();
    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to fetch data',
        duration: 2000,
        color: 'danger'
      });

      toast.present();

      loading.dismiss();
      return;
    }

    const data = await res.json();

    this.data = data;

    loading.dismiss();
  }

  increaseQuantity(id: number) {
    console.log('increaseQuantity', id);
  }

  decreaseQuantity(id: number) {
    console.log('descreaseQuantity', id);
  }

  removeFromCart(id: number) {
    console.log('removeFromCart', id);
  }
}
