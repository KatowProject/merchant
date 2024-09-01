import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';
import { ViewWillEnter } from '@ionic/angular';
import { PlaceOrderModalComponent } from '../modal/place-order-modal/place-order-modal.component';
import { environment } from 'src/environments/environment';

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
  placeOrderDisabled: boolean = false;

  constructor(
    private mainService: MainService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }


  ionViewWillEnter(): void {
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

    // check if total not 0
    this.placeOrderDisabled = this.data.total === 0;

    loading.dismiss();
  }

  async increaseQuantity(item: any) {
    const cart = this.data.carts.find((c: any) => c.id === item.id);

    if (!cart) return;

    cart.quantity++;

    this.data.total += parseFloat(cart.product.price);

    this.placeOrderDisabled = this.data.total === 0;

    await this.mainService.updateCart(cart.product_id, cart.quantity);
  }

  decreaseQuantity(item: any) {
    const cart = this.data.carts.find((c: any) => c.id === item.id);

    if (!cart) return;

    cart.quantity--;

    this.data.total -= parseFloat(cart.product.price);

    this.placeOrderDisabled = this.data.total === 0;

    if (cart.quantity <= 0) {
      this.removeFromCart(cart);

      return;
    }

    this.mainService.updateCart(cart.product_id, cart.quantity);
  }

  removeFromCart(item: any) {
    this.data.carts = this.data.carts.filter((c: any) => c.id !== item.id);

    this.mainService.removeCart(item.product_id);

    // check item quantity, for adjusting total price
    this.data.total = this.data.carts.reduce((acc, c) => acc + parseFloat(c.product.price) * c.quantity, 0);

    this.placeOrderDisabled = this.data.total === 0;

    this.toastController.create({
      message: 'Removed from cart',
      duration: 2000,
      color: 'danger'
    }).then(toast => {
      toast.present();
    });
  }

  async modalPlaceOrder() {
    const m = await this.modalController.create({
      component: PlaceOrderModalComponent,
      componentProps: {
        'data': this.data.carts,
        'total': this.data.total
      }
    });

    m.present();

    const { data } = await m.onDidDismiss();

    if (!data) return;

    await this.placeOrder(data.order);
  }

  async placeOrder(data: any) {
    const loading = await this.loadingController.create({
      message: 'Placing order...'
    });

    loading.present();

    const res = await this.mainService.placeOrder(data);

    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to place order',
        duration: 2000,
        color: 'danger'
      });

      toast.present();

      loading.dismiss();
      return;
    }

    this.data.carts = [];
    this.data.total = 0;

    this.placeOrderDisabled = true;

    const toast = await this.toastController.create({
      message: 'Order placed',
      duration: 2000,
      color: 'success'
    });

    toast.present();

    loading.dismiss();
  }

  /////
  handleImage(image: string) {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `${environment.imageUrl}/${image}`;
    }
  }

}
