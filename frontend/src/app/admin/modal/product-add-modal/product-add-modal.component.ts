import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.scss'],
})
export class ProductAddModalComponent implements OnInit {
  form: any = {};
  img: any;
  categories: any = [];
  subCategories: any = [];


  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getSubCategories();
  }

  cancel() {
    this.modalController.dismiss();
  }

  async getCategories() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.getCategories();
    if (response.status !== 200) {
      await loading.dismiss();
      return;
    }

    const data = await response.json();

    await loading.dismiss();

    this.categories = data;
  }

  async getSubCategories() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.subCategories();
    if (response.status !== 200) {
      await loading.dismiss();
      return;
    }

    const data = await response.json();

    await loading.dismiss();

    this.subCategories = data;
  }

  loadImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.form.image = reader.result as string;
      this.img = file;
      this.form.img = file;
    }

    reader.onerror = (error) => {
      console.log(error);
    }
  }

  async save() {
    const res = await this.adminService.addProduct(this.form);

    if (res.status !== 200) {
      this.toastController.create({
        message: 'Failed to add product',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());
      return;
    }

    this.toastController.create({
      message: 'Product added successfully',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    const data = await res.json();

    this.modalController.dismiss({
      status: 'success',
      data: data.product
    });
  }
}
