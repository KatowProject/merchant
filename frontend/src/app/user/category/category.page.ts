import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';
import { DetailProductComponent } from '../modal/detail-product/detail-product.component';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  category_id: number;
  sub_category_id: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {
  category: any;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // get category id from route
    this.route.params.subscribe(params => {
      console.log(params['id']);

      // get data
      this.getData(params['id']);
    });
  }

  async getData(id: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    loading.present();

    const res = await this.mainService.getProductByCategory(id);

    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to fetch data',
        duration: 2000
      });

      toast.present();

      loading.dismiss();
      return;
    }

    const data = await res.json();

    this.category = data;
    this.products = data.products;
    this.filteredProducts = data.products;

    loading.dismiss();
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
        duration: 2000
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

  filterProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm);
    });
  }

}
