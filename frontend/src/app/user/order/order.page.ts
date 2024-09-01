import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';
import { OrderDetailModalComponent } from '../modal/order-detail-modal/order-detail-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, ViewWillEnter {
  data: any = [];

  constructor(
    private mainService: MainService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter(): void {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circles'
    });

    loading.present();

    const res = await this.mainService.getOrders();
    if (res.status !== 200) {
      this.toastController.create({
        message: 'Failed to fetch data',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      loading.dismiss();
      return;
    }

    const data = await res.json();

    this.data = data;

    loading.dismiss();
  }

  parseTotalAmount(totalAmount: string): number {
    const amount = parseFloat(totalAmount);
    return amount + (amount * 1.5 / 100);
  }

  orderDetail(item: any) {
    this.modalController.create({
      component: OrderDetailModalComponent,
      componentProps: {
        item
      }
    }).then(modal => modal.present());
  }

  confirmOrder(item: any) { }

  handleImage(image: string) {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `${environment.imageUrl}/${image}`;
    }
  }
}
