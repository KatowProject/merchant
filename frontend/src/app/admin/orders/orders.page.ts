import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { OrderDetailModalComponent } from '../modal/order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  data: any;

  constructor(
    private adminService: AdminService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getData();
  }

  async orderDetail(item: any) {
    const modal = await this.modalController.create({
      component: OrderDetailModalComponent,
      componentProps: {
        item
      }
    });

    modal.present();
  }

  async acceptOrder(item: any) {
    const alert = await this.alertController.create({
      header: 'Accept Order',
      message: 'Are you sure you want to accept this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Accept',
          handler: () => {
            this._acceptOrder(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async _acceptOrder(item: any) {
    const res = await this.adminService.acceptOrder(item.id);

    if (res.status !== 200) {
      this.toastController.create({
        message: 'Failed to accept order',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.toastController.create({
      message: 'Order accepted',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    this.getData();
  }

  async declineOrder(item: any) {
    const res = await this.adminService.declineOrder(item.id);

    if (res.status !== 200) {
      this.toastController.create({
        message: 'Failed to decline order',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.toastController.create({
      message: 'Order declined',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());
  }

  async sendOrder(item: any) {
    const res = await this.adminService.shipOrder(item.id);

    if (res.status !== 200) {
      this.toastController.create({
        message: 'Failed to ship order',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.toastController.create({
      message: 'Order shipped',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());
  }

  arrivedOrder(item: any) {
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.getAllOrders();
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to get data',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      await loading.dismiss();
      return;
    }

    const data = await response.json();

    await loading.dismiss();

    this.data = data;
  }

  /////
  totalItem(num: any) {
    return parseFloat(num) + (parseFloat(num) * (1.5 / 100));
  }

  handleImage(image: string) {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `${environment.imageUrl}/${image}`;
    }
  }
}
