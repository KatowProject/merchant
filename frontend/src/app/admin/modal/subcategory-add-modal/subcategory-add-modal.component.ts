import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-subcategory-add-modal',
  templateUrl: './subcategory-add-modal.component.html',
  styleUrls: ['./subcategory-add-modal.component.scss'],
})
export class SubcategoryAddModalComponent implements OnInit {
  form: any = {};
  categories: any = [];

  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  cancel() {
    this.modalController.dismiss();
  }

  async save() {
    const { name, category_id } = this.form;

    if (!name) {
      this.toastController.create({
        message: 'Name is required',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    if (!category_id) {
      this.toastController.create({
        message: 'Category is required',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    const response = await this.adminService.addSubCategory(this.form);
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to add subcategory',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    const toast = await this.toastController.create({
      message: 'Subcategory added successfully',
      duration: 2000
    });

    toast.present();

    this.modalController.dismiss({
      status: 'success',
      message: 'Subcategory added successfully'
    });
  }

  async getCategory() {
    const response = await this.adminService.getCategories();
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to get categories',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());
    }

    const data = await response.json();

    this.categories = data;
  }
}
