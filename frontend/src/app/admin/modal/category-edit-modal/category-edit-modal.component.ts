import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.scss'],
})
export class CategoryEditModalComponent implements OnInit {
  @Input() category: any;

  form: any = {};

  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.form = {
      id: this.category.id,
      name: this.category.name
    };
  }

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

    const response = await this.adminService.editCategory(this.category.id, name);

    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to edit category',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.modalController.dismiss({
      status: 'success',
      message: 'Category edited successfully'
    });
  }
}
