import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-place-order-modal',
  templateUrl: './place-order-modal.component.html',
  styleUrls: ['./place-order-modal.component.scss'],
})
export class PlaceOrderModalComponent implements OnInit {
  @Input() data: any;
  @Input() total: any;

  isActiveButton: boolean = false;

  order: any = {}

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    this.modalController.dismiss({
      status: 'confirm',
      order: this.order
    });
  }
}
