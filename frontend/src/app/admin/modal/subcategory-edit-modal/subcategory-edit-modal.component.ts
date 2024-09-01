import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-subcategory-edit-modal',
  templateUrl: './subcategory-edit-modal.component.html',
  styleUrls: ['./subcategory-edit-modal.component.scss'],
})
export class SubcategoryEditModalComponent implements OnInit {
  @Input() subCategory: any;

  form: any = {};
  categories: any = [];

  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getCategory();

    this.form = {
      id: this.subCategory.id,
      name: this.subCategory.name,
      category_id: this.subCategory.category_id
    };
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

    const response = await this.adminService.updateSubCategory(this.form);
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to edit subcategory',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.toastController.create({
      message: 'Subcategory edited successfully',
      duration: 2000
    }).then(toast => toast.present());

    this.modalController.dismiss({
      status: 'success',
      message: 'Subcategory edited successfully'
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
