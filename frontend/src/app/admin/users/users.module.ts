import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { UserAddModalComponent } from '../modal/user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from '../modal/user-edit-modal/user-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule
  ],
  declarations: [UsersPage, UserAddModalComponent, UserEditModalComponent]
})
export class UsersPageModule {}
