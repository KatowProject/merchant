import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { OrderDetailModalComponent } from '../modal/order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter {
  data: any;

  constructor(
    private adminService: AdminService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {

  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.getDashboardData();
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

  async modalDetailOrder(item: any) {
    const modal = await this.modalController.create({
      component: OrderDetailModalComponent,
      componentProps: {
        item
      }
    });

    await modal.present();
  }


  //////
  toLocalePemasukan(data: number) {
    return data.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  sinceTime(time: string) {
    // if time not past to one hour, using minutes
    // if time past to one hour, using hours
    // if time past to one day, using days
    // if time past to one month, using months

    const timeNow = new Date();
    const timePast = new Date(time);

    const diff = timeNow.getTime() - timePast.getTime();

    const diffMinutes = Math.floor(diff / 60000);
    const diffHours = Math.floor(diff / 3600000);
    const diffDays = Math.floor(diff / 86400000);
    const diffMonths = Math.floor(diff / 2592000000);

    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else {
      return `${diffMonths} months ago`;
    }
  }
}
