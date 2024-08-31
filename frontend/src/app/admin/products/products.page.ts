import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { ProductAddModalComponent } from '../modal/product-add-modal/product-add-modal.component';

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
    private toastController: ToastController
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

  addProductModal() {
    this.modalController.create({
      component: ProductAddModalComponent
    }).then(modal => modal.present());
  }

  editProductModal(item: any) {
    console.log('Edit Product Modal');
  }

  deleteProduct(id: number) {
    console.log('Delete Product', id);
  }
}
