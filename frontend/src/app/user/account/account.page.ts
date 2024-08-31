import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';

interface Profile {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile!: Profile;

  constructor(
    private mainService: MainService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const res = await this.mainService.me();

    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to fetch data',
        duration: 2000
      });

      toast.present();
      return;
    }

    const data = await res.json();

    this.profile = data;
  }

  async updateProfile() {
    const res = await this.mainService.updateProfile(this.profile);

    if (res.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Failed to update profile',
        duration: 2000
      });

      toast.present();
      return;
    }

    const toast = await this.toastController.create({
      message: 'Profile updated',
      duration: 2000
    });

    toast.present();
  }

  logout() {
    localStorage.removeItem('token');

    window.location.href = '/login';
  }
}
