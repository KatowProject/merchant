import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BerandaPageRoutingModule } from './beranda-routing.module';

import { BerandaPage } from './beranda.page';
import { DetailProductComponent } from '../modal/detail-product/detail-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BerandaPageRoutingModule
  ],
  declarations: [
    BerandaPage,
    DetailProductComponent
  ]
})
export class BerandaPageModule {}
