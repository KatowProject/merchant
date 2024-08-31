import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainTabsComponent } from './user/main-tabs/main-tabs.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './admin/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTabsComponent,
    MenuComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
