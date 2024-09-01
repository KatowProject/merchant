import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss'],
})
export class OrderDetailModalComponent implements OnInit {
  @Input() item: any;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  handleImage(image: string) {
    if (image.startsWith('http')) {
      return image;
    } else {
      return `${environment.imageUrl}/${image}`;
    }
  }
}
