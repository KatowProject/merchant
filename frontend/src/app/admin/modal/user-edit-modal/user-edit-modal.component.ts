import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
})
export class UserEditModalComponent  implements OnInit {
  @Input() user: any;

  form: any = {};

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.form = this.user;
  }

  cancel() {
    this.modalController.dismiss();
  }

  async save() {
    if (!this.form.name || !this.form.email || !this.form.role) {
      this.toastController.create({
        message: 'Please fill all fields',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    const res = await this.adminService.updateUser(this.form);

    if (res.status !== 200) {
      this.toastController.create({
        message: 'Failed to edit user',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return;
    }

    this.toastController.create({
      message: 'User edited successfully',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    this.modalController.dismiss({
      status: 'success',
      message: 'User edited successfully'
    });
  }
}
