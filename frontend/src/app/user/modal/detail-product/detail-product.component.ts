import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  @Input() item: any;


  constructor(
    private modalController: ModalController,
    private mainService: MainService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {  
    console.log(this.item);
  }

  cancel() {
    this.modalController.dismiss();
  }

  async addToCart(item: any) {
    await this.mainService.addToCart(item.id);

    this.toastController.create({
      message: 'Added to cart',
      duration: 2000,
      color: 'success'
    }).then(toast => {
      toast.present();
    });

    this.modalController.dismiss();
  }
}
