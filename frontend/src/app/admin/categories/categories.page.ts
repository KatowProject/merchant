import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryAddModalComponent } from '../modal/category-add-modal/category-add-modal.component';
import { CategoryEditModalComponent } from '../modal/category-edit-modal/category-edit-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: any;

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

  async addCategoryModal() {
    const modal = await this.modalController.create({
      component: CategoryAddModalComponent
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) return;

    this.getData();
  }

  async edit(category: any) {
    const modal = await this.modalController.create({
      component: CategoryEditModalComponent,
      componentProps: {
        category
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (!data) return;

    this.getData();
  }

  async confirmDelete(category: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${category.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this.remove(category);
          }
        }
      ]
    });

    await alert.present();
  }

  async remove(category: any) {
    const loading = await this.loadingController.create({
      message: 'Deleting...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.deleteCategory(category.id);
    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to delete category',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      await loading.dismiss();
      return;
    }

    await loading.dismiss();

    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.getCategories();
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

    this.categories = data;
  }
}
