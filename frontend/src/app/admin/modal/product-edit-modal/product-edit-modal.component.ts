import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss'],
})
export class ProductEditModalComponent implements OnInit {
  @Input() item: any;

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

    console.log(this.item);

    this.form = {
      name: this.item.name,
      price: this.item.price,
      stock: this.item.stock,
      category_id: this.item.category_id,
      sub_category_id: this.item.sub_category_id,
      description: this.item.description,
      image: this.item.image,
    }
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
    console.log(this.form);
  }
}
