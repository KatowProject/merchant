import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-category-add-modal',
  templateUrl: './category-add-modal.component.html',
  styleUrls: ['./category-add-modal.component.scss'],
})
export class CategoryAddModalComponent implements OnInit {
  form: any = {};

  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  async save() {
    const { name } = this.form;

    if (!name) {
      this.toastController.create({
        message: 'Name is required',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    const response = await this.adminService.addCategory(name);
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to add category',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.modalController.dismiss({
      status: 'success',
      message: 'Category added successfully'
    });
  }
}
