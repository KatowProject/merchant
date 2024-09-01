import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { SubcategoryAddModalComponent } from '../modal/subcategory-add-modal/subcategory-add-modal.component';
import { SubcategoryEditModalComponent } from '../modal/subcategory-edit-modal/subcategory-edit-modal.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.page.html',
  styleUrls: ['./sub-category.page.scss'],
})
export class SubCategoryPage implements OnInit {
  subCategories: any = [];

  constructor(
    private adminService: AdminService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  async addSubCategoryModal() {
    const modal = await this.modalController.create({
      component: SubcategoryAddModalComponent
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) return;

    this.getData();
  }

  async edit(subCategory: any) {
    const modal = await this.modalController.create({
      component: SubcategoryEditModalComponent,
      componentProps: {
        subCategory
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if (!data) return;

    this.getData();
  }

  confirmDelete(subCategory: any) {
    const confirm = this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this sub category?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.remove(subCategory);
          }
        },
        {
          text: 'No'
        }
      ]
    });

    confirm.then(c => c.present());
  }

  async remove(subCategory: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.deleteSubCategory(subCategory.id);

    if (response.status !== 200) {
      this.toastController.create({
        message: 'Failed to delete sub category',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      await loading.dismiss();
      return;
    }

    this.toastController.create({
      message: 'Sub category deleted successfully',
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());

    await this.getData();

    await loading.dismiss();

  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    const response = await this.adminService.subCategories();
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

    this.subCategories = data;
  }
}
