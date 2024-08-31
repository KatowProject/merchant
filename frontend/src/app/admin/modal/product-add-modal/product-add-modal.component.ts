import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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


  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getCategories();
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

  loadImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.form.image = reader.result as string;
      this.img = file;
    }

    reader.onerror = (error) => {
      console.log(error);
    }
  }

  save() { }
}
