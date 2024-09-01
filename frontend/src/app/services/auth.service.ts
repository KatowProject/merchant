import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(email: string, password: string): Promise<Response> {
    const response = await fetch(`${environment.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    return response;
  }

  async me(): Promise<Response> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${environment.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  }
}
