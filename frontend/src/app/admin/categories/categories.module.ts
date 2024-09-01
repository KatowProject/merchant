import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { CategoryAddModalComponent } from '../modal/category-add-modal/category-add-modal.component';
import { CategoryEditModalComponent } from '../modal/category-edit-modal/category-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule
  ],
  declarations: [CategoriesPage, CategoryAddModalComponent, CategoryEditModalComponent]
})
export class CategoriesPageModule {}
