import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss'],
})
export class UserAddModalComponent implements OnInit {
  form: any = {};

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private adminService: AdminService,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  async save() {
    console.log(this.form);
    if (!this.form.name || !this.form.email || !this.form.password || !this.form.role) {
      this.alertController.create({
        header: 'Error',
        message: 'Please fill all fields',
        buttons: ['OK']
      }).then(alert => alert.present());

      return;
    }

    const res = await this.adminService.addUser(this.form);

    if (res.status !== 200) {
      this.alertController.create({
        header: 'Error',
        message: 'Failed to add user',
        buttons: ['OK']
      }).then(alert => alert.present());

      return;
    }

    this.toastController.create({
      message: 'User added successfully',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    this.modalController.dismiss({
      status: 'success',
      message: 'User added successfully'
    });
  }
}
