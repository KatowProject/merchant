import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { ProductAddModalComponent } from '../modal/product-add-modal/product-add-modal.component';
import { environment } from 'src/environments/environment';
import { ProductEditModalComponent } from '../modal/product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  data: any;

  constructor(
    private adminService: AdminService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.getAllProducts();
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

  async addProductModal() {
    const modal = await this.modalController.create({
      component: ProductAddModalComponent
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) return;

    this.getData();
  }

  async editProductModal(item: any) {
    const modal = await this.modalController.create({
      component: ProductEditModalComponent,
      componentProps: {
        item: item
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) return;

    this.getData();
  }

  async confirmDeleteProduct(id: number) {
    const alert = await this.alertController.create({
      header: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteProduct(id);
          }
        }
      ]
    });

    alert.present();
  }

  async deleteProduct(id: number) {
    const loading = await this.loadingController.create({
      message: 'Deleting...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.deleteProduct(id);
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to delete data',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      await loading.dismiss();
      return;
    }

    this.toastController.create({
      message: 'Data deleted successfully',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    await loading.dismiss();
    this.getData();
  }

  //////
  handleImage(image: string) {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `${environment.imageUrl}/${image}`;
    }
  }
}
