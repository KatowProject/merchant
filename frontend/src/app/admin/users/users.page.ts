import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { UserEditModalComponent } from '../modal/user-edit-modal/user-edit-modal.component';
import { UserAddModalComponent } from '../modal/user-add-modal/user-add-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any = [];

  constructor(
    private adminService: AdminService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController
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

    const response = await this.adminService.getUsers();
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

    this.users = data;
  }

  async addUserModal() {
    const modal = await this.modalController.create({
      component: UserAddModalComponent
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) return;

    this.getData();
  }

  async editUserModal(user: any) {
    const modal = await this.modalController.create({
      component: UserEditModalComponent,
      componentProps: {
        user
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.status === 'success') {
      this.getData();
    }
  }

  async confirmDelete(user: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete ${user.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Okay',
          handler: () => {
            this.remove(user);
          }
        }
      ]
    });

    await alert.present();
  }

  async remove(user: any) {
    const loading = await this.loadingController.create({
      message: 'Deleting...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.deleteUser(user.id);
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to delete user',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      await loading.dismiss();
      return;
    }

    this.toastController.create({
      message: 'User deleted successfully',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    await loading.dismiss();

    this.getData();
  }
}
