import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('LoginPage ngOnInit');
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });

    loading.present();

    const response = await this.authService.login(this.username, this.password);

    if (response.status !== 200) {
      const toast = await this.toastController.create({
        message: 'Login failed',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      loading.dismiss();

      return;
    }

    const json = await response.json();

    localStorage.setItem('token', json.token);

    const toast = await this.toastController.create({
      message: 'Login successful',
      duration: 2000,
      color: 'success'
    });

    toast.present();

    loading.dismiss();

    // redirect to home page
    this.router.navigate(['/']);
  }
}
