import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductAddModalComponent } from '../modal/product-add-modal/product-add-modal.component';
import { ProductEditModalComponent } from '../modal/product-edit-modal/product-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage, ProductAddModalComponent, ProductEditModalComponent]
})
export class ProductsPageModule {}
