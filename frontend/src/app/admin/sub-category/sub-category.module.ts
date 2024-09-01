import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoryPageRoutingModule } from './sub-category-routing.module';

import { SubCategoryPage } from './sub-category.page';
import { SubcategoryAddModalComponent } from '../modal/subcategory-add-modal/subcategory-add-modal.component';
import { SubcategoryEditModalComponent } from '../modal/subcategory-edit-modal/subcategory-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCategoryPageRoutingModule
  ],
  declarations: [SubCategoryPage, SubcategoryAddModalComponent, SubcategoryEditModalComponent]
})
export class SubCategoryPageModule { }
