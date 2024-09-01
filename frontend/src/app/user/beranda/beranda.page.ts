import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { MainService } from 'src/app/services/main.service';
import { DetailProductComponent } from '../modal/detail-product/detail-product.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})

export class BerandaPage implements OnInit {
  discovery: any;
  isSearchBarOpened: boolean = false;
  dataFiltered: any;

  constructor(
    private loadingController: LoadingController,
    private mainService: MainService,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    loading.present();

    const res = await this.mainService.getDiscovery();
    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to fetch data',
        duration: 2000
      });

      toast.present();

      return;
    }

    const data = await res.json();

    this.discovery = data;

    this.dataFiltered = this.discovery.products;

    loading.dismiss();
  }

  async getCategoryDetail(id: string) {
    this.router.navigate(['/tabs/category', id]);
  }

  async getProductDetail(product: object) {
    this.modalController.create({
      component: DetailProductComponent,
      componentProps: {
        'item': product
      }
    }).then(modal => {
      modal.present();
    });
  }

  async addToCart(id: number) {
    const res = await this.mainService.addToCart(id);

    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to add to cart',
        duration: 2000,
        color: 'danger'
      });

      toast.present();

      return;
    }

    const toast = await this.toastController.create({
      message: 'Added to cart',
      duration: 2000,
      color: 'success'
    });

    toast.present();
  }

  async filterProducts(event: any) {
    const searchTerm = event.target.value;

    if (searchTerm === '') {
      this.dataFiltered = this.discovery.products;
      return;
    }

    this.dataFiltered = this.discovery.products.filter((product: any) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  /////
  handleImage(image: string) {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `${environment.imageUrl}/${image}`;
    }
  }
}
